"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { Navbar } from "@/components/navigation/Navbar";

const APK_DOWNLOAD_URL = process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || "#download";
const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL?.trim() || "";

interface VideoEmbedInfo {
  type: "youtube" | "vimeo" | "direct" | "empty";
  src: string;
}

function parseVideoSource(url: string): VideoEmbedInfo {
  if (!url) return { type: "empty", src: "" };

  // YouTube detection: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo detection: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  return { type: "direct", src: url };
}

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hasError, setHasError] = useState(false);

  const videoInfo = parseVideoSource(VIDEO_URL);
  const isExternalDownload = APK_DOWNLOAD_URL.startsWith("http");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    setDuration(dur);
    setProgress(dur > 0 ? (curr / dur) * 100 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const seekTime = (seekPercent / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = seekTime;
    setProgress(seekPercent);
  };

  const cycleSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Sync isPlaying state with native events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setHasError(true);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfe] text-[#0f172a] relative selection:bg-[#1a73e8]/20 selection:text-[#1a73e8] bg-dots pb-24">
      {/* Custom Desktop Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Island Navigation */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium glass-surface-elevated text-slate-700 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
            <span>Interactive Demonstration Player</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]"
          >
            Wellness Voice in Action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Watch the on-device quantized neural model, deterministic nutritional calculations,
            and offline SQLite database running on real Android hardware.
          </motion.p>
        </div>

        {/* Video Player Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glass-surface-elevated rounded-3xl p-3 sm:p-5 shadow-xl border border-slate-900/[0.1] relative overflow-hidden"
        >
          {/* Top Status Bar */}
          <div className="flex items-center justify-between px-3 py-2 text-xs font-mono text-slate-500 border-b border-slate-900/[0.06] mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-700">STREAM:</span>
              <span className="truncate max-w-[200px] sm:max-w-xs text-slate-400">
                {videoInfo.type !== "empty" ? videoInfo.src : "NEXT_PUBLIC_VIDEO_URL (Unset)"}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>MODE: {videoInfo.type.toUpperCase()}</span>
              <span>•</span>
              <span>1080p 60FPS</span>
            </div>
          </div>

          {/* Player Aspect Frame */}
          <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-inner group">
            {videoInfo.type === "youtube" || videoInfo.type === "vimeo" ? (
              <iframe
                src={videoInfo.src}
                title="Wellness Voice Video Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : videoInfo.type === "direct" && !hasError ? (
              <>
                <video
                  ref={videoRef}
                  src={videoInfo.src}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  playsInline
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Big Play Overlay (when paused) */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all hover:bg-black/25"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Sleek Bottom Control Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 opacity-90 transition-opacity space-y-2.5">
                  {/* Scrubber Range */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
                  />

                  <div className="flex items-center justify-between text-xs text-white/90 font-mono">
                    {/* Left Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="hover:text-[#1a73e8] transition-colors p-1"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="hover:text-[#1a73e8] transition-colors p-1"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>

                      <span>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={cycleSpeed}
                        className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-[11px] font-semibold transition-colors"
                      >
                        {playbackSpeed}x
                      </button>

                      <button
                        onClick={handleFullscreen}
                        className="hover:text-[#1a73e8] transition-colors p-1"
                        aria-label="Fullscreen"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Empty / Placeholder State */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-slate-900 text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-slate-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-lg font-bold">Video URL Configuration</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Set your video stream link in <code className="text-[#1a73e8] font-mono bg-white/10 px-1.5 py-0.5 rounded">.env</code>:
                  </p>
                </div>

                <div className="font-mono text-xs bg-black/60 border border-white/15 px-4 py-2.5 rounded-xl text-emerald-400 select-all max-w-lg overflow-x-auto">
                  NEXT_PUBLIC_VIDEO_URL=https://your-video-link.mp4
                </div>

                <p className="text-[11px] text-slate-500 max-w-sm">
                  Supports direct MP4/WebM video files, Hugging Face dataset releases, YouTube links, and Vimeo streams.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Callouts */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={APK_DOWNLOAD_URL}
            download={isExternalDownload ? "app-debug.apk" : undefined}
            target={isExternalDownload ? "_blank" : undefined}
            rel={isExternalDownload ? "noopener noreferrer" : undefined}
            className="pill-btn-blue text-sm font-semibold shadow-md shadow-[#1a73e8]/20"
          >
            Download APK (~85–90 MB)
          </motion.a>

          <Link
            href="/application"
            className="pill-btn-secondary text-sm font-medium"
          >
            &larr; Back to Interactive Experience
          </Link>
        </div>
      </main>
    </div>
  );
}

