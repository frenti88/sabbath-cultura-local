"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Music, BookOpen, Film } from "lucide-react";

interface SidebarProps {
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection = "inicio",
  onSelectSection,
}) => {
  const navItems = [
    { id: "inicio", label: "Descubrir", icon: Home, href: "#inicio" },
    { id: "musica", label: "Música", icon: Music, href: "#musica" },
    { id: "lectura", label: "Literatura", icon: BookOpen, href: "#lectura" },
    { id: "video", label: "Cine", icon: Film, href: "#video" },
  ];

  return (
    <aside
      className="hidden md:flex flex-col w-[190px] xl:w-[225px] flex-shrink-0 bg-[#121212] border-r border-white/[0.09] pt-[31px] px-[18px] xl:pl-[24px] xl:pr-[18px] pb-[36px] relative z-20 select-none min-h-screen"
      aria-label="Navegación principal de la colección"
    >
      {/* Brand Logo */}
      <Link
        href="/"
        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow rounded"
        aria-label="Sabbath - Inicio"
      >
        <Image
          src="/assets/sabbath-logo.png"
          alt="Sabbath"
          width={134}
          height={32}
          priority
          className="h-[30px] xl:h-[32px] w-auto object-contain"
        />
      </Link>

      {/* Navigation Label: TU EXPERIENCIA */}
      <div className="mt-[50px] xl:mt-[63px] mb-[18px] xl:mb-[22px] px-[10px] text-[#6f7274] text-[10px] tracking-[2.3px] font-black uppercase">
        TU EXPERIENCIA
      </div>

      {/* Rail Navigation Links */}
      <nav className="flex flex-col gap-[7px]" aria-label="Secciones de contenido">
        {navItems.map((item) => {
          const isSelected = activeSection === item.id;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => onSelectSection?.(item.id)}
              className={`flex items-center gap-[14px] px-[14px] py-[12px] xl:py-[13px] rounded-[9px] text-[13.5px] xl:text-[14px] font-semibold transition-all duration-150 ${
                isSelected
                  ? "bg-[#322125] text-[#f9f9f9] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "text-[#a0a1a3] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] flex-shrink-0 ${
                  isSelected ? "text-[#f22743]" : "text-current"
                }`}
              />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Rail Divider */}
      <div className="h-[1px] bg-white/[0.08] my-[26px] xl:my-[30px] mx-[6px]" />

      {/* Small Label: TU COLECCIÓN */}
      <div className="mb-[14px] xl:mb-[16px] px-[10px] text-[#797a7d] text-[10px] tracking-[2.1px] font-black uppercase">
        TU COLECCIÓN
      </div>

      {/* Mini Card: Edición cultural 001 */}
      <div className="relative mx-[2px] p-[14px] xl:p-[15px] pb-[16px] rounded-[11px] bg-gradient-to-br from-[#2b171b] via-[#241a1d] to-[#1d1b1d] border border-[#542b32] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.5)] group">
        <span className="relative z-10 block text-[#f05c6b] text-[10px] font-extrabold tracking-[1.3px] uppercase">
          SABBATH STUDIO
        </span>
        <h4 className="relative z-10 mt-[6px] xl:mt-[8px] text-white font-headline font-black text-[21px] xl:text-[23px] tracking-[-1.2px] leading-[1.07]">
          Edición
          <br />
          cultural 001
        </h4>
        <p className="relative z-10 mt-[12px] xl:mt-[14px] text-[#a2a0a1] text-[11px] leading-[1.6]">
          Música, letras y cine
          <br />
          hechos aquí.
        </p>

        {/* Peeking Decorative Mini Vinyl Disc */}
        <div
          className="absolute -right-[101px] top-[9px] w-[170px] h-[170px] rounded-full pointer-events-none opacity-90 shadow-[-8px_8px_24px_rgba(0,0,0,0.8)]"
          style={{
            background:
              "repeating-radial-gradient(circle, #131313 0 2px, #242424 3px 4px, #111 5px 6px)",
          }}
          aria-hidden="true"
        >
          {/* Red center label on mini vinyl */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[45px] rounded-full bg-sabbath-red flex items-center justify-center shadow-inner">
            <div className="w-[8px] h-[8px] rounded-full bg-[#111111]" />
          </div>
        </div>
      </div>

      {/* Rail Bottom Editorial Note */}
      <div className="mt-auto pt-[24px] px-[8px] text-[#6c6c6e] text-[11px] leading-[1.6] tracking-[0.15px]">
        <div className="w-[21px] h-[1px] bg-sabbath-red mb-[12px]" />
        Un espacio para encontrar
        <br />
        nuevas voces colombianas.
      </div>
    </aside>
  );
};

export default Sidebar;
