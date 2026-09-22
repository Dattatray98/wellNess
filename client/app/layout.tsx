import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wellness Voice — Offline Personal Wellness Agent | Download APK",
  description:
    "Android phone-first wellness assistant powered by on-device Qwen2.5 INT4 local inference, structured intents, and deterministic tool execution. Built for iQOO Hackathon 2026.",
  keywords: [
    "Wellness Voice",
    "Offline AI",
    "Personal Wellness Assistant",
    "iQOO Hackathon 2026",
    "Local LLM",
    "Qwen INT4",
    "Deterministic Nutrition",
    "Android APK Download",
  ],
  authors: [{ name: "Wellness Voice Team" }],
  openGraph: {
    title: "Wellness Voice — Offline Personal Wellness Agent",
    description:
      "Probabilistic AI language reasoning separated from deterministic application execution. Download the Android APK.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#090d16",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070a12] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
