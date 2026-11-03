"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SiteLocale, SiteMessages } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { ProjectDestinations } from "@/components/project-destinations";

type Props = {
  projects: PortfolioProject[];
  locale: SiteLocale;
  messages: SiteMessages;
};

function ProjectSlideshow({
  children,
  count,
  messages,
}: {
  children: (activeSlide: number) => ReactNode;
  count: number;
  messages: SiteMessages["projects"];
}) {
  const track = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeIndex = useRef(0);
  const drag = useRef<{ pointer: number; x: number; left: number; index: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  function goToSlide(index: number, instant = false) {
    const element = track.current;
    const slide = element?.children.item(index);
    if (!element || !(slide instanceof HTMLElement)) return;
    element.scrollTo({
      left: slide.offsetLeft - (element.clientWidth - slide.offsetWidth) / 2,
      behavior: instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => goToSlide(activeIndex.current, true));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function nearestSlide() {
    const element = track.current;
    if (!element) return 0;
    const center = element.scrollLeft + element.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    Array.from(element.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const difference = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (difference < distance) {
        nearest = index;
        distance = difference;
      }
    });
    return nearest;
  }

  return (
    <section className="project-slideshow" aria-label={messages.slideshow}>
      <div
        className="project-track"
        ref={track}
        tabIndex={0}
        aria-label={messages.slideshow}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onPointerDown={(event) => {
          suppressClick.current = false;
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = { pointer: event.pointerId, x: event.clientX, left: event.currentTarget.scrollLeft, index: activeSlide, moved: false };
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          if (!current || current.pointer !== event.pointerId) return;
          const delta = event.clientX - current.x;
          if (!current.moved && Math.abs(delta) < 8) return;
          current.moved = true;
          suppressClick.current = true;
          event.currentTarget.dataset.dragging = "true";
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.scrollLeft = current.left - delta;
        }}
        onPointerUp={(event) => {
          const current = drag.current;
          drag.current = null;
          if (!current?.moved) return;
          delete event.currentTarget.dataset.dragging;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          let index = nearestSlide();
          const delta = current.x - event.clientX;
          if (index === current.index && Math.abs(delta) > 50) {
            index += delta > 0 ? 1 : -1;
          }
          goToSlide(Math.max(0, Math.min(count - 1, index)));
        }}
        onPointerCancel={(event) => {
          drag.current = null;
          delete event.currentTarget.dataset.dragging;
          goToSlide(nearestSlide());
        }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            goToSlide(Math.max(0, Math.min(count - 1,
              activeSlide + (event.key === "ArrowRight" ? 1 : -1),
            )));
          }
        }}
        onScroll={() => {
          const nearest = nearestSlide();
          activeIndex.current = nearest;
          setActiveSlide(nearest);
        }}
      >
        {children(activeSlide)}
      </div>
      <div className="project-slideshow-controls">
        <button
          type="button"
          aria-label={messages.previous}
          disabled={activeSlide === 0}
          onClick={() => goToSlide(activeSlide - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <p className="project-slide-count" role="status" aria-live="polite">
          {String(activeSlide + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          type="button"
          aria-label={messages.next}
          disabled={activeSlide === count - 1}
          onClick={() => goToSlide(activeSlide + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function ProjectScene({
  slug,
  categorySlug,
  categoryName,
  title,
  messages,
}: {
  slug: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  messages: SiteMessages;
}) {
  const scene = messages.projects;
  if (slug === "mmc-go-drivers") {
    return (
      <div className="scene-driver" role="img" aria-label={scene.artAlt}>
        <div className="driver-map">
          <span className="map-route" />
          <span className="map-pin map-pin-one" />
          <span className="map-pin map-pin-two" />
          <span className="map-label">{scene.sceneRoute}</span>
        </div>
        <div className="driver-phone">
          <div className="phone-topline"><span /> 09:41</div>
          <div className="phone-greeting">
            {scene.sceneGreeting}<br /><b>{scene.sceneDriver}</b>
          </div>
          <div className="phone-trip">
            <span>{scene.sceneNext}</span>
            <strong>07:30</strong>
            <i />
          </div>
          <div className="phone-tabs"><span /><span /><span /><span /></div>
        </div>
        <span className="scene-coordinate">45° 26′ 12.8″ N</span>
      </div>
    );
  }

  if (slug === "saiway") {
    return (
      <div className="scene-saiway" role="img" aria-label={scene.artAlt}>
        <div className="saiway-route">
          <span className="saiway-airport">{scene.sceneAirport}</span>
          <span className="saiway-road" />
          <i className="saiway-pin" />
          <span className="saiway-card">
            <strong>{scene.sceneTransfer}</strong>
            <span>07:30 <i /> SIEM REAP</span>
          </span>
        </div>
        <span className="scene-coordinate">SAIWAY / 01</span>
      </div>
    );
  }

  if (slug === "khmera") {
    return (
      <div className="scene-khmera" role="img" aria-label={scene.artAlt}>
        <div className="khmera-sun" />
        <div className="khmera-temple">
          <span />
          <span />
          <span />
          <strong>{scene.sceneKhmera}</strong>
          <i>{scene.sceneKhmeraFooter}</i>
        </div>
        <span className="scene-coordinate">KHMERA / 04</span>
      </div>
    );
  }

  if (slug === "la-voix-des-enfants-places") {
    return (
    <div className="scene-association" role="img" aria-label={scene.artAlt}>
      <div className="association-sun" />
      <div className="association-paper">
        <div className="paper-header"><span>LA VOIX</span><i>—</i><span>VIENNE</span></div>
        <div className="paper-title">
          {scene.sceneAssociation}<br />{scene.sceneAssociationSecond}
        </div>
        <div className="paper-rule" />
        <div className="paper-columns"><span /><span /></div>
        <div className="paper-footer">{scene.sceneAssociationFooter}</div>
      </div>
      <span className="scene-coordinate">EDITION / WEB</span>
    </div>
    );
  }

  return (
    <div
      className={`scene-project scene-project-${categorySlug}`}
      role="img"
      aria-label={`${scene.artAlt}: ${title}`}
    >
      <span className="scene-project-orbit" aria-hidden="true" />
      <div className="scene-project-card" aria-hidden="true">
        <span>{categoryName}</span>
        <strong>{title}</strong>
        <i>{slug.replaceAll("-", " / ").toUpperCase()}</i>
      </div>
      <span className="scene-coordinate" aria-hidden="true">
        MANIDEV / {categorySlug.toUpperCase()}
      </span>
    </div>
  );
}

export function ProjectExplorer({ projects, locale, messages }: Props) {
  const categories = useMemo(
    () => [
      { slug: "all", name: messages.projects.all },
      ...Array.from(
        new Map(
          projects.map((project) => [project.category.slug, project.category]),
        ).values(),
      ),
    ],
    [messages.projects.all, projects],
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProjects = projects.filter(
    (project) =>
      activeCategory === "all" || project.category.slug === activeCategory,
  );

  return (
    <>
      <div className="project-filters" aria-label={messages.projects.filters}>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={activeCategory === category.slug ? "is-active" : ""}
            type="button"
            aria-pressed={activeCategory === category.slug}
            onClick={() => setActiveCategory(category.slug)}
          >
            {category.name}
            <span>
              {category.slug === "all"
                ? projects.length.toString().padStart(2, "0")
                : projects.filter(
                    (project) => project.category.slug === category.slug,
                  ).length.toString().padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      {visibleProjects.length > 0 ? (
        <ProjectSlideshow
          key={activeCategory}
          count={visibleProjects.length}
          messages={messages.projects}
        >
          {(activeSlide) => visibleProjects.map((project, index) => (
            <article
              className={`project-card${index === activeSlide ? " is-active" : ""}`}
              key={project.id}
            >
              <Link
                className="project-card-link"
                href={`/${locale}/projects/${project.slug}`}
                aria-label={messages.projects.discover.replace(
                  "{title}",
                  project.title,
                )}
              >
                <div className="project-card-visual">
                  {project.coverImage ? (
                    <Image
                      className="project-cover-image"
                      src={project.coverImage}
                      alt={`${messages.projects.artAlt}: ${project.title}`}
                      fill
                      sizes="(max-width: 800px) 84vw, 76vw"
                    />
                  ) : (
                    <ProjectScene
                      slug={project.slug}
                      categorySlug={project.category.slug}
                      categoryName={project.category.name}
                      title={project.title}
                      messages={messages}
                    />
                  )}
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-open" aria-hidden="true">↗</span>
                </div>
                <div className="project-card-meta">
                  <div>
                    <span className="eyebrow">{project.category.name}</span>
                    <h3>{project.title}</h3>
                    <span className="project-status">
                      {project.status === "UNKNOWN"
                        ? messages.projects.statusUnknown
                        : project.status === "PRODUCTION"
                          ? messages.projects.statusProduction
                          : project.status === "TEST"
                            ? messages.projects.statusTest
                            : messages.projects.statusDevelopment}
                    </span>
                  </div>
                  <span className="project-card-description">
                    {project.shortDescription}
                  </span>
                </div>
                <div className="technology-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </Link>
              {(project.liveUrl || project.appUrl) && (
                <div className="project-destinations">
                  <ProjectDestinations project={project} locale={locale} />
                </div>
              )}
            </article>
          ))}
        </ProjectSlideshow>
      ) : (
        <p className="empty-state">{messages.projects.empty}</p>
      )}
    </>
  );
}
