import { databaseConfigured, prisma } from "@/lib/prisma";

export type PublicSiteSettings = {
  "site.title": string;
  "site.description": string;
  "site.locale": string;
  "site.github": string;
  "site.telegram": string;
};

const defaultSettings: PublicSiteSettings = {
  "site.title": "Manfred Parbatia — Full-Stack Developer",
  "site.description":
    "Portfolio of Manfred Parbatia, a full-stack developer building practical digital products for web and mobile.",
  "site.locale": "en",
  "site.github": "https://github.com/Manidoux41",
  "site.telegram": "",
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  if (!databaseConfigured) return defaultSettings;

  const entries = await prisma.siteSetting.findMany({
    where: {
      key: { in: Object.keys(defaultSettings) },
    },
    select: { key: true, value: true },
  });
  return {
    ...defaultSettings,
    ...Object.fromEntries(entries.map(({ key, value }) => [key, value])),
  } as PublicSiteSettings;
}
