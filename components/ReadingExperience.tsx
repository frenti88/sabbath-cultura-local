"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Quote } from "lucide-react";
import { LiteratureContent } from "@/types/content";

interface ReadingExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  content: LiteratureContent;
}

export const ReadingExperience: React.FC<ReadingExperienceProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Handle ESC key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A0A0C]/88 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] bg-[#121216] border border-[#92278F]/40 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#16161B]/80 sticky top-0 z-20">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#BA44B7] uppercase">
                <BookOpen className="w-4 h-4" />
                <span>EXPERIENCIA EDITORIAL SABBATH</span>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow"
                aria-label="Cerrar experiencia de lectura"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Editorial Content */}
            <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-7">
              {/* Cover & Title Banner */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b border-white/[0.08] pb-8">
                <div className="relative w-32 sm:w-36 aspect-[4/5] rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-[#92278F]/30">
                  <Image
                    src={content.cover}
                    alt={content.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[12px] font-bold tracking-[0.2em] text-[#BA44B7] uppercase">
                    02 / LECTURA LOCAL
                  </span>
                  <h1
                    id="reader-title"
                    className="text-white font-headline font-black text-2xl sm:text-3xl mt-1 tracking-tight"
                  >
                    {content.title}
                  </h1>
                  <p className="text-[#A4A4AC] text-sm font-semibold tracking-wider uppercase mt-1">
                    Por {content.author}
                  </p>

                  <div className="mt-4 p-3 rounded-lg bg-[#92278F]/10 border border-[#92278F]/20 text-white/90 text-sm italic flex gap-2">
                    <Quote className="w-4 h-4 flex-shrink-0 text-[#BA44B7] mt-0.5" />
                    <span>{content.excerpt}</span>
                  </div>
                </div>
              </div>

              {/* Story Body Paragraphs */}
              <div className="prose prose-invert max-w-none text-[#D6D6DC] text-[16px] sm:text-[17px] leading-[1.8] space-y-5 font-sans">
                {content.body.paragraphs.map((p, idx) => (
                  <p key={idx} className="indent-4 sm:indent-0">
                    {p}
                  </p>
                ))}
              </div>

              {/* Credits & Colophon */}
              <div className="pt-6 border-t border-white/[0.08] text-[12px] text-[#808088] space-y-1">
                <p className="font-semibold text-white/70">Créditos de edición:</p>
                <p>{content.credits.editorial} · {content.credits.edition}</p>
                <p>{content.credits.city} · {content.credits.year}</p>
              </div>
            </div>

            {/* Bottom Footer bar */}
            <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#16161B]/90 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-[#92278F] hover:bg-[#A82FA4] text-white text-xs font-bold tracking-wider transition-all duration-150 active:scale-[0.98] uppercase whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow"
              >
                Volver a la selección
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReadingExperience;
