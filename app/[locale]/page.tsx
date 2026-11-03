import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { ContactForm } from "@/components/contact-form";
import { ProjectExplorer } from "@/components/project-explorer";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteHeader } from "@/components/site-header";
import { BrandLogo } from "@/components/brand-logo";
import { LinkedInLink } from "@/components/linkedin-link";
import { getMessages, getSiteLocale, localizeProject } from "@/lib/i18n";
import { getPublicProjects } from "@/lib/project-service";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { env } from "@/lib/env";
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
  const messages = getMessages(locale);
  const settings = await getPublicSiteSettings();
  const title =
    locale === "en" && settings["site.title"]
      ? settings["site.title"]
      : messages.metadata.title;
  const description =
    locale === "en" && settings["site.description"]
      ? settings["site.description"]
      : messages.metadata.description;
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        ["en", "fr", "de", "es"].map((language) => [
          language,
          `${baseUrl ?? ""}/${language}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: { en: "en_US", fr: "fr_FR", de: "de_DE", es: "es_ES" }[locale],
    },
  };
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
      <SiteHeader locale={locale} currentPath={`/${locale}`} />
      <main className="hero" aria-busy="true">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Portfolio / Manfred Parbatia</p>
          <div className="hero-layout">
            <h1>
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
  const [projects, settings] = await Promise.all([
    getPublicProjects(),
    getPublicSiteSettings(),
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
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}`}
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
                {messages.hero.intro}
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
