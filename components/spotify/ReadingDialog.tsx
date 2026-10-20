"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CulturalEdition } from "@/types/edition";

interface ReadingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  edition: CulturalEdition;
}

export const ReadingDialog: React.FC<ReadingDialogProps> = ({
  isOpen,
  onClose,
  edition,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const paragraphs = (edition.literature.body || "").split("\n\n").filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reading-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#1a1a1a] border border-[#92278F]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#212121]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md overflow-hidden relative flex-shrink-0">
                  <Image
                    src={edition.literature.cover}
                    alt={edition.literature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] tracking-[1.5px] font-[850] text-[#d779df] uppercase">
                    02 / LITERATURA · MICROHISTORIA
                  </span>
                  <h2
                    id="reading-title"
                    className="text-lg sm:text-xl font-[850] text-white leading-tight tracking-tight"
                  >
                    {edition.literature.title}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#a0a0a0] hover:text-white flex items-center justify-center text-lg transition-colors"
                aria-label="Cerrar lectura"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 space-y-5 text-[#d5d5d8] text-[15px] sm:text-[16px] leading-[1.75] font-normal selection:bg-[#92278F]/40">
              <div className="text-[12px] font-semibold text-[#a7a7aa] tracking-wide border-l-2 border-[#92278F] pl-3 py-0.5">
                Por {edition.literature.author}
              </div>

              {paragraphs.map((para, i) => (
                <p key={i} className="text-justify">
                  {para}
                </p>
              ))}

              {edition.literature.credits && (
                <div className="pt-6 border-t border-white/10 text-[11px] text-[#7c7c80] italic">
                  {edition.literature.credits}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#161616] flex justify-between items-center text-[11px] text-[#888]">
              <span>SABBATH CULTURA LOCAL</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
