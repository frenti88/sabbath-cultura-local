"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/context/AudioContext";
import { CulturalEdition } from "@/types/edition";

interface FilmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  edition: CulturalEdition;
}

export const FilmDialog: React.FC<FilmDialogProps> = ({
  isOpen,
  onClose,
  edition,
}) => {
  const { pause } = useAudioPlayer();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-pause background audio when dialog opens
  useEffect(() => {
    if (isOpen) {
      pause();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen, pause]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="film-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-[#141414] border border-[#D05800]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#1e1e1e]">
              <div>
                <span className="text-[10px] tracking-[1.5px] font-[850] text-[#ec884f] uppercase">
                  03 / CINE · CORTOMETRAJE
                </span>
                <h2
                  id="film-title"
                  className="text-lg sm:text-xl font-[850] text-white leading-tight tracking-tight"
                >
                  {edition.film.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#a0a0a0] hover:text-white flex items-center justify-center text-lg transition-colors"
                aria-label="Cerrar reproductor de cine"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={edition.film.videoSrc}
                poster={edition.film.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => pause()}
              >
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            </div>

            {/* Footer Details */}
            <div className="px-5 py-3.5 bg-[#171717] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-[#999]">
              <div>
                <span className="text-white font-medium">
                  {edition.film.director}
                </span>
                {edition.film.credits && (
                  <span className="text-[#666] ml-2">· {edition.film.credits}</span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="self-end sm:self-auto px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors"
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
