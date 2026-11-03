import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { ContactForm } from "@/components/contact-form";
import { TestimonialSection } from "@/components/testimonial-section";
import { getPublicTestimonials } from "@/lib/testimonials";
import { databaseConfigured } from "@/lib/prisma";
import { ProjectExplorer } from "@/components/project-explorer";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteHeader } from "@/components/site-header";
import { BrandLogo } from "@/components/brand-logo";
import { LinkedInLink } from "@/components/linkedin-link";
import { AiTools } from "@/components/ai-tools";
import { getMessages, getSiteLocale, localizeProject } from "@/lib/i18n";
import { getPublicProjects } from "@/lib/project-service";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { homeStructuredData, pageMetadata } from "@/lib/seo";
import { seoContent } from "@/lib/seo-content";
import { StructuredData } from "@/components/structured-data";
import profilePortrait from "@/public/images/profile-portrait.webp";

type PageProps = { params: Promise<{ locale: string }> };

function HeroPortrait({ locale }: { locale: ReturnType<typeof getSiteLocale> }) {
  return (
    <figure className="hero-portrait">
      <div className="hero-portrait-frame">
        <Image
          src={profilePortrait}
          alt="Manfred Parbatia"
          className="hero-portrait-image"
          sizes="(max-width: 800px) 280px, (max-width: 1200px) 32vw, 380px"
          placeholder="blur"
          preload
        />
      </div>
      <figcaption>
        <span className="status-dot" aria-hidden="true" />
        {getMessages(locale).location}
      </figcaption>
    </figure>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = getSiteLocale(routeLocale);
  const content = seoContent[locale];
  const settings = await getPublicSiteSettings();
  const legacyTitle = "Manfred Parbatia — Full-Stack Developer";
  const legacyDescription = "Portfolio of Manfred Parbatia, a full-stack developer building practical digital products for web and mobile.";
  const title =
    locale === "en" && settings["site.title"] && settings["site.title"] !== legacyTitle
      ? settings["site.title"]
      : content.title;
  const description =
    locale === "en" && settings["site.description"] && settings["site.description"] !== legacyDescription
      ? settings["site.description"]
      : content.description;
  return pageMetadata(locale, "", title, description);
}

export default async function Home({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = getSiteLocale(routeLocale);
  return (
    <Suspense fallback={<HomeFallback locale={locale} />}>
      <HomeContent locale={locale} />
    </Suspense>
  );
}

function HomeFallback({ locale }: { locale: ReturnType<typeof getSiteLocale> }) {
  const messages = getMessages(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="hero" aria-busy="true">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Portfolio / Manfred Parbatia</p>
          <div className="hero-layout">
            <h1>
              <span className="hero-identity">{seoContent[locale].identity}</span>
              {messages.hero.lineOne}
              <br />
              {messages.hero.lineTwo}
              <br />
              <span>{messages.hero.lineThree}</span>
            </h1>
            <HeroPortrait locale={locale} />
          </div>
        </div>
      </main>
    </>
  );
}

async function HomeContent({ locale }: { locale: ReturnType<typeof getSiteLocale> }) {
  await connection();
  const [projects, settings, testimonials] = await Promise.all([
    getPublicProjects(),
    getPublicSiteSettings(),
    getPublicTestimonials(),
  ]);
  const messages = getMessages(locale);
  const localizedProjects = projects.map((project) =>
    localizeProject(project, locale),
  );
  const technologies = Array.from(
    new Set(localizedProjects.flatMap((project) => project.technologies)),
  );

  return (
    <>
      <ScrollEffects />
      <StructuredData data={homeStructuredData(locale, settings["site.github"])} />
      <SiteHeader
        locale={locale}
        githubUrl={settings["site.github"]}
        telegramUrl={settings["site.telegram"]}
      />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-back parallax-back" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-front parallax-front" aria-hidden="true" />
          <div className="hero-grid-mark" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" /> {messages.hero.eyebrow}
            </p>
            <div className="hero-layout">
              <h1 id="hero-title">
                <span className="hero-identity">{seoContent[locale].identity}</span>
                {messages.hero.lineOne}
                <br />
                {messages.hero.lineTwo}
                <br />
                <span>
                  {messages.hero.lineThree}
                  <span className="hero-period">.</span>
                </span>
              </h1>
              <HeroPortrait locale={locale} />
            </div>
            <div className="hero-bottom">
              <p>
                {seoContent[locale].identity}
                <br />
                {messages.hero.introSecond}
              </p>
              <a className="scroll-cue" href="#projets">
                <span>{messages.hero.explore}</span>
                <span className="scroll-cue-line" aria-hidden="true" />
              </a>
            </div>
          </div>
          <span className="hero-index">MP / 001</span>
        </section>

        <section className="intro-strip" aria-label={messages.hero.position}>
          <p>
            {messages.hero.strip}
            <span aria-hidden="true"> ✳ </span>
            {messages.location}
          </p>
        </section>

        <section className="section projects-section" id="projets">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">{messages.projects.eyebrow}</p>
              <h2>
                {messages.projects.title}
                <br />
                <em>{messages.projects.titleAccent}</em>
              </h2>
            </div>
            <p className="section-aside">{messages.projects.aside}</p>
          </div>
          <ProjectExplorer
            projects={localizedProjects}
            locale={locale}
            messages={messages}
          />
          <p className="project-note">{messages.projects.note}</p>
        </section>

        <section className="section seo-services" aria-labelledby="services-title">
          <p className="eyebrow">{seoContent[locale].servicesLabel}</p>
          <h2 id="services-title">{seoContent[locale].servicesTitle}</h2>
          <p>{seoContent[locale].introduction}</p>
          <Link className="button button-dark" href={`/${locale}/services`}>
            {seoContent[locale].viewServices}
          </Link>
        </section>

        <section className="manifesto-section" id="apropos">
          <div className="manifesto-backdrop parallax-mid" aria-hidden="true">M</div>
          <div className="section manifesto-content">
            <div className="manifesto-label reveal">
              <p className="eyebrow">{messages.about.eyebrow}</p>
              <span>{messages.about.mantra}</span>
            </div>
            <div className="manifesto-copy reveal">
              <h2>
                {messages.about.first}
                <br />
                <span>{messages.about.second}</span>
                <br />
                {messages.about.third}
              </h2>
              <div className="manifesto-detail">
                <p>{messages.about.description}</p>
                <p className="personal-motto">{messages.about.motto}</p>
              </div>
              <div className="education-note">
                <p className="eyebrow">{messages.about.educationLabel}</p>
                <p>{messages.about.education}</p>
              </div>
            </div>
            <div className="skills-block reveal">
              <div className="education-note">
                <p className="eyebrow">{messages.about.aiLabel}</p>
                <p>{messages.about.aiDescription}</p>
              </div>
              <AiTools locale={locale} />
              <p className="eyebrow">{messages.about.skills}</p>
              <div className="skills-list">
                {technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <p className="skills-note">{messages.about.skillsNote}</p>
            </div>
          </div>
        </section>

        <TestimonialSection
          locale={locale}
          testimonials={testimonials}
          projects={localizedProjects.filter(project => project.source === "database")}
          available={databaseConfigured}
        />
        <section className="contact-section section" id="contact">
          <div className="contact-heading reveal">
            <p className="eyebrow">{messages.contact.eyebrow}</p>
            <h2>
              {messages.contact.title}
              <br />
              <em>{messages.contact.titleAccent}</em>
            </h2>
            <p>{messages.contact.description}</p>
            <a
              className="contact-github"
              href={settings["site.github"]}
              target="_blank"
              rel="noreferrer"
            >
              {messages.contact.github} <span aria-hidden="true">↗</span>
            </a>
            {settings["site.telegram"] && (
              <a
                className="contact-github"
                href={settings["site.telegram"]}
                target="_blank"
                rel="noreferrer"
              >
                {messages.contact.telegram} <span aria-hidden="true">↗</span>
              </a>
            )}
            <LinkedInLink />
          </div>
          <div className="contact-form-wrap reveal">
            <ContactForm locale={locale} />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <Link
          className="wordmark"
          href={`/${locale}`}
          aria-label={messages.footer.home}
        >
          <BrandLogo />
        </Link>
        <p>{messages.footer.made}</p>
        <div>
          <a href={settings["site.github"]} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <Link href="/admin">{messages.footer.admin}</Link>
          <LinkedInLink />
        </div>
        <span>© {new Date().getFullYear()} Manfred Parbatia</span>
      </footer>
    </>
  );
}
