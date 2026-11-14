import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tandem — Culture fit hiring software for startups",
  description:
    "Tandem helps fast-growing teams hire for culture fit and keep the people they hire. Live fit scores, structured interviews and shared scorecards.",
};

export const viewport: Viewport = { themeColor: "#071a07" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React loads.
          This only ignores attribute mismatches on <body> itself, not its children. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
