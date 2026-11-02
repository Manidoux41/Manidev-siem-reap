"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.documentElement.classList.add("motion-ready");
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));

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
      });
    };

    if (!reducedMotion.matches) {
      updateScrollEffects();
      window.addEventListener("scroll", updateScrollEffects, { passive: true });
    }

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        window.removeEventListener("scroll", updateScrollEffects);
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
      window.removeEventListener("scroll", updateScrollEffects);
      reducedMotion.removeEventListener("change", handleMotionChange);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
