"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface VinylExperienceProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export const VinylExperience: React.FC<VinylExperienceProps> = ({
  isPlaying = false,
  onTogglePlay,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  // Pointer micro-physics outside React render cycle (Section 3.B & 5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const discOffsetX = useTransform(pointerX, [-0.5, 0.5], [-2.5, 2.5]);
  const discOffsetY = useTransform(pointerY, [-0.5, 0.5], [-2.5, 2.5]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(normX);
    pointerY.set(normY);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        x: shouldReduceMotion ? 0 : discOffsetX,
        y: shouldReduceMotion ? 0 : discOffsetY,
      }}
      className="relative w-full max-w-[430px] lg:max-w-[470px] xl:max-w-[490px] aspect-[479/405] select-none mx-auto"
      aria-label="Experiencia interactiva del tocadiscos Sabbath Vol. 001"
    >
      {/* 1. Base Collage (Face portrait, red paper textures, Medellín city photos, tonearm & quote) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/hero-collage-clean.png"
          alt="Composición editorial Sabbath: Medellín, fotografía urbana y texturas"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 490px"
          className="object-contain object-center"
        />
      </div>

      {/* 2. Interactive Rotating Vinyl Disc (Centered at 51.57%, 52.59%) */}
      <div
        className="absolute z-10 top-[52.59%] left-[51.57%] -translate-x-1/2 -translate-y-1/2 w-[65.97%] aspect-square cursor-pointer group rounded-full"
        onClick={onTogglePlay}
        title={isPlaying ? "Pausar reproducción" : "Iniciar reproducción"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onTogglePlay?.();
          }
        }}
        aria-label={isPlaying ? "Pausar tocadiscos" : "Reproducir tocadiscos"}
      >
        <motion.div
          animate={
            shouldReduceMotion || !isInView
              ? { rotate: 0 }
              : { rotate: 360 }
          }
          transition={{
            repeat: Infinity,
            duration: isPlaying ? 2.8 : 32,
            ease: "linear",
          }}
          className="relative w-full h-full rounded-full overflow-hidden will-change-transform"
        >
          {/* Rotating Red Center Label + Inner Dead-Wax Grooves (preserves tonearm & yellow badge) */}
          <div className="absolute inset-0 [clip-path:circle(26.5%_at_50%_50%)]">
            <Image
              src="/assets/vinyl-pure-disc.png"
              alt="Disco de vinilo Sabbath: Cultura Local Vol. 001"
              fill
              sizes="360px"
              className="object-cover rounded-full"
            />
          </div>

          {/* Dynamic Vinyl Conic Light Sheen across full record */}
          <div
            className="absolute inset-0 rounded-full opacity-30 mix-blend-screen pointer-events-none"
            style={{
              background:
                "conic-gradient(from 55deg, transparent 0deg, rgba(255,255,255,0.16) 42deg, transparent 85deg, transparent 180deg, rgba(255,255,255,0.16) 222deg, transparent 265deg, transparent 360deg)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VinylExperience;
