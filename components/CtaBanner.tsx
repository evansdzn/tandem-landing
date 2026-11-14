"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { Scaled, TrialCta, useReveal } from "./ui";
import { AnalyticsPanel, ANALYTICS_SIZE, InsightsPanel, INSIGHTS_SIZE } from "./Panels";

export default function CtaBanner() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Grass drifts slower than the page.
        gsap.fromTo(
          ".cta__bg",
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        // Cards fly in from the right at different angles and land overlapping…
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".cta__ui", start: "top 80%", once: true } });
        tl.from(".cta__card--a [data-float]", { x: 260, y: 40, rotate: 18, autoAlpha: 0, duration: 1.5, ease: EASE })
          .from(".cta__card--b [data-float]", { x: 320, y: -30, rotate: -16, autoAlpha: 0, duration: 1.5, ease: EASE }, 0.15)
          .from(".cta__ui [data-bar]", { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out", stagger: 0.15 }, 0.8)
          .fromTo(".cta__ui [data-donut]", { "--sweep": "0deg" }, { "--sweep": "360deg", duration: 1.4, ease: "power2.inOut" }, 0.7)
          // …then float gently, out of step with each other.
          .add(() => {
            gsap.to(".cta__card--a [data-float]", { y: -10, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
            gsap.to(".cta__card--b [data-float]", { y: 9, duration: 2.7, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cta">
      <div className="cta__bg" aria-hidden>
        <Image src="/img/cta-bg.png" alt="" fill sizes="100vw" />
      </div>
      <div className="cta__shade" aria-hidden />

      <div className="cta__inner">
        <div className="cta__copy">
          <h2 className="h1 cta__title" data-reveal>
            Your next hire should feel like a yes
          </h2>
          <p className="body-large cta__sub" data-reveal>
            Try Tandem on your next three interviews. If the choice isn&apos;t clearer, all it cost you was a coffee.
          </p>
          <TrialCta tone="light" />
        </div>

        <div className="cta__ui" aria-hidden>
          <div className="floating cta__card--a" style={{ "--rot": "6deg" } as CSSProperties}>
            <div className="floating__anim" data-float>
              <Scaled {...ANALYTICS_SIZE} className="k-cta-analytics">
                <AnalyticsPanel />
              </Scaled>
            </div>
          </div>
          <div className="floating cta__card--b" style={{ "--rot": "-5deg" } as CSSProperties}>
            <div className="floating__anim" data-float>
              <Scaled {...INSIGHTS_SIZE} className="k-cta-insights">
                <InsightsPanel />
              </Scaled>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
