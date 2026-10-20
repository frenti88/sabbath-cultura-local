"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { useAudioPlayer } from "@/context/AudioContext";

export const HeroVinyl: React.FC = () => {
  const { isPlaying, togglePlay } = useAudioPlayer();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { amount: 0.2 });

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative w-full min-h-[660px] sm:min-h-[480px] lg:h-[453px] lg:min-h-0 rounded-[13px] border border-white/[0.11] overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 86% 41%, #791d2e 0%, #431b24 28%, #2a2224 52%, #222123 77%), linear-gradient(108deg, #262626, #451923)",
      }}
      aria-label="Bienvenida Sabbath - Cultura Local"
    >
      {/* Subtle halftone/dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 0.5px, transparent 0.5px)",
          backgroundSize: "6px 6px",
        }}
        aria-hidden="true"
      />

      {/* Left Content Area */}
      <div className="relative z-10 pt-[32px] sm:pt-[44px] px-[20px] sm:px-[46px] pb-[36px] max-w-[640px]">
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-[10px] text-[#ffcbd2] text-[10px] sm:text-[11px] font-extrabold tracking-[2.5px] uppercase"
        >
          <span className="w-[22px] h-[2px] bg-[#FFC501] inline-block flex-shrink-0" />
          <span>SABBATH / EL LADO B</span>
        </motion.div>

        {/* Headline H1 */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[18px] sm:mt-[25px] mb-[15px] font-headline font-black uppercase text-left tracking-[-2.3px] sm:tracking-[-3.9px] leading-[0.99] text-[34px] sm:text-[48px] lg:text-[57px]"
        >
          <span className="block text-white">HOY TU BREAK</span>
          <span className="block text-[#F3334D]">SUENA, SE LEE</span>
          <span className="block text-[#F3334D]">Y SE SIENTE LOCAL.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#d1c5c7] text-[14px] sm:text-[16px] leading-[1.48] max-w-[370px] tracking-[-0.16px]"
        >
          Una pausa cultural con música, lectura y cine hecho en Colombia.
        </motion.p>

        {/* Buttons Row */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex flex-wrap items-center gap-[14px] sm:gap-[16px] mt-[20px] sm:mt-[23px]"
        >
          {/* Primary CTA */}
          <a
            href="#seleccion"
            className="inline-flex items-center justify-center gap-[12px] h-[46px] sm:h-[48px] px-[22px] sm:px-[25px] rounded-full bg-sabbath-red hover:bg-[#cf1832] text-white text-[11.5px] sm:text-[12px] font-extrabold tracking-[0.7px] uppercase shadow-[0_4px_16px_rgba(181,21,43,0.4)] transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow"
          >
            <Play className="w-[14px] h-[14px] fill-white text-white" />
            <span>EMPEZAR A EXPLORAR</span>
          </a>

          {/* Secondary Ghost Link */}
          <a
            href="#seleccion"
            className="text-[#d2ced0] hover:text-white text-[11px] font-bold tracking-[1px] py-[8px] px-[4px] uppercase transition-colors"
          >
            VER SELECCIÓN ↗
          </a>
        </motion.div>
      </div>

      {/* Right Photographic Peek (City background photo) */}
      <div
        className="hidden md:block absolute right-[-15px] top-[-55px] w-[268px] h-[244px] rotate-[13deg] border-[9px] border-[#d1cbca]/20 filter grayscale opacity-[0.14] pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/assets/city.png"
          alt="Medellín textura urbana de fondo"
          fill
          className="object-cover"
        />
      </div>

      {/* Hero Vinyl Disc */}
      <div
        onClick={togglePlay}
        className="absolute z-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-[30px] lg:right-[105px] top-[338px] sm:top-[120px] lg:top-[43px] w-[280px] sm:w-[320px] lg:w-[370px] aspect-square rounded-full cursor-pointer group select-none shadow-[-13px_31px_55px_rgba(0,0,0,0.6)]"
        title={isPlaying ? "Pausar música" : "Reproducir canción de la edición"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePlay();
          }
        }}
        aria-label={isPlaying ? "Pausar música desde vinilo" : "Reproducir música desde vinilo"}
      >
        <motion.div
          animate={
            shouldReduceMotion || !isInView || !isPlaying
              ? {}
              : { rotate: 360 }
          }
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: "linear",
          }}
          className="relative w-full h-full rounded-full overflow-hidden will-change-transform"
          style={{
            background:
              "repeating-radial-gradient(circle at center, #141414 0px, #0b0b0b 2px, #252525 3px, #151515 5px, #181818 7px)",
            boxShadow:
              "inset 9px 10px 25px rgba(255,255,255,0.06), inset -16px -14px 30px rgba(0,0,0,0.55)",
          }}
        >
          {/* Subtle concentric rings */}
          <div className="absolute inset-[20px] border border-white/[0.06] rounded-full pointer-events-none" />
          <div className="absolute inset-[50px] border border-white/[0.04] rounded-full pointer-events-none" />

          {/* Conic Light Sheen */}
          <div
            className="absolute inset-0 rounded-full opacity-35 mix-blend-screen pointer-events-none"
            style={{
              background:
                "conic-gradient(from 210deg, transparent 0deg, rgba(255,255,255,0.08) 34deg, transparent 61deg, transparent 93deg, rgba(255,255,255,0.18) 151deg, transparent 177deg, rgba(255,255,255,0.06) 250deg, transparent 289deg)",
            }}
          />

          {/* Center Red Vinyl Label */}
          <div className="absolute top-[33%] left-[33%] w-[34%] h-[34%] rounded-full bg-sabbath-red shadow-[0_0_0_6px_rgba(23,23,23,0.93)] flex flex-col items-center justify-center text-white rotate-[-14deg]">
            <span className="font-headline font-black text-[20px] sm:text-[22px] lg:text-[25px] tracking-[-1.3px] leading-none">
              sabbath
            </span>
            <span className="mt-[6px] text-center text-[7px] sm:text-[7.5px] lg:text-[8px] font-extrabold tracking-[1.4px] leading-[1.45] uppercase">
              CULTURA LOCAL
              <br />
              VOL. 001
            </span>
            {/* Center spindle hole */}
            <div className="w-[7px] h-[7px] rounded-full bg-[#1a1a1a] mt-[5px]" />
          </div>
        </motion.div>
      </div>

      {/* Turntable Tonearm (Micro-rotates when music is playing) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { rotate: 29 }
            : isPlaying
            ? { rotate: 32 }
            : { rotate: 29 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:block absolute right-[47px] top-[1px] z-20 w-[22px] h-[243px] rounded-[16px] origin-top shadow-[4px_8px_13px_rgba(0,0,0,0.55)] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #85878a, #232529 31%, #1b1c1e 69%, #727478)",
        }}
      >
        {/* Needle Cartridge Head */}
        <div
          className="absolute -bottom-[8px] -left-[14px] w-[50px] h-[72px] rounded-[12px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_15px_20px_rgba(0,0,0,0.5)]"
          style={{
            background: "linear-gradient(130deg, #3c3d40, #080808)",
          }}
        >
          {/* Glowing Red LED stylus light */}
          <div
            className={`absolute -bottom-[3px] left-[7px] z-30 w-[7px] h-[7px] rounded-full bg-[#ff3333] transition-all duration-300 ${
              isPlaying
                ? "shadow-[0_0_14px_#ff2222,0_0_24px_#ff2222]"
                : "shadow-[0_0_8px_#ff2222]"
            }`}
          />
        </div>
      </motion.div>

      {/* Sabbath Monogram Graphic Symbol */}
      <div
        className="absolute z-10 right-[24px] sm:right-[380px] lg:right-[415px] bottom-[24px] sm:bottom-[36px] lg:bottom-[44px] pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/assets/sabbath-symbol.png"
          alt="Sabbath Símbolo"
          width={82}
          height={105}
          priority
          className="w-[52px] sm:w-[66px] lg:w-[82px] h-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Editorial Stamp */}
      <div
        className="hidden sm:block absolute right-[44px] bottom-[38px] z-10 text-white/40 text-[10.5px] lg:text-[11px] font-bold tracking-[1.1px] rotate-[-8deg] pointer-events-none uppercase"
      >
        MUCHO MÁS QUE UNA PAUSA. ↗
      </div>
    </section>
  );
};

export default HeroVinyl;
