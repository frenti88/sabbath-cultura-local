"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LiteratureContent } from "@/types/content";
import ReadingExperience from "./ReadingExperience";

interface LiteratureCardProps {
  content: LiteratureContent;
}

export const LiteratureCard: React.FC<LiteratureCardProps> = ({ content }) => {
  const [isReadingOpen, setIsReadingOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.article
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
        whileTap={{ scale: 0.985 }}
        className="group relative flex flex-col justify-between w-full h-full bg-[#101013] rounded-[13px] p-4 sm:p-5 border border-[#92278F]/60 hover:border-[#B733B4] transition-colors duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        aria-labelledby="literature-title"
      >
        <div>
          {/* Card Header: Category & Top-Right Arrow */}
          <div className="flex items-center justify-between mb-3 select-none">
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-[13px] sm:text-[14px]">
              <span className="text-[#BA44B7] font-black">{content.categoryNumber}</span>
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
              alt={`Libro abierto de ${content.title} por ${content.author}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#92278F]/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content Details */}
          <div>
            <h2 id="literature-title" className="text-white font-bold text-[19px] sm:text-[21px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {content.title}
            </h2>
            <p className="text-[#90909A] text-[11px] font-semibold tracking-[0.16em] uppercase mt-0.5">
              {content.author}
            </p>
          </div>

          {/* Extract Quote */}
          <div className="mt-4">
            <p className="text-[#ABABBA] text-[13.5px] sm:text-[14px] leading-[1.5] italic pb-1">
              {content.excerpt}
            </p>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="mt-4 pt-1">
          <button
            type="button"
            onClick={() => setIsReadingOpen(true)}
            className="w-full py-2.5 px-4 rounded-full border border-[#92278F] hover:border-[#D139CE] bg-[#2A0D29]/40 hover:bg-[#92278F]/30 text-[#D946D6] hover:text-white text-[12px] font-bold tracking-widest flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] uppercase whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA44B7]"
            aria-label={`Leer obra completa de ${content.title}`}
          >
            <span>LEER</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </motion.article>

      {/* Reader Modal */}
      <ReadingExperience
        isOpen={isReadingOpen}
        onClose={() => setIsReadingOpen(false)}
        content={content}
      />
    </>
  );
};

export default LiteratureCard;
