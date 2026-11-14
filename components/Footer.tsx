"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { FOOTER_LINKS } from "@/lib/content";
import { Wordmark } from "./Nav";
import { useReveal } from "./ui";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  useReveal(root);

  return (
    <footer ref={root} className="footer">
      <div className="footer__card">
        <div className="footer__top">
          <div className="footer__brand" data-reveal>
            <Wordmark />
            <p className="body">Culture fit hiring software for startups that care who they hire.</p>
            <form
              className="newsletter"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="h7" htmlFor="nl-email">
                Monthly hiring tips. No spam.
              </label>
              <div className="newsletter__field">
                <input id="nl-email" type="email" required placeholder="Enter your work email" autoComplete="email" />
                <button type="submit" className="newsletter__submit">
                  <span>{sent ? "Thanks!" : "Subscribe"}</span>
                  <span className="newsletter__arrow">
                    <img src="/icons/arrow.svg" alt="" width={15} height={15} />
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="footer__links">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="footer__col" data-reveal>
                <p className="eyebrow eyebrow--accent">{col.title}</p>
                {col.links.map((l) => (
                  <a key={l} href="#top" className="body footer__link">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom small">
          <div className="footer__legal">
            <a href="#top">Terms</a>
            <a href="#top">Privacy</a>
            <a href="#top">GDPR</a>
          </div>
          <p>© 2026 Tandem. Built for kind teams.</p>
        </div>
      </div>
    </footer>
  );
}
