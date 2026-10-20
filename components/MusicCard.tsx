"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MusicContent } from "@/types/content";
import AudioPlayer from "./AudioPlayer";

interface MusicCardProps {
  content: MusicContent;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({
  content,
  isPlaying,
  onTogglePlay,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.985 }}
      className="group relative flex flex-col justify-between w-full h-full bg-[#101013] rounded-[13px] p-4 sm:p-5 border border-[#162B99]/70 hover:border-[#2546E5] transition-colors duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
      aria-labelledby="music-title"
    >
      <div>
        {/* Card Header: Category & Top-Right Arrow */}
        <div className="flex items-center justify-between mb-3 select-none">
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-[13px] sm:text-[14px]">
            <span className="text-[#325CFE] font-black">{content.categoryNumber}</span>
            <span className="text-white/60">/</span>
            <span className="text-white uppercase">{content.categoryName}</span>
          </div>

          <ArrowUpRight
            className="w-4 h-4 text-white/70 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        {/* Media Cover Image */}
        <div className="relative w-full aspect-[1.28/1] rounded-[8px] overflow-hidden bg-[#0B0B0D] mb-4">
          <Image
            src={content.cover}
            alt={`Portada de ${content.title} por ${content.artist}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040A56]/35 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Details */}
        <div>
          <h2 id="music-title" className="text-white font-bold text-[20px] sm:text-[22px] leading-tight">
            {content.title}
          </h2>
          <p className="text-[#90909A] text-[11px] font-semibold tracking-[0.16em] uppercase mt-0.5">
            {content.artist}
          </p>
        </div>

        {/* Audio Player */}
        <AudioPlayer
          src={content.audioSrc}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          title={content.title}
          artist={content.artist}
        />
      </div>

      {/* Bottom Action Button */}
      <div className="mt-4 pt-1">
        <button
          type="button"
          onClick={onTogglePlay}
          className="w-full py-2.5 px-4 rounded-full border border-[#162B99] hover:border-[#3862FE] bg-[#0A102A]/40 hover:bg-[#162B99]/30 text-[#5B82FF] hover:text-white text-[12px] font-bold tracking-widest flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] uppercase whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3862FE]"
          aria-label={isPlaying ? "Pausar reproducción" : "Escuchar Brilla la Ciudad"}
        >
          <span>{isPlaying ? "PAUSAR" : "ESCUCHAR"}</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
};

export default MusicCard;
