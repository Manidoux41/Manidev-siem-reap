import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteLocale, isSiteLocale, locales } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Manfred Parbatia — Full-Stack Developer",
    template: "%s | Manfred Parbatia",
  },
  applicationName: "Manfred Parbatia — Portfolio",
  robots: { index: true, follow: true },
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
