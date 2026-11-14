"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import type { Logo } from "@/lib/content";

/* ───────────────────────── Buttons ───────────────────────── */

export function CtaButton({
  children,
  href = "#pricing",
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`}>
      <span className="btn__label">{children}</span>
    </a>
  );
}

/** Green button + "14 days free" note, used under most sections. */
export function TrialCta({ tone = "muted", label = "Start free trial" }: { tone?: "muted" | "light"; label?: string }) {
  return (
    <div className="trial-cta" data-reveal>
      <CtaButton>
        {label} <span className="btn__arrow">→</span>
      </CtaButton>
      <p className={`trial-cta__note trial-cta__note--${tone}`}>14 days free · No card, no catch</p>
    </div>
  );
}

/* ───────────────────────── Headings ───────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  titleWidth,
  subWidth,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  titleWidth?: number;
  subWidth?: number;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 className="h2" style={{ maxWidth: titleWidth }} data-reveal>
        {title}
      </h2>
      {sub && (
        <p className="body body--muted" style={{ maxWidth: subWidth }} data-reveal>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── Logos ───────────────────────── */

export function LogoImg({ logo }: { logo: Logo }) {
  const style: CSSProperties = { width: logo.w, height: logo.h };
  if (logo.parts) {
    return (
      <span className="logo-img" style={style} role="img" aria-label={logo.name}>
        {logo.parts.map((p) => (
          <span key={p.src} style={{ position: "absolute", inset: p.inset }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" style={{ width: "100%", height: "100%" }} />
          </span>
        ))}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="logo-img" src={logo.src} alt={logo.name} style={style} />;
}

/* ───────────────────────── Motion helpers ───────────────────────── */

/**
 * Standard scroll reveal for every [data-reveal] inside `scope`:
 * 24px rise + fade, staggered in the order elements enter the viewport.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);
        if (!items.length) return;
        gsap.set(items, { y: 24, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, stagger: 0.08, overwrite: true }),
        });
      });
    },
    { scope },
  );
}

/** Wraps fixed-size UI panels so they can be scaled per placement without reflowing their internals. */
export function Scaled({
  w,
  h,
  k,
  children,
  className = "",
}: {
  w: number;
  h: number;
  /** Scale factor. Leave unset to let a CSS class (with breakpoints) decide. */
  k?: number;
  children: ReactNode;
  className?: string;
}) {
  const vars: Record<string, number> = { "--w": w, "--h": h };
  if (k !== undefined) vars["--k"] = k;
  return (
    <div className={`scaled ${className}`} style={vars as CSSProperties}>
      <div className="scaled__inner">{children}</div>
    </div>
  );
}
