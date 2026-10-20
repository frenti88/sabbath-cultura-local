import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SabbathLogo from "./SabbathLogo";

export const SabbathFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A0A0C] border-t border-white/[0.08] py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 lg:gap-6">
        
        {/* Left: Brand Logo & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 lg:gap-6 text-center sm:text-left">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow rounded-sm"
            aria-label="Sabbath inicio"
          >
            <SabbathLogo size="sm" />
          </Link>

          <span className="text-[10.5px] lg:text-[11px] font-semibold tracking-[0.14em] lg:tracking-[0.16em] text-[#84848C] uppercase whitespace-nowrap">
            CULTURA LOCAL &nbsp;·&nbsp; MEDELLÍN, COLOMBIA
          </span>
        </div>

        {/* Right: Nav Links and Red CTA */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-4 lg:gap-7">
          <nav className="flex items-center gap-4 md:gap-4 lg:gap-6" aria-label="Navegación pie de página">
            <a
              href="#experiencia"
              className="text-[11px] lg:text-[11.5px] font-semibold tracking-wider text-[#9898A0] hover:text-white transition-colors uppercase whitespace-nowrap"
            >
              LA EXPERIENCIA
            </a>
            <a
              href="#artistas"
              className="text-[11px] lg:text-[11.5px] font-semibold tracking-wider text-[#9898A0] hover:text-white transition-colors uppercase whitespace-nowrap"
            >
              ARTISTAS
            </a>
            <a
              href="#proyecto"
              className="text-[11px] lg:text-[11.5px] font-semibold tracking-wider text-[#9898A0] hover:text-white transition-colors uppercase whitespace-nowrap"
            >
              EL PROYECTO
            </a>
          </nav>

          {/* Red Pill CTA */}
          <a
            href="#experiencia"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sabbath-red text-white text-[11px] lg:text-[11.5px] font-bold tracking-wider hover:bg-sabbath-red-hover transition-all duration-200 shadow-sm active:scale-[0.98] uppercase whitespace-nowrap"
            aria-label="Ir a tu break aquí"
          >
            <span>TU BREAK AQUÍ</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default SabbathFooter;
