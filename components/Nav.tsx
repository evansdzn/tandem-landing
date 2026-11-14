"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { CtaButton } from "./ui";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`wordmark ${className}`} aria-label="Tandem home">
      <img src="/icons/tandem-mark.svg" alt="" width={33.699} height={26.161} />
      <span>tandem</span>
    </a>
  );
}

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  // Mobile sheet: links rise in one after another.
  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".nav-sheet__link, .nav-sheet .btn", {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.05,
          delay: 0.1,
        });
      });
    },
    { scope: sheet, dependencies: [open] },
  );

  return (
    <>
    <header ref={ref} className={`nav ${scrolled ? "nav--scrolled" : ""}`} data-hero-nav>
      <div className="nav__inner">
        <Wordmark />
        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>
        <CtaButton className="nav__cta">
          Start free trial <span className="btn__arrow">→</span>
        </CtaButton>
        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>

      {/* Outside <header>: the header's backdrop-filter would otherwise clip this fixed sheet. */}
      <div ref={sheet} className={`nav-sheet ${open ? "is-open" : ""}`} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-sheet__link">
            {l.label}
          </a>
        ))}
        <CtaButton>
          Start free trial <span className="btn__arrow">→</span>
        </CtaButton>
      </div>
    </>
  );
}
