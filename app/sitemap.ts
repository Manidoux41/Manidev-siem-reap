import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { locales } from "@/lib/i18n";
import { getPublicProjects } from "@/lib/project-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const projects = await getPublicProjects();

  return [
    ...locales.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
      changeFrequency: "monthly" as const,
      priority: 1,
      images: [absoluteUrl("/images/profile-portrait.webp")],
      alternates: { languages: languageAlternates() },
    })),
    ...locales.map((locale) => ({
      url: absoluteUrl(`/${locale}/services`),
      changeFrequency: "monthly" as const, priority: 0.9,
      alternates: { languages: languageAlternates("/services") },
    })),
    ...projects.flatMap((project) =>
      locales.map((locale) => ({
        url: absoluteUrl(`/${locale}/projects/${project.slug}`),
        ...(project.updatedAt ? { lastModified: project.updatedAt } : {}),
        ...(project.coverImage ? { images: [absoluteUrl(project.coverImage)] } : {}),
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.8 : 0.6,
        alternates: { languages: languageAlternates(`/projects/${project.slug}`) },
      })),
    ),
  ];
}
