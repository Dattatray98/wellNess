"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export interface DraggableTokenProps {
  label: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  initialX?: number;
  initialY?: number;
  rotate?: number;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DraggableToken({
  label,
  subtitle,
  badge,
  icon,
  initialX = 0,
  initialY = 0,
  rotate = 0,
  accentColor = "#1a73e8",
  className = "",
  style = {},
}: DraggableTokenProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Deterministic tilt angle based on initial rotation
  const hoverRotate = rotate >= 0 ? rotate + 2 : rotate - 2;
  const floatDuration = 4.5 + (Math.abs(rotate * 5 + 3) % 3) * 0.7;

  return (
    <motion.div
      style={style}
      initial={{ x: initialX, y: initialY }}
      animate={
        isDragging
          ? {}
          : {
              y: [initialY - 8, initialY + 8, initialY - 8],
              rotate: [rotate - 1, rotate + 1.2, rotate - 1],
            }
      }
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className={`pointer-events-auto select-none ${className}`}
    >
      <motion.div
        drag
        dragSnapToOrigin={true}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileHover={{
          scale: 1.05,
          rotate: hoverRotate,
          transition: { duration: 0.2 },
        }}
        whileDrag={{
          scale: 1.1,
          zIndex: 60,
          boxShadow: "0 25px 45px -10px rgba(15, 23, 42, 0.22)",
        }}
        data-cursor="drag"
        className="cursor-grab active:cursor-grabbing touch-none glass-surface-elevated rounded-2xl px-4 py-2.5 flex items-center gap-3 border border-slate-900/[0.08] shadow-sm hover:border-slate-900/[0.18] hover:shadow-md transition-shadow"
      >
        {/* Accent dot or icon */}
        {icon ? (
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-sm shadow-xs"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            {icon}
          </div>
        ) : (
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: accentColor }}
          />
        )}

        {/* Card details */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-slate-900 tracking-tight whitespace-nowrap">
              {label}
            </span>
            {badge && (
              <span
                className="font-mono text-[9px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap border"
                style={{
                  backgroundColor: `${accentColor}12`,
                  borderColor: `${accentColor}25`,
                  color: accentColor,
                }}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-[10px] text-slate-500 font-mono tracking-tight mt-0.5 whitespace-nowrap">
              {subtitle}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}



