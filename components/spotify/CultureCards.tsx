"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAudioPlayer } from "@/context/AudioContext";
import { CulturalEdition } from "@/types/edition";

interface CultureCardsProps {
  edition: CulturalEdition;
  onOpenReading: () => void;
  onOpenFilm: () => void;
}

export const CultureCards: React.FC<CultureCardsProps> = ({
  edition,
  onOpenReading,
  onOpenFilm,
}) => {
  const { isPlaying, togglePlay } = useAudioPlayer();

  return (
    <section
      className="cards grid grid-cols-1 lg:grid-cols-3 gap-4"
      aria-label="Contenidos culturales"
    >
      {/* 01 MÚSICA */}
      <motion.article
        id="musica"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="culture-card relative min-w-0 border rounded-[12px] bg-[#252525] hover:bg-[#2b2b2b] p-[13px_13px_16px] min-h-[364px] overflow-hidden flex flex-col justify-between cursor-pointer group select-none transition-colors duration-200"
        style={{ borderColor: "#040A56" }}
        onClick={() => togglePlay()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePlay();
          }
        }}
        aria-label={`${isPlaying ? "Pausar" : "Escuchar"} canción: ${edition.music.title} por ${edition.music.artist}`}
      >
        <div>
          {/* Card Image Container */}
          <div className="card-img h-[193px] rounded-[6px] overflow-hidden relative bg-[#202020]">
            <Image
              src={edition.music.cover}
              alt="Portada artística en tonos azules de una persona con audífonos"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 820px) 100vw, 380px"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/60 to-transparent pointer-events-none" />

            {/* Tag Badge */}
            <span className="featured-tag absolute z-10 left-[13px] top-[13px] bg-[#121212]/80 backdrop-blur-md text-white px-3 py-2 rounded-[5px] text-[10px] tracking-[1px] font-[800]">
              01 / MÚSICA
            </span>

            {/* Red Play Button */}
            <div
              className={`roundplay absolute bottom-[11px] right-[11px] z-10 w-[43px] height-[43px] h-[43px] rounded-full bg-[#B5152B] shadow-[0_5px_12px_rgba(0,0,0,0.5)] flex items-center justify-center text-white text-[17px] transition-transform duration-200 ${
                isPlaying ? "scale-105 ring-2 ring-[#FFC501]/50" : "group-hover:scale-110"
              }`}
              aria-hidden="true"
            >
              {isPlaying ? (
                <span className="inline-block text-[15px] font-bold">❚❚</span>
              ) : (
                <span className="inline-block ml-0.5">▶</span>
              )}
            </div>
          </div>

          {/* Card Meta */}
          <div className="card-top flex justify-between items-center gap-1 mx-[3px] mt-[17px] mb-[9px] text-[#bdbdbd] text-[10px] tracking-[1.8px] font-[850]">
            <span className="colorblue text-[#798cff]">CANCIÓN DE LA EDICIÓN</span>
            <span className="arrow text-[21px] text-[#bcbcbc] font-light leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </div>

          <h3 className="mx-[3px] mb-[6px] text-[24px] font-[850] leading-[1.18] tracking-[-0.8px] text-[#F1F1F1]">
            {edition.music.title}
          </h3>
          <p className="mx-[3px] text-[#a7a7aa] text-[12px] leading-[1.5]">
            {edition.music.artist}
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="card-bottom h-[1px] bg-white/[0.07] mx-[3px] mt-4 mb-3" />

          {/* Card Action */}
          <div className="card-action flex items-center justify-between mx-[3px] text-[#ddd] text-[11px] tracking-[1.4px] font-[800]">
            <span className="b text-[#778cff]">
              {isPlaying ? "PAUSAR REPRODUCCIÓN" : "ESCUCHAR CANCIÓN"}
            </span>
            <span className="arrow-tip text-[18px] leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </div>
        </div>
      </motion.article>

      {/* 02 LITERATURA */}
      <motion.article
        id="lectura"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="culture-card relative min-w-0 border rounded-[12px] bg-[#252525] hover:bg-[#2b2b2b] p-[13px_13px_16px] min-h-[364px] overflow-hidden flex flex-col justify-between cursor-pointer group select-none transition-colors duration-200"
        style={{ borderColor: "#92278F" }}
        onClick={onOpenReading}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenReading();
          }
        }}
        aria-label={`Leer microhistoria: ${edition.literature.title} por ${edition.literature.author}`}
      >
        <div>
          {/* Card Image Container */}
          <div className="card-img h-[193px] rounded-[6px] overflow-hidden relative bg-[#202020]">
            <Image
              src={edition.literature.cover}
              alt="Libro abierto en tonos morados representando la lectura cultural"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 820px) 100vw, 380px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/60 to-transparent pointer-events-none" />

            {/* Tag Badge */}
            <span className="featured-tag absolute z-10 left-[13px] top-[13px] bg-[#121212]/80 backdrop-blur-md text-white px-3 py-2 rounded-[5px] text-[10px] tracking-[1px] font-[800]">
              02 / LITERATURA
            </span>
          </div>

          {/* Card Meta */}
          <div className="card-top flex justify-between items-center gap-1 mx-[3px] mt-[17px] mb-[9px] text-[#bdbdbd] text-[10px] tracking-[1.8px] font-[850]">
            <span className="colorpurple text-[#d779df]">LECTURA DE LA EDICIÓN</span>
            <span className="arrow text-[21px] text-[#bcbcbc] font-light leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </div>

          <h3 className="mx-[3px] mb-[6px] text-[24px] font-[850] leading-[1.18] tracking-[-0.8px] text-[#F1F1F1]">
            {edition.literature.title}
          </h3>
          <p className="mx-[3px] text-[#a7a7aa] text-[12px] leading-[1.5]">
            {edition.literature.author}
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="card-bottom h-[1px] bg-white/[0.07] mx-[3px] mt-4 mb-3" />

          {/* Card Action */}
          <div className="card-action flex items-center justify-between mx-[3px] text-[#ddd] text-[11px] tracking-[1.4px] font-[800]">
            <span className="p text-[#d479db]">EMPEZAR A LEER</span>
            <span className="arrow-tip text-[18px] leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </div>
        </div>
      </motion.article>

      {/* 03 CINE */}
      <motion.article
        id="video"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="culture-card relative min-w-0 border rounded-[12px] bg-[#252525] hover:bg-[#2b2b2b] p-[13px_13px_16px] min-h-[364px] overflow-hidden flex flex-col justify-between cursor-pointer group select-none transition-colors duration-200"
        style={{ borderColor: "#D05800" }}
        onClick={onOpenFilm}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenFilm();
          }
        }}
        aria-label={`Ver cortometraje: ${edition.film.title} por ${edition.film.director}`}
      >
        <div>
          {/* Card Image Container */}
          <div className="card-img h-[193px] rounded-[6px] overflow-hidden relative bg-[#202020]">
            <Image
              src={edition.film.poster}
              alt="Fotograma cinematográfico de mujer y ciudad al atardecer"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 820px) 100vw, 380px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/60 to-transparent pointer-events-none" />

            {/* Tag Badge */}
            <span className="featured-tag absolute z-10 left-[13px] top-[13px] bg-[#121212]/80 backdrop-blur-md text-white px-3 py-2 rounded-[5px] text-[10px] tracking-[1px] font-[800]">
              03 / CINE
            </span>

            {/* White Play Button */}
            <div
              className="roundplay alt absolute bottom-[11px] right-[11px] z-10 w-[43px] h-[43px] rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#191919] text-[17px] transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            >
              <span className="inline-block ml-0.5">▶</span>
            </div>
          </div>

          {/* Card Meta */}
          <div className="card-top flex justify-between items-center gap-1 mx-[3px] mt-[17px] mb-[9px] text-[#bdbdbd] text-[10px] tracking-[1.8px] font-[850]">
            <span className="colororange text-[#ec884f]">CORTO DE LA EDICIÓN</span>
            <span className="arrow text-[21px] text-[#bcbcbc] font-light leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </div>

          <h3 className="mx-[3px] mb-[6px] text-[24px] font-[850] leading-[1.18] tracking-[-0.8px] text-[#F1F1F1]">
            {edition.film.title}
          </h3>
          <p className="mx-[3px] text-[#a7a7aa] text-[12px] leading-[1.5]">
            {edition.film.director}
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="card-bottom h-[1px] bg-white/[0.07] mx-[3px] mt-4 mb-3" />

          {/* Card Action */}
          <div className="card-action flex items-center justify-between mx-[3px] text-[#ddd] text-[11px] tracking-[1.4px] font-[800]">
            <span className="o text-[#e88a4e]">VER CORTOMETRAJE</span>
            <span className="arrow-tip text-[18px] leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </div>
        </div>
      </motion.article>
    </section>
  );
};
