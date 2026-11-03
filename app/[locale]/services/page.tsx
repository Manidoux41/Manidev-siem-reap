import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { SiteHeader } from "@/components/site-header";
import { BrandLogo } from "@/components/brand-logo";
import { StructuredData } from "@/components/structured-data";
import { ScrollEffects } from "@/components/scroll-effects";
import { ContactForm } from "@/components/contact-form";
import { AiTools } from "@/components/ai-tools";
import { getSiteLocale, type SiteLocale } from "@/lib/i18n";
import { seoContent } from "@/lib/seo-content";
import { absoluteUrl, identityGraph, pageMetadata } from "@/lib/seo";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { commercialOffers } from "@/lib/commercial-offers";
import { verifiedProjects } from "@/lib/portfolio-data";
import { localizeProject } from "@/lib/i18n";

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
  return <SiteHeader locale={locale} githubUrl={settings["site.github"]} telegramUrl={settings["site.telegram"]} />;
}

function ServicesContent({ locale }: { locale: SiteLocale }) {
  const content = seoContent[locale];
  const commercial = commercialOffers[locale];
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
        mainEntity: [
          ...content.offers.map((_, index) => ({ "@id": absoluteUrl(`${path}#service-${index + 1}`) })),
          ...commercial.items.map((offer) => ({ "@id": absoluteUrl(`${path}#offer-${offer.id}`) })),
        ],
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
      ...commercial.items.map((offer) => ({
        "@type": "Service", "@id": absoluteUrl(`${path}#offer-${offer.id}`),
        name: offer.title, description: offer.outcome,
        url: absoluteUrl(`${path}#offer-${offer.id}`),
        provider: { "@id": absoluteUrl("/#organization") },
        areaServed: { "@type": "Place", name: "Siem Reap, Cambodia" },
      })),
    ],
  };
  return (
    <>
      <ScrollEffects />
      <Suspense fallback={<SiteHeader locale={locale} />}>
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
          <a href="#contact" className="button button-dark">{content.contact}</a>
        </header>
        <div className="services-grid">
          {content.offers.map((offer, index) => (
            <section key={offer.title} id={`service-${index + 1}`}>
              <h2>{offer.title}</h2><p>{offer.text}</p>
            </section>
          ))}
        </div>
        <section className="commercial-offers" aria-labelledby="commercial-title">
          <h2 id="commercial-title">{commercial.title}</h2>
          <p>{commercial.intro}</p>
          <div className="services-grid">
            {commercial.items.map((offer) => (
              <article key={offer.id} id={`offer-${offer.id}`} className={`commercial-offer commercial-offer-${offer.id}`}>
                <header>
                  <p className="eyebrow">{commercial.quote}</p>
                  <h3>{offer.title}</h3>
                  <p>{offer.outcome}</p>
                </header>
                <div><h4>{commercial.audience}</h4><p>{offer.audience}</p></div>
                <div>
                  <h4>{commercial.deliverables}</h4>
                  <ul>{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="commercial-references">
                {offer.projects.length > 0 ? (
                  <>
                    <h4>{commercial.references}</h4>
                    <div className="services-project-links">
                      {offer.projects.map((slug) => {
                        const project = verifiedProjects.find((item) => item.slug === slug);
                        return project ? <Link key={slug} href={`/${locale}/projects/${slug}`}>{localizeProject(project, locale).title}</Link> : null;
                      })}
                    </div>
                  </>
                ) : <p className="commercial-note">{commercial.aiNote}</p>}
                </div>
                <a href="#contact" className="button button-dark">{commercial.cta}</a>
              </article>
            ))}
          </div>
          <p className="services-copy">{commercial.terms}</p>
        </section>
        <AiTools locale={locale} />
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
        <section id="contact" className="services-contact" aria-labelledby="services-contact-title">
          <div>
            <p className="eyebrow">Manidev · Siem Reap</p>
            <h2 id="services-contact-title">{content.contact}</h2>
            <p>{commercial.intro}</p>
          </div>
          <ContactForm locale={locale} />
        </section>
      </main>
      <footer className="site-footer">
        <Link href={`/${locale}`} aria-label={content.home}><BrandLogo /></Link>
        <p>Manfred Parbatia · Manidev · Siem Reap, Cambodia</p>
        <a href="#contact">{content.contact}</a>
      </footer>
    </>
  );
}
