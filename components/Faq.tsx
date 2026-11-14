"use client";

/* eslint-disable @next/next/no-img-element */
import { useId, useRef, useState } from "react";
import { FAQS } from "@/lib/content";
import { SectionHeading, useReveal } from "./ui";

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  useReveal(root);

  return (
    <section id="faq" ref={root} className="faq section">
      <SectionHeading eyebrow="FAQ" title="Questions we hear a lot" sub="Here's what people usually ask before giving us a try." />

      <div className="faq__list">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`} data-reveal>
              <button
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="h7">{f.q}</span>
                <span className="faq__toggle" aria-hidden>
                  <img className="faq__icon faq__icon--plus" src="/icons/faq-plus.svg" alt="" width={16} height={16} />
                  <img className="faq__icon faq__icon--minus" src="/icons/minus.svg" alt="" width={16} height={16} />
                </span>
              </button>
              <div className="faq__a" id={`${uid}-${i}`} role="region">
                <div>
                  <p className="body body--muted">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
