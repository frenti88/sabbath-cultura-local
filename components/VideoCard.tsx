"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { VideoContent } from "@/types/content";
import VideoExperience from "./VideoExperience";

interface VideoCardProps {
  content: VideoContent;
}

export const VideoCard: React.FC<VideoCardProps> = ({ content }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.article
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
        whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
        whileTap={{ scale: 0.985 }}
        className="group relative flex flex-col justify-between w-full h-full bg-[#101013] rounded-[13px] p-4 sm:p-5 border border-[#D05800]/60 hover:border-[#F26700] transition-colors duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        aria-labelledby="video-card-title"
      >
        <div>
          {/* Card Header: Category & Top-Right Arrow */}
          <div className="flex items-center justify-between mb-3 select-none">
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-[13px] sm:text-[14px]">
              <span className="text-[#FF6E1A] font-black">{content.categoryNumber}</span>
              <span className="text-white/60">/</span>
              <span className="text-white uppercase">{content.categoryName}</span>
            </div>

            <ArrowUpRight
              className="w-4 h-4 text-white/70 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>

          {/* Media Cover Image with Film Perforations and Center Play Button */}
          <div
            onClick={() => setIsVideoOpen(true)}
            className="relative w-full aspect-[1.28/1] rounded-[8px] overflow-hidden bg-[#0B0B0D] mb-4 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsVideoOpen(true);
              }
            }}
            aria-label={`Reproducir video ${content.title}`}
          >
            <Image
              src={content.poster}
              alt={`Fotograma del cortometraje ${content.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#D05800]/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content Details */}
          <div>
            <h2 id="video-card-title" className="text-white font-bold text-[20px] sm:text-[22px] leading-tight">
              {content.title}
            </h2>
            <p className="text-[#90909A] text-[12px] font-normal mt-0.5">
              {content.director}
            </p>
          </div>

          {/* Video Description */}
          <div className="mt-3.5">
            <p className="text-[#C4C4CC] text-[13.5px] sm:text-[14px] leading-[1.48]">
              {content.description}
            </p>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-4 pt-1">
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="w-full py-2.5 px-4 rounded-full border border-[#D05800] hover:border-[#FF7A24] bg-[#2E1200]/40 hover:bg-[#D05800]/30 text-[#FF7A24] hover:text-white text-[12px] font-bold tracking-widest flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] uppercase whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6E1A]"
            aria-label={`Ver cortometraje ${content.title}`}
          >
            <span>VER</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </motion.article>

      {/* Video Modal Player */}
      <VideoExperience
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        content={content}
      />
    </>
  );
};

export default VideoCard;
