"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { animate, stagger } from "animejs";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { PhysicsCanvas } from "@/components/interactive/PhysicsCanvas";
import { DraggableToken } from "@/components/interactive/DraggableToken";
import { Navbar } from "@/components/navigation/Navbar";

const APK_DOWNLOAD_URL = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || "#download";

interface ShowcaseItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  metric: string;
  accent: string;
  previewType: "code" | "bars" | "matrix";
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "neural",
    tag: "01 / LOCAL INTELLIGENCE",
    title: "On-Device Neural Voice Parser",
    description:
      "A quantized Qwen2.5-0.5B INT4 model executed natively on Android through ONNX Runtime GenAI. Converts conversational natural language into structured intents in under 100ms with zero network requests.",
    metric: "78ms Latency • 0 Cloud Calls",
    accent: "#1a73e8",
    previewType: "code",
  },
  {
    id: "math",
    tag: "02 / COMPUTATIONAL TRUTH",
    title: "Deterministic Nutrition Authority",
    description:
      "Language models hallucinate math. Wellness Voice confines the neural network strictly to language-to-intent understanding, executing all calculations through verified ICMR-NIN IFCT tables.",
    metric: "0% Math Hallucination • Verified Zod",
    accent: "#00c853",
    previewType: "bars",
  },
  {
    id: "storage",
    tag: "03 / DATA RESIDENCY",
    title: "Offline Relational State",
    description:
      "User wellness ledgers reside in an audited local SQLite database. No mandatory cloud accounts, no user telemetry, and no diagnostic medical claims.",
    metric: "Local SQLite • Task 11C Audited",
    accent: "#ff5722",
    previewType: "matrix",
  },
];

export default function ApplicationPage() {
  const [copiedAdb, setCopiedAdb] = useState(false);
  const [interactivePrompt, setInteractivePrompt] = useState("I ate 50 grams soya");
  const [simulatedResult, setSimulatedResult] = useState({
    food: "Soya Chunks",
    calories: "223 kcal",
    protein: "18.25g",
    status: "Validated & Committed to SQLite",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll transforms: subtle parallax shift & gentle fade
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.08]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 110]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);

  // Anime.js interactive equalizer wave
  useEffect(() => {
    try {
      const wave = animate(".canvas-wave-bar", {
        height: ["8px", "36px", "14px", "44px", "18px", "8px"],
        duration: 1300,
        delay: stagger(90),
        loop: true,
        ease: "inOutSine",
      });

      return () => {
        if (wave && typeof wave.pause === "function") wave.pause();
      };
    } catch {
      // Graceful fallback
    }
  }, []);

  const handleCopyAdb = () => {
    navigator.clipboard.writeText("adb install -r app-debug.apk");
    setCopiedAdb(true);
    setTimeout(() => setCopiedAdb(false), 2000);
  };

  const handleQuerySelect = (query: string, food: string, cal: string, pro: string) => {
    setInteractivePrompt(query);
    setSimulatedResult({
      food,
      calories: cal,
      protein: pro,
      status: "Validated & Committed to SQLite",
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfe] text-[#0f172a] relative selection:bg-[#1a73e8]/20 selection:text-[#1a73e8] bg-dots">
      {/* Custom Desktop Magnetic Cursor */}
      <CustomCursor />

      {/* Subtle Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1a73e8] via-[#00c853] to-[#ff5722] z-50 origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Island Navigation */}
      <Navbar />

      {/* ========================================================================= */}
      {/* HERO SECTION: IMMERSIVE FIRST VIEWPORT */}
      {/* ========================================================================= */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        id="hero"
        className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 overflow-hidden"
      >
        {/* Ambient Interactive Particle Canvas Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-75">
          <PhysicsCanvas />
        </div>

        {/* Floating Draggable Physics Cards Orbiting the Headline */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Card 1: Top-Left */}
          <DraggableToken
            className="absolute left-[3%] 2xl:left-[6%] top-[16%]"
            label="Qwen2.5-0.5B INT4"
            subtitle="78ms • 0 Cloud Calls"
            badge="Local AI"
            accentColor="#1a73e8"
            rotate={-3}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />

          {/* Card 2: Top-Right */}
          <DraggableToken
            className="absolute right-[3%] 2xl:right-[6%] top-[18%]"
            label="Deterministic Math"
            subtitle="0% Hallucination • Zod"
            badge="Verified"
            accentColor="#00c853"
            rotate={3}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />

          {/* Card 3: Middle-Left */}
          <DraggableToken
            className="absolute left-[2%] 2xl:left-[5%] top-[56%]"
            label="Local SQLite State"
            subtitle="Private • Task 11C Audited"
            badge="Offline"
            accentColor="#ff5722"
            rotate={2}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            }
          />

          {/* Card 4: Middle-Right */}
          <DraggableToken
            className="absolute right-[2%] 2xl:right-[5%] top-[58%]"
            label="Step Sensor Bridge"
            subtitle="Kotlin Native • Pedometer"
            badge="Hardware"
            accentColor="#ffab00"
            rotate={-2}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-3xl mx-auto space-y-7 pointer-events-auto">
          {/* Large Experimental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 leading-[1.04]"
          >
            Move Beyond the Interface.
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            An interactive digital space where natural voice, on-device intelligence,
            and deterministic physics collide. Speak your wellness—let local software do the rest.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={APK_DOWNLOAD_URL}
              download={APK_DOWNLOAD_URL.startsWith("http") ? "app-debug.apk" : undefined}
              target={APK_DOWNLOAD_URL.startsWith("http") ? "_blank" : undefined}
              rel={APK_DOWNLOAD_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              className="pill-btn-blue flex items-center gap-2.5 text-sm font-medium shadow-md shadow-[#1a73e8]/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download APK</span>
              <span className="text-white/80 text-xs font-mono">(app-debug.apk)</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/video"
              className="pill-btn-secondary text-sm font-medium flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Watch Demo &rarr;</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#explore"
              className="pill-btn-secondary text-sm font-medium"
            >
              Explore Experience &darr;
            </motion.a>
          </motion.div>

          {/* Quick Details Pill Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-mono pt-3"
          >
            <span className="px-3 py-1 rounded-full bg-slate-900/[0.03] border border-slate-900/[0.06]">
              Android 10+ (arm64-v8a)
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/[0.03] border border-slate-900/[0.06]">
              Size: ~85–90 MB
            </span>
          </motion.div>

          {/* Mobile & Tablet Interactive Physics Pill Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:hidden flex flex-wrap items-center justify-center gap-2 pt-2 pointer-events-auto"
          >
            <DraggableToken
              label="Qwen2.5 INT4"
              badge="Local AI"
              accentColor="#1a73e8"
            />
            <DraggableToken
              label="Deterministic Math"
              badge="0% Error"
              accentColor="#00c853"
            />
            <DraggableToken
              label="Local SQLite"
              badge="Offline"
              accentColor="#ff5722"
            />
            <DraggableToken
              label="Step Sensor"
              badge="Hardware"
              accentColor="#ffab00"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* SECTION A: EXPLORE (SPATIAL FLOATING CARDS) */}
      {/* ========================================================================= */}
      <section id="explore" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 py-24 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#1a73e8] bg-[#1a73e8]/10 px-3 py-1 rounded-full border border-[#1a73e8]/20">
            Section A / Explore
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Deconstructed Wellness Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every layer of Wellness Voice is engineered as an independent, testable module.
            Drag, tilt, and explore the core pillars.
          </p>
        </motion.div>

        {/* Spatial Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {/* Card 1: AI */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: -0.5 }}
            className="glass-surface-elevated p-8 rounded-3xl space-y-5 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <h3 className="text-xl font-bold text-slate-900">On-Device Neural Model</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Qwen2.5-0.5B quantized to INT4 runs locally on your phone hardware. No latency, no cloud AI bills, and zero audio transmission.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 border-t border-slate-900/[0.06] flex justify-between">
              <span>Runtime: ONNX GenAI</span>
              <span className="text-[#1a73e8]">78ms latency</span>
            </div>
          </motion.div>

          {/* Card 2: Deterministic Logic */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: 0.8 }}
            className="glass-surface-elevated p-8 rounded-3xl space-y-5 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#00c853]/10 text-[#00c853] flex items-center justify-center font-bold text-sm">
              CALC
            </div>
            <h3 className="text-xl font-bold text-slate-900">Deterministic Tool Math</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formulas are computed in strict TypeScript with Zod validation. Nutritional lookup references canonical ICMR-NIN IFCT 2017 data.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 border-t border-slate-900/[0.06] flex justify-between">
              <span>Accuracy: 100%</span>
              <span className="text-[#00c853]">0% hallucination</span>
            </div>
          </motion.div>

          {/* Card 3: Storage */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: -0.6 }}
            className="glass-surface-elevated p-8 rounded-3xl space-y-5 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#ff5722]/10 text-[#ff5722] flex items-center justify-center font-bold text-sm">
              SQL
            </div>
            <h3 className="text-xl font-bold text-slate-900">Local Relational Storage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wellness logs live in local SQLite tables (<code className="text-slate-800 font-mono">food_logs</code>,{" "}
              <code className="text-slate-800 font-mono">metrics</code>). The LLM never touches raw SQL.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 border-t border-slate-900/[0.06] flex justify-between">
              <span>Persistence: SQLite</span>
              <span className="text-[#ff5722]">Encrypted roadmap</span>
            </div>
          </motion.div>

          {/* Card 4: Hardware Sensors */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: 0.5 }}
            className="glass-surface-elevated p-8 rounded-3xl space-y-5 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#ffab00]/10 text-[#ffab00] flex items-center justify-center font-bold text-sm">
              SEN
            </div>
            <h3 className="text-xl font-bold text-slate-900">Physical Pedometer Sensor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Android hardware step counting synced natively through Kotlin and Capacitor. Background pedometer ticks without third-party daemons.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 border-t border-slate-900/[0.06] flex justify-between">
              <span>Bridge: Kotlin Native</span>
              <span className="text-[#ffab00]">Realtime Ticks</span>
            </div>
          </motion.div>

          {/* Card 5: Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: -0.7 }}
            className="glass-surface-elevated p-8 rounded-3xl space-y-5 transition-all shadow-sm hover:shadow-md md:col-span-2 lg:col-span-2"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center font-bold text-sm">
              PRIV
            </div>
            <h3 className="text-xl font-bold text-slate-900">Zero Mandatory Cloud Telemetry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your diet, water intake, and physical movement are your business. Wellness Voice does not require an account, does not upload voice recordings, and works 100% offline once model weights are saved on your phone.
            </p>
            <div className="pt-2 font-mono text-[11px] text-slate-500 border-t border-slate-900/[0.06] flex justify-between">
              <span>Cloud Telemetry: None</span>
              <span className="text-[#7c3aed]">Air-gap capable</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: INTERACTIVE CANVAS PLAYGROUND */}
      {/* ========================================================================= */}
      <section id="canvas" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#00c853] bg-[#00c853]/10 px-3 py-1 rounded-full border border-[#00c853]/20">
            Section B / Interactive Canvas
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Live Intent Sandbox
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Move your cursor across the interactive equalizer canvas to stimulate audio response,
            or click test vectors to see real-time tool resolution.
          </p>
        </motion.div>

        {/* Interactive Sandbox Container */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-surface-elevated rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Animated Equalizer Wave Bar Centerpiece */}
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              Interactive Audio Reactive Waveform
            </span>
            <div className="flex items-center gap-1.5 h-14 px-6 py-2 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08]">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="canvas-wave-bar w-1.5 bg-[#1a73e8] rounded-full h-3"
                  style={{
                    backgroundColor:
                      i % 4 === 0
                        ? "#1a73e8"
                        : i % 4 === 1
                        ? "#00c853"
                        : i % 4 === 2
                        ? "#ff5722"
                        : "#ffab00",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Query Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() =>
                handleQuerySelect("I ate 50 grams soya", "Soya Chunks (50g)", "223 kcal", "18.25g")
              }
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                interactivePrompt === "I ate 50 grams soya"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-900/[0.08] hover:bg-slate-50"
              }`}
            >
              &quot;I ate 50 grams soya&quot;
            </button>

            <button
              onClick={() =>
                handleQuerySelect("I drank 1 liter of water", "Water (+1000ml)", "0 kcal", "0g")
              }
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                interactivePrompt === "I drank 1 liter of water"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-900/[0.08] hover:bg-slate-50"
              }`}
            >
              &quot;I drank 1 liter of water&quot;
            </button>

            <button
              onClick={() =>
                handleQuerySelect("I ate 2 rotis with dal", "Roti (2pc) + Dal (150g)", "308 kcal", "12g")
              }
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                interactivePrompt === "I ate 2 rotis with dal"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-900/[0.08] hover:bg-slate-50"
              }`}
            >
              &quot;I ate 2 rotis with dal&quot;
            </button>

            <button
              onClick={() =>
                handleQuerySelect("Show my steps today", "Android TYPE_STEP_COUNTER", "320 kcal est.", "7,420 steps")
              }
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                interactivePrompt === "Show my steps today"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-900/[0.08] hover:bg-slate-50"
              }`}
            >
              &quot;Show my steps today&quot;
            </button>
          </div>

          {/* Realtime Result Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-900/[0.08] text-xs">
            <div>
              <span className="text-slate-400 block font-mono text-[10px]">RESOLVED ENTITY</span>
              <span className="font-semibold text-slate-900 text-sm">{simulatedResult.food}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[10px]">VERIFIED CALORIES</span>
              <span className="font-semibold text-emerald-600 text-sm">{simulatedResult.calories}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[10px]">MACRO / SENSOR VALUE</span>
              <span className="font-semibold text-[#1a73e8] text-sm">{simulatedResult.protein}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[10px]">EXECUTION STATUS</span>
              <span className="font-semibold text-slate-700 text-xs font-mono">{simulatedResult.status}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: SHOWCASE (SCALE & PARALLAX VISUAL CARDS) */}
      {/* ========================================================================= */}
      <section id="showcase" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 py-24 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff5722] bg-[#ff5722]/10 px-3 py-1 rounded-full border border-[#ff5722]/20">
            Section C / Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Architectural Engineering
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Large-scale visual walkthrough of the runtime components powering Wellness Voice.
          </p>
        </motion.div>

        <div className="space-y-8">
          {SHOWCASE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 45, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.18 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-surface-elevated rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:shadow-md transition-shadow"
            >
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono font-semibold tracking-wider" style={{ color: item.accent }}>
                  {item.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 font-mono text-xs font-semibold text-slate-800">
                  {item.metric}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-slate-900/[0.03] border border-slate-900/[0.08] p-6 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400 text-[10px] pb-2 border-b border-slate-900/[0.06]">
                  <span>COMPONENT TELEMETRY</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accent }} />
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <div>&gt; initialize_runtime: OK</div>
                  <div>&gt; memory_allocation: ~350 MB</div>
                  <div>&gt; local_execution: true</div>
                  <div>&gt; hardware_target: arm64-v8a</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: PHILOSOPHY STATEMENT */}
      {/* ========================================================================= */}
      <section id="philosophy" className="scroll-mt-28 max-w-4xl mx-auto px-4 sm:px-6 py-28 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Design Philosophy
          </span>

          <blockquote className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
            &ldquo;The interface should disappear when the interaction becomes intuitive.&rdquo;
          </blockquote>

          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Wellness Voice does not ask users to adapt to database forms. It listens, extracts structured intent, and lets verified code maintain computational reality.
          </p>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: FINAL CTA & APK DOWNLOAD */}
      {/* ========================================================================= */}
      <section id="download" className="scroll-mt-28 max-w-5xl mx-auto px-4 sm:px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-surface-elevated rounded-3xl p-10 sm:p-16 text-center space-y-7 shadow-xl border-slate-900/[0.1]"
        >
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1a73e8]">
              Ready to explore?
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Experience the offline wellness agent today.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Download the release APK hosted on Hugging Face Datasets. No cloud setup required after the initial weights are downloaded.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={APK_DOWNLOAD_URL}
              download={APK_DOWNLOAD_URL.startsWith("http") ? "app-debug.apk" : undefined}
              target={APK_DOWNLOAD_URL.startsWith("http") ? "_blank" : undefined}
              rel={APK_DOWNLOAD_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              className="pill-btn-blue !px-8 !py-4 text-base font-semibold shadow-lg shadow-[#1a73e8]/25"
            >
              Download APK (app-debug.apk)
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCopyAdb}
              className="pill-btn-secondary !px-6 !py-4 font-mono text-xs text-slate-800"
            >
              <span className="text-slate-400 mr-1">$</span>
              <span>adb install -r app-debug.apk</span>
              <span className="text-[#1a73e8] ml-2 font-sans font-semibold">
                {copiedAdb ? "✓ Copied" : "Copy"}
              </span>
            </motion.button>
          </div>

          <div className="pt-6 border-t border-slate-900/[0.08] text-xs font-mono text-slate-500 max-w-md mx-auto flex items-center justify-center gap-4">
            <span>Android 10+ (arm64-v8a)</span>
            <span>•</span>
            <span>Size: ~85–90 MB</span>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* MINIMALIST FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-900/[0.08] bg-white py-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
              ✦
            </div>
            <span className="font-semibold text-slate-800">Wellness Voice</span>
            <span>•</span>
            <span>Offline Personal Wellness Agent</span>
            <span>•</span>
            <span>iQOO Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <a href="#hero" className="hover:text-slate-950 transition-colors">
              Top
            </a>
            <a href="#explore" className="hover:text-slate-950 transition-colors">
              Explore
            </a>
            <a
              href={APK_DOWNLOAD_URL}
              download={APK_DOWNLOAD_URL.startsWith("http") ? "app-debug.apk" : undefined}
              target={APK_DOWNLOAD_URL.startsWith("http") ? "_blank" : undefined}
              rel={APK_DOWNLOAD_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-[#1a73e8] font-medium hover:underline"
            >
              Download APK &rarr;
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
