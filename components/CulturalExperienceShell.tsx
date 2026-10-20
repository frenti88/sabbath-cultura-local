"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CulturalGrid from "@/components/CulturalGrid";
import { CulturalEdition } from "@/types/content";

interface CulturalExperienceShellProps {
  edition: CulturalEdition;
}

export const CulturalExperienceShell: React.FC<CulturalExperienceShellProps> = ({
  edition,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 2. Hero Section */}
      <HeroSection
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />

      {/* 3. Cultural Grid (Three Cards) */}
      <CulturalGrid
        edition={edition}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
};

export default CulturalExperienceShell;
