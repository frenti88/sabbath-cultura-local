"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import VinylExperience from "./VinylExperience";

interface HeroSectionProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isPlaying = false,
  onTogglePlay,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      className="relative w-full overflow-hidden pt-3 pb-3 sm:pt-5 sm:pb-4 lg:pt-6 lg:pb-5"
      aria-labelledby="hero-heading"
    >
      {/* Subtle atmospheric warm/red background ambient light */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sabbath-red/[0.04] rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-4 items-center">
          
          {/* Left Column: Headline, Subtitle, CTA */}
          <div className="md:col-span-6 xl:col-span-6 z-10 flex flex-col justify-center">
            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline font-black uppercase text-left tracking-[-0.035em] leading-[0.92] text-[34px] xs:text-[40px] sm:text-[46px] md:text-[48px] lg:text-[56px] xl:text-[66px]"
            >
              <span className="block text-white whitespace-nowrap">
                HOY TU BREAK
              </span>
              <span className="block text-sabbath-red whitespace-nowrap">
                SUENA, SE LEE
              </span>
              <span className="block text-sabbath-red whitespace-nowrap">
                Y SE SIENTE LOCAL.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-3.5 sm:mt-4 text-[#CBCBD2] text-[13.5px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.38] max-w-md font-normal"
            >
              Una pausa cultural con música, lectura
              <br className="hidden sm:inline" />
              {" "}y cine hecho en Colombia.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-4 sm:mt-5"
            >
              <a
                href="#experiencia"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-sabbath-red hover:bg-[#cf1832] text-white text-[12px] sm:text-[12.5px] font-black tracking-widest transition-all duration-200 shadow-[0_4px_16px_rgba(181,21,43,0.4)] hover:shadow-[0_8px_24px_rgba(181,21,43,0.55)] active:scale-[0.98] uppercase whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow"
                aria-label="Explorar experiencias culturales de Sabbath"
              >
                <span>EXPLORAR</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.8]" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Vinyl and Artistic Collage */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 xl:col-span-6 flex justify-center md:justify-end mt-1 md:mt-0"
          >
            <VinylExperience isPlaying={isPlaying} onTogglePlay={onTogglePlay} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
