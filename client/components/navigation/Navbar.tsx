"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const APK_DOWNLOAD_URL = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || "#download";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isExternalDownload = APK_DOWNLOAD_URL.startsWith("http");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto h-13 px-4 sm:px-5 rounded-full transition-all duration-300 flex items-center justify-between gap-5 sm:gap-8 max-w-fit ${
          scrolled
            ? "glass-surface-elevated shadow-lg border-slate-900/[0.12]"
            : "glass-surface shadow-sm border-slate-900/[0.08]"
        }`}
      >
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-slate-900 hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
            ✦
          </div>
          <span className="text-sm font-semibold tracking-tight whitespace-nowrap text-slate-900">
            Wellness Voice
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#explore" className="hover:text-slate-950 transition-colors">
            Explore
          </a>
          <a href="#canvas" className="hover:text-slate-950 transition-colors">
            Interactive Canvas
          </a>
          <a href="#showcase" className="hover:text-slate-950 transition-colors">
            Showcase
          </a>
          <a href="#philosophy" className="hover:text-slate-950 transition-colors">
            Philosophy
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={APK_DOWNLOAD_URL}
            download={isExternalDownload ? "app-debug.apk" : undefined}
            target={isExternalDownload ? "_blank" : undefined}
            rel={isExternalDownload ? "noopener noreferrer" : undefined}
            className="pill-btn-blue !py-2 !px-4 sm:!px-5 !text-xs sm:!text-sm font-medium whitespace-nowrap shadow-sm"
          >
            <span>Download APK</span>
          </motion.a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-slate-950"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Animated Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-auto absolute top-16 w-64 glass-surface-elevated rounded-2xl p-4 shadow-xl border border-slate-900/[0.1] text-sm font-medium space-y-3.5 md:hidden text-slate-800"
        >
          <a
            href="#explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1a73e8]"
          >
            Explore Concepts
          </a>
          <a
            href="#canvas"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1a73e8]"
          >
            Interactive Canvas
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1a73e8]"
          >
            Showcase
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#1a73e8]"
          >
            Philosophy
          </a>
          <a
            href={APK_DOWNLOAD_URL}
            download={isExternalDownload ? "app-debug.apk" : undefined}
            target={isExternalDownload ? "_blank" : undefined}
            rel={isExternalDownload ? "noopener noreferrer" : undefined}
            className="block text-center pill-btn-blue !py-2 w-full mt-2"
          >
            Download APK
          </a>
        </motion.div>
      )}
    </div>
  );
}

