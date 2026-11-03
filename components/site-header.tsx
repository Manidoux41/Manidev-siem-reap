"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import {
  getMessages,
  localeLabels,
  localizedPath,
  locales,
  type SiteLocale,
} from "@/lib/i18n";

export function SiteHeader({
  locale,
  currentPath,
  githubUrl = "https://github.com/Manidoux41",
  telegramUrl,
  showLanguageSwitcher = true,
}: {
  locale: SiteLocale;
  currentPath: string;
  githubUrl?: string;
  telegramUrl?: string;
  showLanguageSwitcher?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const messages = getMessages(locale);
  const links = [
    { href: `/${locale}/#projets`, label: messages.header.projects },
    { href: `/${locale}/#apropos`, label: messages.header.about },
    { href: `/${locale}/#contact`, label: messages.header.contact },
  ];

  return (
    <header className="site-header">
      <Link
        className="wordmark"
        href={`/${locale}`}
        aria-label={messages.header.home}
        onClick={() => setMenuOpen(false)}
      >
        <BrandLogo />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span>{menuOpen ? messages.header.close : messages.header.menu}</span>
        <span className="menu-toggle-icon" aria-hidden="true">
          {menuOpen ? "×" : "+"}
        </span>
      </button>
      <nav
        className={`primary-navigation${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label={messages.header.navigation}
      >
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <a
          className="nav-github"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          {messages.header.github} <span aria-hidden="true">↗</span>
        </a>
        {telegramUrl && (
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {messages.header.telegram} <span aria-hidden="true">↗</span>
          </a>
        )}
        {showLanguageSwitcher && (
          <label className="language-switch">
            <span className="visually-hidden">{messages.header.language}</span>
            <select
              aria-label={messages.header.language}
              value={locale}
              onChange={(event) => {
                const nextLocale = event.target.value as SiteLocale;
                setMenuOpen(false);
                router.push(localizedPath(currentPath, nextLocale));
              }}
            >
              {locales.map((item) => (
                <option key={item} value={item}>
                  {localeLabels[item]}
                </option>
              ))}
            </select>
          </label>
        )}
      </nav>
    </header>
  );
}
