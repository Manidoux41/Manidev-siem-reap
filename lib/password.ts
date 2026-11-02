import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";

function derive(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = await derive(password, salt);
  return `scrypt-v1$${salt}$${hash.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [version, salt, storedValue] = storedHash.split("$");
  if (
    version !== "scrypt-v1" ||
    !salt ||
    !storedValue ||
    !/^[a-f0-9]{128}$/i.test(storedValue)
  ) {
    return false;
  }

  const stored = Buffer.from(storedValue, "hex");
  const candidate = await derive(password, salt);
  return stored.length === candidate.length && timingSafeEqual(stored, candidate);
}
