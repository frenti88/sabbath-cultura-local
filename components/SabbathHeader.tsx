"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import SabbathLogo from "./SabbathLogo";

export const SabbathHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "LA EXPERIENCIA", href: "#experiencia" },
    { label: "ARTISTAS", href: "#artistas" },
    { label: "EL PROYECTO", href: "#proyecto" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0C]/95 backdrop-blur-md border-b border-white/[0.08] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow rounded-sm"
            aria-label="Sabbath - Inicio"
          >
            <SabbathLogo size="md" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="hidden md:flex items-center gap-7 lg:gap-8"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] font-semibold tracking-wider text-[#A0A0A5] hover:text-white transition-colors duration-150 uppercase whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          {/* Red Pill CTA */}
          <a
            href="#experiencia"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-sabbath-red text-white text-[11.5px] sm:text-[12px] font-bold tracking-wider hover:bg-sabbath-red-hover transition-all duration-200 shadow-sm active:scale-[0.98] uppercase whitespace-nowrap"
            aria-label="Ir a tu break aquí"
          >
            <span>TU BREAK AQUÍ</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
          </a>
        </motion.nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2.5">
          <a
            href="#experiencia"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sabbath-red text-white text-[11px] font-bold tracking-wider active:scale-[0.98] uppercase whitespace-nowrap"
            aria-label="Ir a tu break aquí"
          >
            <span>TU BREAK</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow rounded"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.08] bg-[#0E0E12] px-6 py-4 flex flex-col gap-3 overflow-hidden"
            aria-label="Menú móvil"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-white/80 hover:text-white py-1 uppercase"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SabbathHeader;
