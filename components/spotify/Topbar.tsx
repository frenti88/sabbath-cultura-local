"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  return (
    <header className="sticky top-0 z-30 h-[55px] md:h-[80px] px-5 sm:px-8 lg:px-[57px] flex items-center justify-between border-b border-white/[0.08] bg-[#1c1c1c]/95 backdrop-blur-md select-none">
      {/* Mobile Brand Link (when sidebar is hidden) */}
      <div className="flex md:hidden items-center">
        <Link
          href="/"
          className="flex items-center focus:outline-none"
          aria-label="Sabbath inicio"
        >
          <Image
            src="/assets/sabbath-logo.png"
            alt="Sabbath"
            width={100}
            height={24}
            priority
            className="h-[22px] sm:h-[24px] w-auto object-contain"
          />
        </Link>
      </div>

      {/* Breadcrumb Left */}
      <div className="hidden sm:flex items-center gap-[11px] text-[11px] lg:text-[12px] font-extrabold tracking-[1.5px] text-[#b8b8ba]">
        <strong className="text-white font-black text-[11px] lg:text-[12px]">
          SABBATH
        </strong>
        <span className="text-[#6a6b6a] font-normal">/</span>
        <span className="text-[#b8b8ba]">CULTURA LOCAL</span>
        <span className="text-[#6a6b6a] font-normal">/</span>
        <strong className="text-white font-black text-[11px] lg:text-[12px]">
          VOL. 001
        </strong>
      </div>

      {/* Right Navigation & Location Pill */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-[24px]">
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-[24px]"
          aria-label="Navegación superior de categorías"
        >
          <a
            href="#musica"
            className="text-[12px] font-semibold text-[#bababa] hover:text-white transition-colors uppercase tracking-wider"
          >
            MÚSICA
          </a>
          <a
            href="#lectura"
            className="text-[12px] font-semibold text-[#bababa] hover:text-white transition-colors uppercase tracking-wider"
          >
            LECTURA
          </a>
          <a
            href="#video"
            className="text-[12px] font-semibold text-[#bababa] hover:text-white transition-colors uppercase tracking-wider"
          >
            CINE
          </a>
        </nav>

        {/* Location Pill */}
        <span className="inline-flex items-center gap-[8px] px-[14px] lg:px-[17px] py-[8px] lg:py-[10px] rounded-full border border-white/[0.18] text-white text-[10.5px] lg:text-[11px] font-bold tracking-[0.2px] uppercase whitespace-nowrap bg-black/20">
          <span className="w-[6px] h-[6px] rounded-full bg-[#FFC501] flex-shrink-0 animate-pulse" />
          <span>MEDELLÍN, COLOMBIA</span>
        </span>
      </div>
    </header>
  );
};

export default Topbar;
