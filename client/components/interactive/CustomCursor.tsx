"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(pointer: coarse)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

function getServerPointerSnapshot() {
  return true;
}

export function CustomCursor() {
  const isTouchDevice = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  const [cursorState, setCursorState] = useState<"default" | "pointer" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isDrag = target.closest('[data-cursor="drag"]');
      const isPointer = target.closest('button, a, input, [role="button"], [data-cursor="pointer"]');

      if (isDrag) {
        setCursorState("drag");
      } else if (isPointer) {
        setCursorState("pointer");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-slate-900 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: !isVisible || cursorState === "pointer" || cursorState === "drag" ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Fluid trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-slate-900/30 bg-slate-900/[0.04] pointer-events-none z-[9998] flex items-center justify-center font-mono text-[10px] text-slate-800 font-semibold"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: cursorState === "pointer" ? 44 : cursorState === "drag" ? 54 : 30,
          height: cursorState === "pointer" ? 44 : cursorState === "drag" ? 54 : 30,
          borderColor:
            cursorState === "pointer"
              ? "rgba(26, 115, 232, 0.5)"
              : cursorState === "drag"
              ? "rgba(15, 23, 42, 0.4)"
              : "rgba(15, 23, 42, 0.2)",
          backgroundColor:
            cursorState === "pointer"
              ? "rgba(26, 115, 232, 0.08)"
              : cursorState === "drag"
              ? "rgba(15, 23, 42, 0.08)"
              : "rgba(15, 23, 42, 0.02)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cursorState === "drag" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            Drag
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

