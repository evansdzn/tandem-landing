"use client";

/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef, useState } from "react";
import { PLANS, yearlyPerMonth, type Plan } from "@/lib/content";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { SectionHeading, TrialCta, useReveal } from "./ui";

/** Each digit is a 0–9 strip; changing the value rolls every strip to its new digit. */
function Odometer({ value }: { value: number }) {
  const digits = String(value).split("");
  return (
    <span className="odo" aria-label={`$${value}`}>
      <span aria-hidden>$</span>
      {digits.map((d, i) => (
        <span className="odo__digit" key={i} aria-hidden>
          <span className="odo__sizer">{d}</span>
          <span className="odo__strip" style={{ transform: `translateY(${-Number(d) * 10}%)`, transitionDelay: `${i * 70}ms` }}>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const featured = plan.id === "growth";
  const price = yearly ? yearlyPerMonth(plan.monthly) : plan.monthly;
  return (
    <div className={`plan plan--${plan.id} ${featured ? "plan--featured" : ""}`}>
      {featured && <img className="plan__glow" src="/icons/glow-pricing.svg" alt="" aria-hidden />}
      <div className="plan__head">
        <div className="plan__name">
          <span className="icon-badge icon-badge--sm">
            <img src={plan.icon} alt="" width={16} height={16} />
          </span>
          <span className="eyebrow">{plan.name}</span>
        </div>
        {plan.tag && <span className="plan__tag">{plan.tag}</span>}
      </div>
      <p className="body plan__blurb">{plan.blurb}</p>
      <p className="plan__price">
        <span className={featured ? "h1" : "h2"}>
          <Odometer value={price} />
        </span>
        <span className="small plan__per">{yearly ? "/month, billed yearly" : "/month"}</span>
      </p>
      <ul className="plan__features">
        {plan.features.map((f) => (
          <li key={f} className="small">
            <span className="plan__check">
              <img src="/icons/check.svg" alt="" width={11} height={11} />
            </span>
            {f}
          </li>
        ))}
      </ul>
      {plan.note && <p className="plan__note">{plan.note}</p>}
      <span className="plan__spacer" />
      <a href="#top" className={`pill-cta ${featured ? "pill-cta--solid" : ""}`}>
        Get started
      </a>
    </div>
  );
}

export default function Pricing() {
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLDivElement>(null);
  const [yearly, setYearly] = useState(false);
  const [thumb, setThumb] = useState({ x: 0, w: 0 });

  useReveal(root);

  // Slide the white thumb under whichever option is selected.
  useLayoutEffect(() => {
    const measure = () => {
      const btn = toggle.current?.querySelector<HTMLButtonElement>(`[data-opt="${yearly ? "yearly" : "monthly"}"]`);
      if (btn) setThumb({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [yearly]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".plans", start: "top 80%", once: true } });
        tl.from(".plans", { y: 50, autoAlpha: 0, duration: 1, ease: EASE })
          .from(".plan:not(.plan--featured)", { y: 40, autoAlpha: 0, duration: 1, ease: EASE, stagger: 0.1 }, 0.15)
          .from(".plan--featured", { y: 90, autoAlpha: 0, duration: 1.3, ease: EASE }, 0.35);

        // The featured card's glow breathes slowly while it's on screen.
        gsap.to(".plan__glow", { scale: 1.15, opacity: 0.7, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".plan--featured", {
          boxShadow: "0px 30px 80px -10px rgba(0,204,69,0.5)",
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="pricing" ref={root} className="pricing section">
      <SectionHeading
        eyebrow="Pricing"
        title="Fair prices for teams of every size"
        titleWidth={392}
        sub="Try any plan free for 14 days. No card, no setup fees, and leave whenever you like."
        subWidth={408}
      />

      <div className="billing" ref={toggle} role="radiogroup" aria-label="Billing period" data-reveal>
        <span className="billing__thumb" style={{ transform: `translateX(${thumb.x - 5}px)`, width: thumb.w }} aria-hidden />
        <button role="radio" aria-checked={!yearly} data-opt="monthly" className={!yearly ? "is-on" : ""} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button role="radio" aria-checked={yearly} data-opt="yearly" className={yearly ? "is-on" : ""} onClick={() => setYearly(true)}>
          Yearly <span className="billing__save">2 months free</span>
        </button>
      </div>

      <div className="plans tray">
        {PLANS.map((p) => (
          <PlanCard key={p.id} plan={p} yearly={yearly} />
        ))}
      </div>

      <TrialCta />
    </section>
  );
}
