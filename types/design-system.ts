/**
 * SABBATH - Design Taste & System Constants
 * Governed by `.agents/skills/design-taste-frontend/SKILL.md`
 *
 * Design Read (Section 0.B):
 * "Reading this as: cultural experience landing page for QR-postcard visitors of Sabbath Colombia,
 *  with a bold dark-editorial / poster-inspired language, leaning toward custom Tailwind brand tokens +
 *  Archivo Black display + restrained Motion."
 */

export const DESIGN_READ =
  "Reading this as: cultural experience landing page for QR-postcard visitors of Sabbath Colombia, with a bold dark-editorial / poster-inspired language, leaning toward custom Tailwind brand tokens + Archivo Black display + restrained Motion." as const;

export const DESIGN_MODE = "Redesign - Preserve (Pixel-Perfect Reference Lock)" as const;

/**
 * Section 1: The Three Dials
 * - DESIGN_VARIANCE: 7 (50/50 split hero with layered collage + 3-column cultural card grid)
 * - MOTION_INTENSITY: 6 (Fluid entry stagger, vinyl rotation synced with audio, pointer micro-physics)
 * - VISUAL_DENSITY: 4 (Poster-style single-frame density with balanced breathing room)
 */
export const DESIGN_VARIANCE = 7 as const;
export const MOTION_INTENSITY = 6 as const;
export const VISUAL_DENSITY = 4 as const;

/**
 * Section 6.F: Systemic Z-Index Scale
 */
export const Z_INDEX = {
  BASE: "z-0",
  ELEVATED_CONTENT: "z-10",
  PINNED_BADGE: "z-20",
  STICKY_HEADER: "z-40",
  MODAL_OVERLAY: "z-50",
} as const;

/**
 * Section 4.4: Shape Consistency Lock
 * - Interactive CTAs & Controls: full-pill (`rounded-full`)
 * - Cultural Cards: 13px (`rounded-[13px]`)
 * - Inner Media Frames: 8px (`rounded-[8px]`)
 * - Experience Modals: 16px (`rounded-2xl`)
 */
export const SHAPE_SYSTEM = {
  CTA: "rounded-full",
  CARD: "rounded-[13px]",
  MEDIA_FRAME: "rounded-[8px]",
  MODAL: "rounded-2xl",
} as const;
