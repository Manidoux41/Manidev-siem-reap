import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { SiteHeader } from "@/components/site-header";
import { BrandLogo } from "@/components/brand-logo";
import { StructuredData } from "@/components/structured-data";
import { ScrollEffects } from "@/components/scroll-effects";
import { getSiteLocale, type SiteLocale } from "@/lib/i18n";
import { seoContent } from "@/lib/seo-content";
import { absoluteUrl, identityGraph, pageMetadata } from "@/lib/seo";
import { getPublicSiteSettings } from "@/lib/site-settings";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = getSiteLocale((await params).locale);
  const content = seoContent[locale];
  return pageMetadata(locale, "/services", `${content.servicesTitle} | Manidev`, content.servicesDescription);
}

export default async function ServicesPage({ params }: Props) {
  const locale = getSiteLocale((await params).locale);
  return <ServicesContent locale={locale} />;
}

async function ServicesHeader({ locale }: { locale: SiteLocale }) {
  await connection();
  const settings = await getPublicSiteSettings();
  return <SiteHeader locale={locale} currentPath={`/${locale}/services`} githubUrl={settings["site.github"]} telegramUrl={settings["site.telegram"]} />;
}

function ServicesContent({ locale }: { locale: SiteLocale }) {
  const content = seoContent[locale];
  const path = `/${locale}/services`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ...identityGraph(locale, "https://github.com/Manidoux41"),
      {
        "@type": "CollectionPage", "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path), name: content.servicesTitle, description: content.servicesDescription,
        inLanguage: locale, isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#person") },
        mainEntity: content.offers.map((_, index) => ({ "@id": absoluteUrl(`${path}#service-${index + 1}`) })),
        breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumb`) },
      },
      {
        "@type": "BreadcrumbList", "@id": absoluteUrl(`${path}#breadcrumb`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: content.home, item: absoluteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: content.servicesLabel, item: absoluteUrl(path) },
        ],
      },
      ...content.offers.map((offer, index) => ({
        "@type": "Service", "@id": absoluteUrl(`${path}#service-${index + 1}`),
        name: offer.title, description: offer.text, serviceType: offer.title,
        url: absoluteUrl(`${path}#service-${index + 1}`),
        provider: { "@id": absoluteUrl("/#organization") },
        areaServed: { "@type": "Place", name: "Siem Reap, Cambodia" },
      })),
    ],
  };
  return (
    <>
      <ScrollEffects />
      <Suspense fallback={<SiteHeader locale={locale} currentPath={path} />}>
        <ServicesHeader locale={locale} />
      </Suspense>
      <StructuredData data={data} />
      <main className="section services-page">
        <nav className="seo-breadcrumb" aria-label={content.home}>
          <Link href={`/${locale}`}>{content.home}</Link><span aria-hidden="true"> / </span><span>{content.servicesLabel}</span>
        </nav>
        <header className="services-heading">
          <p className="eyebrow">Manfred Parbatia · Manidev</p>
          <h1>{content.servicesTitle}</h1>
          <p>{content.introduction}</p>
          <p className="eyebrow">{content.location}</p>
          <Link href={`/${locale}/#contact`} className="button button-dark">{content.contact}</Link>
        </header>
        <div className="services-grid">
          {content.offers.map((offer, index) => (
            <section key={offer.title} id={`service-${index + 1}`}>
              <h2>{offer.title}</h2><p>{offer.text}</p>
            </section>
          ))}
        </div>
        <section className="services-copy">
          <h2>{content.processTitle}</h2>
          <ol>{content.process.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
        <section className="services-copy">
          <h2>{content.proofTitle}</h2>
          <p>{content.proof}</p><p>{content.local}</p>
          <div className="services-project-links">
            <Link href={`/${locale}/projects/saiway`}>Saiway</Link>
            <Link href={`/${locale}/projects/khmera`}>KHMERA</Link>
            <Link href={`/${locale}/projects/mmc-go-drivers`}>MMC Go Drivers</Link>
            <Link href={`/${locale}/#projets`}>{content.viewProjects}</Link>
          </div>
        </section>
        <section className="services-copy services-faq">
          <h2>{content.faqTitle}</h2>
          {content.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </section>
        <Link href={`/${locale}/#contact`} className="button button-dark">{content.contact}</Link>
      </main>
      <footer className="site-footer">
        <Link href={`/${locale}`} aria-label={content.home}><BrandLogo /></Link>
        <p>Manfred Parbatia · Manidev · Siem Reap, Cambodia</p>
        <Link href={`/${locale}/#contact`}>{content.contact}</Link>
      </footer>
    </>
  );
}
