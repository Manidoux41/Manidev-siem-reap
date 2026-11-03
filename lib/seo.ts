import type { Metadata } from "next";
import { env } from "./env";
import { locales, type SiteLocale } from "./i18n";
import { seoContent } from "./seo-content";

export const siteUrl = new URL(env.NEXT_PUBLIC_SITE_URL ?? "https://manidev-siem-reap.vercel.app");
export const linkedinUrl = "https://www.linkedin.com/in/manfred-p-804a72198/";
export const socialImage = "/images/manidev-social.jpg";
const openGraphLocales = {
  en: "en_US", fr: "fr_FR", de: "de_DE", es: "es_ES",
  km: "km_KH", zh: "zh_CN", ja: "ja_JP",
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function languageAlternates(suffix = "") {
  return Object.fromEntries([
    ...locales.map((locale) => [locale, absoluteUrl(`/${locale}${suffix}`)]),
    ["x-default", absoluteUrl(`/en${suffix}`)],
  ]);
}

export function pageMetadata(locale: SiteLocale, suffix: string, title: string, description: string): Metadata {
  const url = absoluteUrl(`/${locale}${suffix}`);
  return {
    title: { absolute: title },
    description,
    authors: [{ name: "Manfred Parbatia", url: absoluteUrl(`/${locale}`) }],
    alternates: { canonical: url, languages: languageAlternates(suffix) },
    openGraph: {
      title, description, url, siteName: "Manidev",
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((language) => language !== locale).map((language) =>
        openGraphLocales[language]),
      images: [{ url: absoluteUrl(socialImage), width: 1200, height: 630, alt: "Manidev — Manfred Parbatia · Web & IT · Siem Reap" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(socialImage)] },
  };
}

export function identityGraph(locale: SiteLocale, githubUrl: string) {
  const content = seoContent[locale];
  return [
    {
      "@type": "Person", "@id": absoluteUrl("/#person"),
      name: "Manfred Parbatia", alternateName: "Manidev",
      url: absoluteUrl(`/${locale}`),
      image: absoluteUrl("/images/profile-portrait.webp"),
      jobTitle: content.servicesLabel,
      description: content.description,
      homeLocation: { "@type": "Place", name: "Siem Reap, Cambodia", address: { "@type": "PostalAddress", addressLocality: "Siem Reap", addressCountry: "KH" } },
      sameAs: [githubUrl, linkedinUrl],
      knowsAbout: ["Web development", "Mobile application development", "APIs", "IT consulting", "AI-assisted automation"],
      worksFor: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@type": "Organization", "@id": absoluteUrl("/#organization"),
      name: "Manidev", url: absoluteUrl(`/en`),
      logo: absoluteUrl("/images/logo-manidev.png"),
      founder: { "@id": absoluteUrl("/#person") },
      description: content.description,
      areaServed: { "@type": "Place", name: "Siem Reap, Cambodia" },
    },
    {
      "@type": "WebSite", "@id": absoluteUrl("/#website"),
      name: "Manidev", alternateName: "Manfred Parbatia",
      url: absoluteUrl("/en"), inLanguage: [...locales],
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ];
}

export function homeStructuredData(locale: SiteLocale, githubUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(locale, githubUrl),
      {
        "@type": "ProfilePage", "@id": absoluteUrl(`/${locale}#webpage`),
        url: absoluteUrl(`/${locale}`), name: seoContent[locale].title,
        description: seoContent[locale].description, inLanguage: locale,
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": absoluteUrl("/#person") },
      },
    ],
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
