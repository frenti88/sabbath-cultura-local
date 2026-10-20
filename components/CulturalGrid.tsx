"use client";

import React from "react";
import { CulturalEdition } from "@/types/content";
import MusicCard from "./MusicCard";
import LiteratureCard from "./LiteratureCard";
import VideoCard from "./VideoCard";

interface CulturalGridProps {
  edition: CulturalEdition;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const CulturalGrid: React.FC<CulturalGridProps> = ({
  edition,
  isPlayingMusic,
  onToggleMusic,
}) => {
  return (
    <section
      id="experiencia"
      className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-1 pb-4 sm:pb-5 lg:pb-6"
      aria-label="Experiencias culturales Sabbath: Música, Lectura y Video"
    >
      <div 
        id="artistas"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-5 items-stretch"
      >
        {/* 01 / MÚSICA */}
        <div className="flex w-full">
          <MusicCard
            content={edition.music}
            isPlaying={isPlayingMusic}
            onTogglePlay={onToggleMusic}
          />
        </div>

        {/* 02 / LECTURA */}
        <div className="flex w-full">
          <LiteratureCard content={edition.literature} />
        </div>

        {/* 03 / VIDEO */}
        <div className="flex w-full">
          <VideoCard content={edition.video} />
        </div>
      </div>
    </section>
  );
};

export default CulturalGrid;
