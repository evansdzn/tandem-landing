"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef } from "react";
import { TESTIMONIALS_A, TESTIMONIALS_B, type Company, type Testimonial } from "@/lib/content";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { useReveal } from "./ui";

const SYMBOLS: Record<Company, { src: string; inset: string; pad?: string }[]> = {
  Nexus: [
    { src: "/logos/nexus-l.svg", inset: "22.71% 35.21% 22.71% 10.21%", pad: "-8.4%" },
    { src: "/logos/nexus-r.svg", inset: "22.71% 10.21% 22.71% 35.21%", pad: "-8.4%" },
  ],
  Bravix: [{ src: "/logos/bravix.svg", inset: "12.5% 14.58% 12.5% 16.67%" }],
  Halden: [{ src: "/logos/halden.svg", inset: "12.5% 16.67%" }],
  Lumora: [
    { src: "/logos/lumora-c.svg", inset: "8.27% 13.75% 8.33% 8.33%" },
    { src: "/logos/lumora-s.svg", inset: "8.33% 4.17% 29.17% 33.33%" },
  ],
  Candid: [{ src: "/logos/candid.svg", inset: "9.17% 13.24% 9.12% 10.42%" }],
  Driftmill: [{ src: "/logos/driftmill.svg", inset: "8.33%" }],
};

function CompanyLogo({ company }: { company: Company }) {
  return (
    <span className="company">
      <span className="company__mark" aria-hidden>
        {SYMBOLS[company].map((p) => (
          <span key={p.src} className="company__part" style={{ inset: p.inset }}>
            <span className="company__part" style={{ inset: p.pad ?? 0 }}>
              <img src={p.src} alt="" />
            </span>
          </span>
        ))}
      </span>
      {company}
    </span>
  );
}

function Card({ t, tall, hidden }: { t: Testimonial; tall?: boolean; hidden?: boolean }) {
  return (
    <figure className={`tcard ${tall ? "tcard--tall" : ""}`} aria-hidden={hidden}>
      <div className="tcard__media" aria-hidden>
        {t.imgStyle ? (
          <img src={t.img} alt="" className="tcard__img tcard__img--crop" style={t.imgStyle} />
        ) : (
          <Image src={t.img} alt="" fill sizes="308px" className="tcard__img" />
        )}
        <div className="tcard__shade" style={{ background: t.overlay }} />
      </div>
      <span className="tcard__mark">“</span>
      <blockquote className="small tcard__quote">{t.quote}</blockquote>
      <figcaption className="small tcard__by">
        — <b>{t.name}</b>, {t.role}
      </figcaption>
      <CompanyLogo company={t.company} />
    </figure>
  );
}

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".avatars img", {
          x: -18,
          autoAlpha: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: ".avatars", start: "top 90%", once: true },
        });
        gsap.from(".tcols", {
          y: 60,
          autoAlpha: 0,
          duration: 1.2,
          ease: EASE,
          scrollTrigger: { trigger: ".tcols", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="testimonials" ref={root} className="testimonials section">
      <div className="testimonials__layout">
        <div className="testimonials__copy">
          <p className="eyebrow" data-reveal>
            Testimonials
          </p>
          <h2 className="h2" data-reveal>
            Hiring teams, in their own words
          </h2>
          <p className="body body--muted" data-reveal>
            Founders and people leads on what changed once they stopped guessing.
          </p>
          <div className="trusted" data-reveal>
            <p className="body-medium">Loved by 150+ startups</p>
            <div className="avatars">
              {["av1", "av2", "av3", "av4"].map((a) => (
                <img key={a} src={`/img/${a}.png`} alt="" width={36} height={36} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: two columns scrolling forever in opposite directions. Mobile: one swipeable row. */}
        <div className="tcols">
          <div className="tcol tcol--a">
            <div className="tcol__track">
              {[...TESTIMONIALS_A, ...TESTIMONIALS_A].map((t, i) => (
                <Card key={i} t={t} tall hidden={i >= TESTIMONIALS_A.length} />
              ))}
            </div>
          </div>
          <div className="tcol tcol--b">
            <div className="tcol__track">
              {[...TESTIMONIALS_B, ...TESTIMONIALS_B].map((t, i) => (
                <Card key={i} t={t} hidden={i >= TESTIMONIALS_B.length} />
              ))}
            </div>
          </div>
          <div className="tcols__fade tcols__fade--top" aria-hidden />
          <div className="tcols__fade tcols__fade--bottom" aria-hidden />
        </div>

        <div className="tswipe" aria-label="Testimonials">
          {[...TESTIMONIALS_A, ...TESTIMONIALS_B].map((t, i) => (
            <Card key={i} t={t} tall />
          ))}
        </div>
      </div>
    </section>
  );
}
