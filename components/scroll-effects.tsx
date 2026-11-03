"use client";

import { useEffect } from "react";
import { assemblyProgress } from "@/lib/scroll-assembly";

export function ScrollEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.documentElement.classList.add("motion-ready");
    const elements = new Set<HTMLElement>();
    const active = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(element);
          else {
            active.delete(element);
            element.style.setProperty("--assembly-progress", "0");
          }
        });
        updateScrollEffects();
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );

    let frame = 0;
    const updateScrollEffects = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scroll = window.scrollY;
        const root = document.documentElement;
        const scrollableHeight = root.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--reading-progress",
          `${scrollableHeight > 0 ? scroll / scrollableHeight : 0}`,
        );
        root.style.setProperty(
          "--parallax-back",
          `${scroll * -0.035}px`,
        );
        root.style.setProperty(
          "--parallax-mid",
          `${scroll * -0.075}px`,
        );
        root.style.setProperty(
          "--parallax-front",
          `${scroll * -0.12}px`,
        );
        if (!reducedMotion.matches) {
          active.forEach((element) => {
            const bounds = element.getBoundingClientRect();
            const progress = assemblyProgress(bounds.top, bounds.height, window.innerHeight);
            element.style.setProperty("--assembly-progress", String(progress));
          });
        }
      });
    };

    const registerElements = () => {
      elements.forEach((element) => {
        if (!element.isConnected) {
          observer.unobserve(element);
          active.delete(element);
          elements.delete(element);
        }
      });
      document.querySelectorAll<HTMLElement>(
        ".reveal, .services-heading, .services-grid, .ai-tools > header, .ai-tool, .ai-tools-safeguards, .services-copy, .services-contact > div, .services-contact > form",
      ).forEach((element) => {
        if (elements.has(element) || element.parentElement?.closest(".scroll-assemble")) return;
        element.style.setProperty("--assembly-direction", elements.size % 2 ? "1" : "-1");
        element.classList.add("scroll-assemble");
        elements.add(element);
        observer.observe(element);
      });
    };
    registerElements();
    const mutations = new MutationObserver(registerElements);
    mutations.observe(document.body, { childList: true, subtree: true });

    if (!reducedMotion.matches) {
      updateScrollEffects();
      window.addEventListener("scroll", updateScrollEffects, { passive: true });
    }
    window.addEventListener("resize", updateScrollEffects);

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        window.removeEventListener("scroll", updateScrollEffects);
        cancelAnimationFrame(frame);
        document.documentElement.style.removeProperty("--parallax-back");
        document.documentElement.style.removeProperty("--parallax-mid");
        document.documentElement.style.removeProperty("--parallax-front");
      } else {
        updateScrollEffects();
        window.addEventListener("scroll", updateScrollEffects, { passive: true });
      }
    };

    reducedMotion.addEventListener("change", handleMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", updateScrollEffects);
      window.removeEventListener("resize", updateScrollEffects);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.documentElement.classList.remove("motion-ready");
      elements.forEach((element) => {
        element.classList.remove("scroll-assemble");
        element.style.removeProperty("--assembly-progress");
        element.style.removeProperty("--assembly-direction");
      });
    };
  }, []);

  return null;
}
