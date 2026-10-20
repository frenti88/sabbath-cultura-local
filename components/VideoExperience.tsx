"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film } from "lucide-react";
import { VideoContent } from "@/types/content";

interface VideoExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  content: VideoContent;
}

export const VideoExperience: React.FC<VideoExperienceProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Handle ESC key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Pause video on close
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, onClose]);

  // When isOpen changes to false, ensure video pauses
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0A0A0C]/90 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl bg-[#121216] border border-[#D05800]/40 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#16161B]/90">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF6E1A] uppercase">
                <Film className="w-4 h-4" />
                <span>SABBATH CINE CLUB · MEDELLÍN</span>
              </div>

              <button
                ref={closeBtnRef}
                onClick={handleClose}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow"
                aria-label="Cerrar reproductor de video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player 16:9 */}
            <div className="relative w-full aspect-video bg-[#0A0A0C] flex items-center justify-center">
              <video
                ref={videoRef}
                src={content.videoSrc}
                poster={content.poster}
                controls
                playsInline
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta reproducción de video HTML5.
              </video>
            </div>

            {/* Video Details & Meta */}
            <div className="p-6 bg-[#141418]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 id="video-title" className="text-white font-headline font-black text-2xl tracking-tight">
                    {content.title}
                  </h1>
                  <p className="text-[#A4A4AC] text-sm font-semibold mt-1">
                    {content.director}
                  </p>
                </div>
                <div className="text-xs text-[#808088] sm:text-right">
                  <p className="font-semibold text-white/80">{content.credits.city} · {content.credits.year}</p>
                  <p>{content.credits.production}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#C8C8D0] leading-relaxed border-t border-white/[0.08] pt-4">
                {content.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoExperience;
