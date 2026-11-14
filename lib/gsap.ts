"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** "Settle" ease used everywhere: fast start, long gentle landing. */
export const EASE = "expo.out";
export const EASE_SOFT = "power3.out";
export const DUR = 0.9;

/** Only run motion for people who haven't asked for less of it. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Animate a number from 0 to its final value once it scrolls into view. */
export function countUp(
  el: HTMLElement,
  opts: { value: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; delay?: number },
) {
  const { value, decimals = 0, prefix = "", suffix = "", duration = 1.8, delay = 0 } = opts;
  const state = { v: 0 };
  const render = () => {
    el.textContent = `${prefix}${state.v.toFixed(decimals)}${suffix}`;
  };
  render();
  return gsap.to(state, {
    v: value,
    duration,
    delay,
    ease: "power2.out",
    onUpdate: render,
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
  });
}

export { gsap, ScrollTrigger, useGSAP };
