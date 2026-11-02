import { createHash } from "node:crypto";
import { getPrisma, databaseConfigured } from "@/lib/prisma";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export async function isRateLimited(
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const now = Date.now();
  const hashedKey = createHash("sha256").update(key).digest("hex");

  if (databaseConfigured) {
    const prisma = getPrisma();
    const nowDate = new Date(now);
    const resetAt = new Date(now + windowMs);
    const entry = await prisma.rateLimitEntry.findUnique({
      where: { key: hashedKey },
    });

    if (!entry) {
      try {
        await prisma.rateLimitEntry.create({
          data: { key: hashedKey, count: 1, resetAt },
        });
        return false;
      } catch (error) {
        if (
          !error ||
          typeof error !== "object" ||
          !("code" in error) ||
          error.code !== "P2002"
        ) {
          throw error;
        }
      }
    }

    const reset = await prisma.rateLimitEntry.updateMany({
      where: { key: hashedKey, resetAt: { lte: nowDate } },
      data: { count: 1, resetAt },
    });
    if (reset.count > 0) return false;

    const increment = await prisma.rateLimitEntry.updateMany({
      where: { key: hashedKey, resetAt: { gt: nowDate }, count: { lt: limit } },
      data: { count: { increment: 1 } },
    });
    return increment.count === 0;
  }

  const memoryKey = hashedKey;
  const current = buckets.get(memoryKey);

  if (!current || current.resetAt <= now) {
    buckets.set(memoryKey, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > limit;
}

export function requestAddress(request: Request): string {
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
