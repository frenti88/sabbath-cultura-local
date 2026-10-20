"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CulturalEdition } from "@/types/edition";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { HeroVinyl } from "./HeroVinyl";
import { EditionSelection } from "./EditionSelection";
import { CultureCards } from "./CultureCards";
import { PersistentAudioPlayer } from "./PersistentAudioPlayer";
import { ReadingDialog } from "./ReadingDialog";
import { FilmDialog } from "./FilmDialog";
import { EditionFooter } from "./EditionFooter";

interface AppShellProps {
  edition: CulturalEdition;
}

export const AppShell: React.FC<AppShellProps> = ({ edition }) => {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isReadingOpen, setIsReadingOpen] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);

  // Handle deep-linking via query parameters (e.g. ?contenido=musica | lectura | cine)
  useEffect(() => {
    const contenido = searchParams?.get("contenido")?.toLowerCase();
    if (!contenido) return;

    if (contenido === "musica" || contenido === "musica-local") {
      setActiveSection("musica");
      const el = document.getElementById("musica");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (contenido === "lectura" || contenido === "literatura") {
      setActiveSection("lectura");
      setIsReadingOpen(true);
    } else if (
      contenido === "cine" ||
      contenido === "cortometraje" ||
      contenido === "video"
    ) {
      setActiveSection("video");
      setIsFilmOpen(true);
    }
  }, [searchParams]);

  // Observer to update active navigation item on scroll
  useEffect(() => {
    const handleScroll = () => {
      const musica = document.getElementById("musica");
      const lectura = document.getElementById("lectura");
      const video = document.getElementById("video");

      const scrollPos = window.scrollY + 200;

      if (video && scrollPos >= video.offsetTop) {
        setActiveSection("video");
      } else if (lectura && scrollPos >= lectura.offsetTop) {
        setActiveSection("lectura");
      } else if (musica && scrollPos >= musica.offsetTop) {
        setActiveSection("musica");
      } else {
        setActiveSection("inicio");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="shell flex min-h-screen bg-[#101010] text-[#F1F1F1] font-sans antialiased">
      {/* 1. Left Rail (Sidebar) */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={(sectionId) => {
          setActiveSection(sectionId);
          if (sectionId === "lectura") {
            setIsReadingOpen(true);
          } else if (sectionId === "video") {
            setIsFilmOpen(true);
          }
        }}
      />

      {/* 2. Main Content Area */}
      <main className="site flex-1 min-w-0 bg-[#1a1a1a] relative pb-10 overflow-x-hidden">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Inner Padding Container */}
        <div className="mainbody px-4 sm:px-8 lg:px-[48px] pt-6 pb-9">
          {/* Hero Section */}
          <HeroVinyl />

          {/* Section Anchor & Title */}
          <div id="seleccion" className="scroll-mt-24">
            <EditionSelection />
          </div>

          {/* 3 Culture Cards */}
          <CultureCards
            edition={edition}
            onOpenReading={() => setIsReadingOpen(true)}
            onOpenFilm={() => setIsFilmOpen(true)}
          />

          {/* Editorial Footer Note */}
          <EditionFooter />
        </div>
      </main>

      {/* 3. Persistent Fixed Audio Player (oculto según solicitud) */}
      {/* <PersistentAudioPlayer /> */}

      {/* 4. Literature Reading Dialog */}
      <ReadingDialog
        isOpen={isReadingOpen}
        onClose={() => setIsReadingOpen(false)}
        edition={edition}
      />

      {/* 5. Film Video Dialog */}
      <FilmDialog
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
        edition={edition}
      />
    </div>
  );
};

export default AppShell;
