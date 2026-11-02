import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { env } from "@/lib/env";
import { getPublicProjects } from "@/lib/project-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];

  const baseUrl = new URL(siteUrl);
  const projects = await getPublicProjects();
  const locales = ["en", "fr", "de", "es"] as const;

  return [
    ...locales.map((locale) => ({
      url: new URL(`/${locale}`, baseUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((language) => [
            language,
            new URL(`/${language}`, baseUrl).toString(),
          ]),
        ),
      },
    })),
    ...projects.flatMap((project) =>
      locales.map((locale) => ({
        url: new URL(`/${locale}/projects/${project.slug}`, baseUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((language) => [
              language,
              new URL(`/${language}/projects/${project.slug}`, baseUrl).toString(),
            ]),
          ),
        },
      })),
    ),
  ];
}
