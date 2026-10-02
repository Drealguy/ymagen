"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Pause smooth scrolling (e.g. while the full-screen menu is open). */
export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}

/**
 * Framer-style inertial scrolling for mouse wheels and trackpads. Touch keeps
 * the device's native scrolling, and reduced-motion users get plain scrolling.
 * Lenis drives the real window scroll, so sticky elements and scroll listeners
 * keep working unchanged.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      // In-page links like /services#strategy glide to their target.
      anchors: { offset: -24 },
      // Respect elements that scroll on their own.
      prevent: (node) => node.hasAttribute("data-lenis-prevent"),
    });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);

  // New page: start at the top immediately, without gliding from the old position.
  useEffect(() => {
    if (!window.location.hash) instance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
