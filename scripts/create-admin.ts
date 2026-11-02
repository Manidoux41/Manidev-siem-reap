import { loadEnvConfig } from "@next/env";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";
import { resolveDatabaseUrl } from "../lib/database-url";

loadEnvConfig(process.cwd());

async function main() {
  const datasourceUrl = resolveDatabaseUrl(process.env);
  if (!datasourceUrl) {
    throw new Error("Une connexion PostgreSQL est nécessaire pour créer un administrateur.");
  }

  const terminal = createInterface({ input: stdin, output: stdout });
  try {
    const email = (await terminal.question("E-mail administrateur : "))
      .trim()
      .toLowerCase();
    const password = await terminal.question("Mot de passe (16 caractères min.) : ");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Adresse e-mail invalide.");
    }
    if (password.length < 16) {
      throw new Error("Le mot de passe doit contenir au moins 16 caractères.");
    }

    const prisma = new PrismaClient({ datasourceUrl });
    try {
      const user = await prisma.adminUser.upsert({
        where: { email },
        update: { passwordHash: await hashPassword(password) },
        create: { email, passwordHash: await hashPassword(password) },
        select: { email: true },
      });
      console.info(`Compte administrateur prêt : ${user.email}`);
    } finally {
      await prisma.$disconnect();
    }
  } finally {
    terminal.close();
  }
}

main().catch((error: unknown) => {
  console.error("Impossible de créer le compte administrateur.", error);
  process.exitCode = 1;
});
