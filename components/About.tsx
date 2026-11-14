"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef } from "react";
import { CHIP_ROWS, STATS } from "@/lib/content";
import { gsap, useGSAP, EASE, MOTION_OK, countUp } from "@/lib/gsap";
import { useReveal } from "./ui";

function IconPill({ src, check = false }: { src: string; check?: boolean }) {
  return (
    <span className="icon-pill" data-pill>
      <img src={src} alt="" width={22} height={22} className={check ? "icon-pill__check" : ""} />
    </span>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Statement: each line slides up from behind its own mask, then the icons pop in.
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".statement", start: "top 80%", once: true } });
        tl.from(".statement__line > span", { yPercent: 115, duration: 1.1, ease: EASE, stagger: 0.12 })
          .from("[data-pill]", { scale: 0, rotate: -25, duration: 0.8, ease: "back.out(2.2)", stagger: 0.15 }, 0.35)
          .fromTo(
            ".icon-pill__check",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.inOut" },
            0.75,
          );

        // Cards rise as a pair; the photo eases out of a slow zoom while you scroll past.
        gsap.from(".highlight-card", {
          y: 50,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: ".highlights", start: "top 85%", once: true },
        });
        gsap.fromTo(
          ".retention__img",
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".highlights", start: "top bottom", end: "bottom 30%", scrub: true },
          },
        );

        // Numbers count up the first time they appear.
        root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          countUp(el, {
            value: Number(el.dataset.count),
            decimals: Number(el.dataset.decimals ?? 0),
            prefix: el.dataset.prefix ?? "",
            suffix: el.dataset.suffix ?? "",
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="about section">
      <p className="eyebrow" data-reveal>
        Our why
      </p>

      <h2 className="statement h2" aria-label="Tandem helps fast-growing teams hire for culture fit and keep the people they hire">
        <span className="statement__line" aria-hidden>
          <span>Tandem helps fast-growing teams</span>
        </span>
        <span className="statement__line" aria-hidden>
          <span>
            hire for <IconPill src="/icons/people.svg" /> culture fit
          </span>
        </span>
        <span className="statement__line statement__line--muted" aria-hidden>
          <span>
            and <IconPill src="/icons/check-circle.svg" check /> keep the people they hire
          </span>
        </span>
      </h2>

      <div className="highlights">
        <div className="highlight-card values-card">
          <div className="chips" aria-label="Team values">
            {CHIP_ROWS.map((row, i) => (
              <div className={`chips__row chips__row--${i}`} key={i}>
                <div className="chips__track">
                  {[...row, ...row].map((c, j) => (
                    <span className="chip" key={j} aria-hidden={j >= row.length}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="chips__fade" aria-hidden />
          </div>
          <div className="values-card__score">
            <p className="body body--muted">Avg. team fit score</p>
            <p className="score">
              <span className="h1" data-count="8.4" data-decimals="1">
                8.4
              </span>
              <span className="score__of">/ 10</span>
            </p>
          </div>
        </div>

        <div className="highlight-card retention-card">
          <div className="retention__media" aria-hidden>
            <Image className="retention__img" src="/img/retention.png" alt="" fill sizes="(max-width: 768px) 100vw, 420px" />
            <div className="retention__shade" />
          </div>
          <p className="h1 retention__num" data-count="94" data-suffix="%">
            94%
          </p>
          <p className="body retention__text">of new hires are still happily on the team a year later.</p>
          <img src="/logos/linear-white.svg" alt="Linear" width={59} height={14.75} />
        </div>
      </div>

      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label} data-reveal>
            <p
              className="h3"
              data-count={s.value}
              data-decimals={s.decimals}
              data-prefix={s.prefix}
              data-suffix={s.suffix}
            >
              {s.prefix}
              {s.value}
              {s.suffix}
            </p>
            <p className="small body--muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
