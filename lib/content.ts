// All copy for the landing page, taken from the Figma file "Tandem WIP" → Nu Design.
import type { CSSProperties } from "react";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

type Part = { src: string; inset: string };
export type Logo = { name: string; w: number; h: number; src?: string; parts?: Part[] };

export const LOGOS_ROW_1: Logo[] = [
  { name: "Notion", src: "/logos/notion.svg", w: 102.4, h: 37.245 },
  { name: "Zapier", src: "/logos/zapier.svg", w: 86.599, h: 23.555 },
  { name: "Linear", src: "/logos/linear.svg", w: 93.003, h: 23.251 },
  { name: "Loom", src: "/logos/loom.svg", w: 81.004, h: 24.523 },
  { name: "Webflow", src: "/logos/webflow.svg", w: 115.587, h: 19.371 },
  { name: "Atlassian", src: "/logos/atlassian.svg", w: 144.537, h: 17.922 },
  {
    name: "Shopify",
    w: 81.163,
    h: 23.187,
    parts: [
      { src: "/logos/shopify-text.svg", inset: "19.53% -0.05% 0 28.44%" },
      { src: "/logos/shopify-bag.svg", inset: "0.23% 75.44% 2.59% 0.07%" },
    ],
  },
  {
    name: "Dropbox",
    w: 119.798,
    h: 23.588,
    parts: [
      { src: "/logos/dropbox-mark.svg", inset: "0 76.83% 0 0" },
      { src: "/logos/dropbox-text.svg", inset: "13.81% 0 1.22% 27.72%" },
    ],
  },
  { name: "Asana", src: "/logos/asana.svg", w: 108.279, h: 21.439 },
];

export const LOGOS_ROW_2: Logo[] = [
  { name: "Intercom", src: "/logos/intercom.svg", w: 119.607, h: 27.353 },
  { name: "Figma", src: "/logos/figma.svg", w: 61.999, h: 22.733 },
  { name: "Gusto", src: "/logos/gusto.svg", w: 56.956, h: 21.67 },
  { name: "Calendly", src: "/logos/calendly.svg", w: 98.723, h: 23.914 },
  { name: "Microsoft", src: "/logos/microsoft.svg", w: 101.255, h: 21.595 },
  { name: "HubSpot", src: "/logos/hubspot.svg", w: 81.401, h: 23.806 },
  { name: "Airbnb", src: "/logos/airbnb.svg", w: 89.081, h: 27.801 },
  { name: "Stripe", src: "/logos/stripe.svg", w: 49.916, h: 20.775 },
  { name: "Netflix", src: "/logos/netflix.svg", w: 71.072, h: 19.208 },
  { name: "Partner", src: "/logos/logo-x.svg", w: 58.363, h: 19.571 },
];

export const CHIP_ROWS = [
  ["Ownership", "Candour", "Curiosity", "Pace", "Kindness", "Grit"],
  ["Kindness", "Craft", "Ownership", "Focus", "Grit", "Clarity"],
  ["Teamwork", "Clarity", "Candour", "Humility", "Pace", "Curiosity"],
];

export const STATS = [
  { value: 150, decimals: 0, prefix: "", suffix: "+", label: "Startups that hire with us" },
  { value: 50, decimals: 0, prefix: "", suffix: "%", label: "Less time stuck in interviews" },
  { value: 12.4, decimals: 1, prefix: "$", suffix: "M", label: "Saved from bad hires" },
  { value: 10, decimals: 0, prefix: "", suffix: " min", label: "To get you set up" },
];

export const STEPS = [
  {
    title: "Tell us what your team values",
    body: "Pick the traits your best people share, or write your own. We'll turn them into a scorecard in minutes.",
  },
  {
    title: "Interview with a co-pilot",
    body: "Fit scores and smart follow-up questions show up as you talk, so nobody has to wing it on the call.",
  },
  {
    title: "Decide together",
    body: "Everyone's scorecard lands in one place, so the offer takes one friendly meeting, not a week of Slack debates.",
  },
];

export type Company = "Nexus" | "Bravix" | "Halden" | "Lumora" | "Candid" | "Driftmill";
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: Company;
  img: string;
  imgStyle?: CSSProperties;
  overlay?: string;
};

const OVERLAY =
  "linear-gradient(to top, rgba(7,26,7,0.96) 0%, rgba(7,26,7,0.75) 45%, rgba(7,26,7,0) 85%)";

export const TESTIMONIALS_A: Testimonial[] = [
  {
    quote: "Tandem helped us cut interview time in half while doubling confidence in our final picks.",
    name: "Jade Winston",
    role: "HR Lead",
    company: "Nexus",
    img: "/img/t-jade.png",
    imgStyle: { height: "148.54%", left: "0.04%", top: "-11.66%", width: "109.29%" },
    overlay:
      "linear-gradient(to top, rgba(7,26,7,0.96) 0%, rgba(7,26,7,0.75) 20.663%, rgba(7,26,7,0) 66.717%)",
  },
  {
    quote: "The insights are freakishly accurate. It's like having a hiring coach in every interview.",
    name: "John Mason",
    role: "Head of People",
    company: "Bravix",
    img: "/img/t-john.png",
    overlay: OVERLAY,
  },
  {
    quote: 'Our hit rate with new hires is way up. We finally know what "great fit" looks like.',
    name: "Alexis Kim",
    role: "Human Resources",
    company: "Halden",
    img: "/img/t-alexis.png",
    overlay: OVERLAY,
  },
];

export const TESTIMONIALS_B: Testimonial[] = [
  {
    quote: "Hiring finally feels objective, not just based on vibes.",
    name: "Talia Mendez",
    role: "CEO",
    company: "Lumora",
    img: "/img/t-talia.png",
    overlay:
      "linear-gradient(to top, rgba(7,26,7,0.96) 0.34%, rgba(7,26,7,0.75) 25.58%, rgba(7,26,7,0) 70.16%)",
  },
  {
    quote: "We used to debate endlessly after interviews. Now we get a shared view of each candidate.",
    name: "Cody Maxwell",
    role: "Human Resources",
    company: "Candid",
    img: "/img/t-cody.png",
    overlay: OVERLAY,
  },
  {
    quote: "Tandem made our hiring faster, fairer and way more collaborative.",
    name: "Joshua Weissman",
    role: "Founder",
    company: "Driftmill",
    img: "/img/t-joshua.png",
    overlay: OVERLAY,
  },
];

export type Plan = {
  id: "starter" | "growth" | "scale";
  name: string;
  icon: string;
  blurb: string;
  monthly: number;
  features: string[];
  note?: string;
  tag?: string;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter plan",
    icon: "/icons/plus.svg",
    blurb: "For your first few make-or-break hires.",
    monthly: 199,
    features: [
      "Up to 20 active candidates",
      "Culture fit scorecards",
      "Live interview prompts",
      "ATS sync (Greenhouse, Lever, Workable)",
    ],
  },
  {
    id: "growth",
    name: "Growth plan",
    icon: "/icons/trend.svg",
    blurb: "For growing teams hiring on every front.",
    monthly: 499,
    tag: "Most loved",
    features: [
      "Up to 50 active candidates",
      "Everything in Starter",
      "Hiring analytics by channel",
      "Named support contact",
    ],
    note: "Most teams outgrow Starter by their fifth hire. This plan fits much better.",
  },
  {
    id: "scale",
    name: "Scale plan",
    icon: "/icons/building.svg",
    blurb: "For teams hiring every week.",
    monthly: 999,
    features: [
      "Unlimited active candidates",
      "Everything in Growth",
      "Custom integrations and SSO",
      "Quarterly hiring reviews",
    ],
  },
];

/** Yearly billing = "2 months free" → 10 months' price spread over 12, shown per month. */
export const yearlyPerMonth = (monthly: number) => Math.round((monthly * 10) / 12);

export const FAQS = [
  {
    q: "What is a culture fit assessment?",
    a: "It’s a way to check how well a candidate’s values and working style match the way your team actually works. Tandem builds yours from the values you choose, then scores every candidate against them during the interview.",
  },
  {
    q: "Isn’t hiring for culture fit just hiring people like us?",
    a: "Not with Tandem. It scores shared values, not personality or background, and points out the gaps in your team. That’s the difference between culture fit and culture add: you hire people who strengthen the team instead of copying it.",
  },
  {
    q: "Do I need to replace my current ATS?",
    a: "No. Tandem works alongside Greenhouse, Lever and Workable. Your candidates and stages stay where they are.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are ready in under 10 minutes. You pick your team values, connect your ATS and invite your interviewers.",
  },
  {
    q: "How does Tandem score culture fit?",
    a: "It compares each candidate’s interview answers with the values your team chose, then shows the reasons behind every score on a shared interview scorecard. You always see why, not just a number.",
  },
  {
    q: "What happens when my free trial ends?",
    a: "You choose a plan or your account pauses. You won’t be charged automatically, because we don’t take card details for the trial.",
  },
  {
    q: "Is candidate data safe?",
    // TODO(legal): confirm SOC 2 Type II and GDPR status before launch (flagged "[confirm]" in the copy doc).
    a: "Yes. Data is encrypted, we’re SOC 2 Type II and GDPR compliant, and candidate data is never sold or used to train outside AI models.",
  },
  {
    q: "What does it cost after the trial?",
    a: "Plans start at $199 a month for up to 20 active candidates. You can change or cancel your plan anytime.",
  },
];

export const FOOTER_LINKS = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { title: "Resources", links: ["Help center", "Hiring guides", "Templates", "Security"] },
];

export const PIPELINE = [
  { initials: "SC", name: "Sarah Chen", title: "Frontend Engineer", score: "9.2", stage: "Interview", tone: "blue" },
  { initials: "MJ", name: "Marcus Johnson", title: "Product Manager", score: "8.7", stage: "Final Review", tone: "green" },
  { initials: "AR", name: "Alex Rivera", title: "Marketing Designer", score: "8.9", stage: "Screening", tone: "orange" },
  { initials: "JW", name: "Jordan Wu", title: "Data Scientist", score: "8.4", stage: "Applied", tone: "purple" },
  { initials: "WT", name: "Watson Thomas", title: "Software Engineer", score: "8.5", stage: "Screening", tone: "orange" },
  { initials: "MG", name: "May Graversen", title: "Technical Analyst", score: "8.1", stage: "Applied", tone: "purple" },
] as const;
