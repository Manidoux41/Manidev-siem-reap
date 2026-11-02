import { z } from "zod";

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().url().optional(),
);

const EnvironmentSchema = z.object({
  DATABASE_URL: optionalUrl,
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  GITHUB_USERNAME: z
    .string()
    .trim()
    .min(1)
    .max(39)
    .regex(/^[A-Za-z0-9-]+$/)
    .optional()
    .default("Manidoux41"),
  IMAGE_HOSTS: z
    .string()
    .optional()
    .default("")
    .transform((value) =>
      value
        .split(",")
        .map((host) => host.trim().toLowerCase())
        .filter(Boolean),
    )
    .refine(
      (hosts) =>
        hosts.every((host) =>
          /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(
            host,
          ),
        ),
      "IMAGE_HOSTS doit contenir uniquement des noms d'hôte.",
    ),
});

const parsedEnvironment = EnvironmentSchema.safeParse(process.env);
if (!parsedEnvironment.success) {
  const invalidVariables = [
    ...new Set(parsedEnvironment.error.issues.map((issue) => issue.path[0])),
  ].join(", ");
  throw new Error(`Variables d'environnement invalides : ${invalidVariables}`);
}

if (
  process.env.NODE_ENV === "production" &&
  parsedEnvironment.data.NEXT_PUBLIC_SITE_URL &&
  !parsedEnvironment.data.NEXT_PUBLIC_SITE_URL.startsWith("https://")
) {
  throw new Error("NEXT_PUBLIC_SITE_URL doit utiliser HTTPS en production.");
}

export const env = parsedEnvironment.data;
