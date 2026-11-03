import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteLocale, isSiteLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import { env } from "@/lib/env";
import "../globals.css";

const googleVerification = "Ylb55vJ9XgoaTwbtG5MkjiBCRnkROCCs_9pjr2CfGaE";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  verification: {
    google: env.GOOGLE_SITE_VERIFICATION && env.GOOGLE_SITE_VERIFICATION !== googleVerification
      ? [googleVerification, env.GOOGLE_SITE_VERIFICATION]
      : googleVerification,
  },
  title: {
    default: "Manfred Parbatia — Full-Stack Developer",
    template: "%s | Manfred Parbatia",
  },
  applicationName: "Manidev — Portfolio",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;
  if (!isSiteLocale(requestedLocale)) notFound();
  const locale = getSiteLocale(requestedLocale);

  return (
    <html lang={locale}>
      <body>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
