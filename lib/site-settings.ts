import { databaseConfigured, getPrisma } from "@/lib/prisma";
import { cache } from "react";

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

export const getPublicSiteSettings = cache(async (): Promise<PublicSiteSettings> => {
  if (!databaseConfigured) return defaultSettings;

  const entries = await getPrisma().siteSetting.findMany({
    where: {
      key: { in: Object.keys(defaultSettings) },
    },
    select: { key: true, value: true },
  });
  return {
    ...defaultSettings,
    ...Object.fromEntries(entries.map(({ key, value }) => [key, value])),
  } as PublicSiteSettings;
});
