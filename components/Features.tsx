"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, EASE, MOTION_OK } from "@/lib/gsap";
import { Scaled, SectionHeading, useReveal } from "./ui";
import {
  AnalyticsPanel,
  ANALYTICS_SIZE,
  InsightsPanel,
  INSIGHTS_SIZE,
  PipelinePanel,
  PIPELINE_SIZE,
} from "./Panels";

/** Positions a rotated UI panel inside a photo, using Figma coordinates as percentages. */
function Floating({
  left,
  top,
  rotate,
  children,
}: {
  left: string;
  top: string;
  rotate: number;
  children: ReactNode;
}) {
  return (
    <div className="floating" style={{ left, top, "--rot": `${rotate}deg` } as CSSProperties}>
      <div className="floating__anim" data-float>
        {children}
      </div>
    </div>
  );
}

function FeatureCopy({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="feature__copy">
      <span className="icon-badge" data-reveal>
        <img src={icon} alt="" width={18} height={18} />
      </span>
      <h3 className="h4" data-reveal>
        {title}
      </h3>
      <p className="body body--muted" data-reveal>
        {body}
      </p>
      <a href="#how-it-works" className="pill-btn" data-reveal>
        See how
      </a>
    </div>
  );
}

export default function Features() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".bento", {
          y: 60,
          autoAlpha: 0,
          duration: 1.2,
          ease: EASE,
          scrollTrigger: { trigger: ".bento", start: "top 88%", once: true },
        });

        // Each photo: the UI panel slides up out of the bottom edge, tilted, and settles.
        gsap.utils.toArray<HTMLElement>(".feature__photo").forEach((photo) => {
          const panel = photo.querySelector("[data-float]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: photo, start: "top 75%", once: true } });
          tl.from(photo.querySelector(".feature__img"), { scale: 1.12, duration: 1.6, ease: "power2.out" }, 0)
            .from(panel, { yPercent: 70, rotate: 5, autoAlpha: 0, duration: 1.3, ease: EASE }, 0.25)
            .from(photo.querySelectorAll("[data-bar]"), { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.out", stagger: 0.15 }, 0.7)
            .fromTo(
              photo.querySelectorAll("[data-donut]"),
              { "--sweep": "0deg" },
              { "--sweep": "360deg", duration: 1.4, ease: "power2.inOut" },
              0.7,
            )
            .from(photo.querySelectorAll("[data-row]"), { x: -14, autoAlpha: 0, duration: 0.6, ease: EASE_ROW, stagger: 0.08 }, 0.7);
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="features" ref={root} className="features section">
      <SectionHeading
        eyebrow="Features"
        title="Structured interviews that show who'll really thrive"
        titleWidth={598}
        sub="Tandem sits beside your interviews and tells you, in plain numbers, how each person fits the way your team actually works."
        subWidth={598}
      />

      <div className="bento tray">
        <div className="bento__row1 card">
          <FeatureCopy
            icon="/icons/eye.svg"
            title="Interview insights"
            body="Get a live fit score while you talk, plus a gentle nudge with a follow-up question when an answer deserves a second look."
          />
          <div className="feature__photo feature__photo--wide">
            <div className="feature__img">
              <Image src="/img/feat-insights.png" alt="Two colleagues laughing together outdoors" fill sizes="(max-width: 768px) 100vw, 560px" />
              <Image src="/img/feat-insights-2.png" alt="" fill sizes="(max-width: 768px) 100vw, 560px" />
            </div>
            <Floating left="30.3%" top="45.5%" rotate={4}>
              <Scaled {...INSIGHTS_SIZE} className="k-insights">
                <InsightsPanel />
              </Scaled>
            </Floating>
          </div>
        </div>

        <div className="bento__row2">
          <div className="card feature-card">
            <FeatureCopy
              icon="/icons/analytics.svg"
              title="Hiring analytics"
              body="Find out where your keepers come from. Compare referrals, job boards and LinkedIn by who stays, not who applies."
            />
            <div className="feature__photo">
              <div className="feature__img">
                <img
                  src="/img/feat-analytics.png"
                  alt="A smiling man waving on a video call"
                  className="feature__img--analytics"
                />
              </div>
              <Floating left="41.8%" top="52.7%" rotate={-3}>
                <Scaled {...ANALYTICS_SIZE} className="k-analytics">
                  <AnalyticsPanel />
                </Scaled>
              </Floating>
            </div>
          </div>

          <div className="card feature-card">
            <FeatureCopy
              icon="/icons/grid.svg"
              title="Smart pipeline"
              body="Every candidate, scorecard and pending decision in one calm view. No more chasing interviewers on Slack at 10pm."
            />
            <div className="feature__photo">
              <div className="feature__img">
                <Image src="/img/feat-pipeline.png" alt="A happy team standing together outside" fill sizes="(max-width: 768px) 100vw, 560px" />
              </div>
              <Floating left="20.6%" top="53.3%" rotate={-3}>
                <Scaled {...PIPELINE_SIZE} className="k-pipeline">
                  <PipelinePanel />
                </Scaled>
              </Floating>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const EASE_ROW = "power3.out";
