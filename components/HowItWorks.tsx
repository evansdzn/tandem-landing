"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef, useState } from "react";
import { STEPS } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { SectionHeading, TrialCta, useReveal } from "./ui";

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Laptop "opens toward you" as the tray arrives (all sizes).
      mm.add(MOTION_OK, () => {
        gsap.from(".how__laptop", {
          rotateX: 28,
          rotate: 38,
          scale: 0.86,
          y: 80,
          autoAlpha: 0,
          duration: 1.6,
          ease: EASE,
          scrollTrigger: { trigger: ".how__tray", start: "top 75%", once: true },
        });
        gsap.from(".how__glow", {
          scale: 0.6,
          autoAlpha: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".how__tray", start: "top 75%", once: true },
        });
      });

      // Desktop with room for the whole tray: pin it and walk through the steps.
      mm.add(`${MOTION_OK} and (min-width: 1024px) and (min-height: 1000px)`, () => {
        const st = ScrollTrigger.create({
          trigger: ".how__tray",
          start: "center center",
          end: "+=1100",
          pin: ".how__pin",
          pinSpacing: true,
          onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 3))),
        });
        return () => st.kill();
      });

      // Shorter screens: no pin — the step nearest the middle of the screen is active.
      mm.add(`${MOTION_OK} and (min-width: 1024px) and (max-height: 999px)`, () => {
        gsap.utils.toArray<HTMLElement>(".step").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
    },
    { scope: root },
  );

  // Each step change: the glow under the laptop breathes once and the laptop nudges.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".how__glow", { scale: 1 }, { scale: 1.18, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" });
      gsap.fromTo(".how__laptop-nudge", { y: 0 }, { y: -10, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" });
    },
    { scope: root, dependencies: [active], revertOnUpdate: false },
  );

  return (
    <section id="how-it-works" ref={root} className="how section">
      <SectionHeading
        eyebrow="How it works"
        title="3 steps to hires you won't regret"
        titleWidth={368}
        sub="No week-long onboarding, no training decks. Most teams run their first scored interview by Friday."
        subWidth={422}
      />

      <div className="how__pin">
        <div className="how__tray tray">
          <div className="how__laptop-card card">
            <img className="how__glow" src="/icons/glow.svg" alt="" aria-hidden />
            <div className="how__laptop-nudge">
              <div className="how__laptop">
                <Image src="/img/laptop.png" alt="Tandem dashboard on a laptop" width={800} height={647} sizes="800px" />
              </div>
            </div>
          </div>

          <ol className="how__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`step card ${i === active ? "is-active" : ""}`} data-reveal>
                <div className="step__top">
                  <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow eyebrow--muted">Step {i + 1}</span>
                </div>
                <h3 className="h5">{s.title}</h3>
                <p className="body body--muted">{s.body}</p>
                <span className="step__progress" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
      </div>

      <TrialCta />
    </section>
  );
}
