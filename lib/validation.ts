import { z } from "zod";
import { env } from "@/lib/env";

const safeUrl = z
  .string()
  .trim()
  .url()
  .refine((value) => value.startsWith("https://"), "Utilisez une URL HTTPS.")
  .nullable()
  .optional();

const safeImageUrl = z
  .string()
  .trim()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && env.IMAGE_HOSTS.includes(url.hostname);
  }, "L’image doit utiliser HTTPS et un hôte défini dans IMAGE_HOSTS.")
  .nullable()
  .optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional(),
});

export const projectInputSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  shortDescription: z.string().trim().min(10).max(240),
  description: z.string().trim().min(20).max(10000),
  problem: z.string().trim().max(5000).nullable().optional(),
  solution: z.string().trim().max(5000).nullable().optional(),
  status: z.enum(["IN_DEVELOPMENT", "TEST", "PRODUCTION", "UNKNOWN"]),
  category: z.string().trim().min(2).max(60),
  technologies: z.array(z.string().trim().min(1).max(60)).max(20),
  githubUrl: safeUrl,
  liveUrl: safeUrl,
  appUrl: safeUrl,
  coverImage: safeImageUrl,
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int().min(0).max(10000),
});

export const contactStatusSchema = z.enum([
  "NEW",
  "READ",
  "REPLIED",
  "ARCHIVED",
]);

export const siteSettingsSchema = z.record(
  z.enum([
    "site.title",
    "site.description",
    "site.locale",
    "site.github",
    "site.telegram",
  ]),
  z.string().trim().max(2000),
).superRefine((settings, context) => {
  const githubUrl = settings["site.github"];
  if (githubUrl) {
    try {
      if (new URL(githubUrl).protocol !== "https:") {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["site.github"],
          message: "Utilisez une URL HTTPS.",
        });
      }
    } catch {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["site.github"],
        message: "URL GitHub invalide.",
      });
    }
  }

  const telegramUrl = settings["site.telegram"];
  if (!telegramUrl) return;
  try {
    const url = new URL(telegramUrl);
    if (
      url.protocol !== "https:" ||
      !["t.me", "telegram.me"].includes(url.hostname) ||
      url.pathname === "/"
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["site.telegram"],
        message: "Utilisez un lien Telegram HTTPS valide (t.me ou telegram.me).",
      });
    }
  } catch {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["site.telegram"],
      message: "Lien Telegram invalide.",
    });
  }
});
