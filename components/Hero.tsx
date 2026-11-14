"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { LOGOS_ROW_1, LOGOS_ROW_2, type Logo } from "@/lib/content";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { CtaButton, LogoImg } from "./ui";

const HEADLINE = "Culture fit hiring software for startups that can't afford a wrong hire";

function Marquee({ logos, reverse = false, offset = 0 }: { logos: Logo[]; reverse?: boolean; offset?: number }) {
  // Two identical copies side by side; CSS slides the track by exactly one copy for a seamless loop.
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`} style={{ paddingLeft: offset }}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__set" key={copy} aria-hidden={copy === 1}>
            {logos.map((l) => (
              <LogoImg key={l.name} logo={l} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // 1. Load sequence: the scene fades up from dark green, then the words rise.
        const tl = gsap.timeline({ defaults: { ease: EASE } });
        tl.from(".hero__media", { scale: 1.08, autoAlpha: 0, duration: 2.2, ease: "power2.out" })
          .from(document.querySelectorAll(".nav__inner"), { y: -24, autoAlpha: 0, duration: 1 }, 0.3)
          .from(".hero__badge", { y: -14, autoAlpha: 0, duration: 0.9 }, 0.45)
          .from(".hero__word > span", { yPercent: 110, duration: 1.1, stagger: 0.045 }, 0.55)
          .from(".hero__sub", { y: 20, autoAlpha: 0, duration: 1 }, 1.05)
          .fromTo(".hero__ctas > *", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 }, 1.2)
          .from(".hero__logos", { y: 16, autoAlpha: 0, duration: 1.2 }, 1.4);

        // 2. Leaving the hero: people drift slower than the words (parallax), copy lifts away.
        gsap.to(".hero__media", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero__content", {
          y: -90,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="hero">
      <div className="hero__bg" aria-hidden>
        <div className="hero__media">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/hero-poster.png"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero__shade hero__shade--top" />
        <div className="hero__shade hero__shade--bottom" />
        <div className="hero__shade hero__shade--green" />
      </div>

      <div className="hero__content">
        <div className="hero__badge">
          <img src="/icons/g2.svg" alt="G2" width={15.45} height={15.45} />
          <span>5.0</span>
          <img src="/icons/stars.svg" alt="5 stars" width={74.679} height={12.876} />
        </div>
        <h1 className="hero__title" aria-label={HEADLINE}>
          {HEADLINE.split(" ").map((w, i) => (
            <span className="hero__word" key={i} aria-hidden>
              <span>{w}</span>
            </span>
          ))}
        </h1>
        <p className="hero__sub">
          We&apos;ve all made the hire who aced the interview and was gone by month three. Tandem helps you spot
          real fit before the offer.
        </p>
        <div className="hero__ctas">
          <div className="hero__primary">
            <CtaButton>
              Start hiring smarter <span className="btn__arrow">→</span>
            </CtaButton>
            <p className="trial-cta__note trial-cta__note--light">14 days free · No card, no catch</p>
          </div>
          <CtaButton variant="outline" href="#how-it-works">
            Watch 2-min demo
          </CtaButton>
        </div>
      </div>

      <div className="hero__logos">
        <p className="eyebrow eyebrow--light">Teams that hire with care</p>
        <Marquee logos={LOGOS_ROW_1} />
        <Marquee logos={LOGOS_ROW_2} reverse offset={80} />
      </div>
    </section>
  );
}
