"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useAudioPlayer } from "@/context/AudioContext";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export const PersistentAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFavorite,
    isShuffle,
    isRepeat,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    toggleFavorite,
    toggleShuffle,
    toggleRepeat,
    previousTrack,
    nextTrack,
  } = useAudioPlayer();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVolume = isMuted ? 0 : volume;

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio * duration);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(ratio);
  };

  return (
    <footer
      className="player fixed left-0 right-0 bottom-0 h-[89px] bg-[#151515] border-t border-[#343434] z-40 px-4 sm:px-[25px] flex items-center justify-between md:grid md:grid-cols-[1fr_1.25fr_1fr]"
      aria-label="Reproductor multimedia de Sabbath"
    >
      {/* 1. Track info (left) */}
      <div className="track flex items-center gap-3 min-w-0 pr-2">
        <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] rounded-[5px] overflow-hidden flex-shrink-0 relative bg-[#222]">
          <Image
            src={currentTrack.cover}
            alt={currentTrack.title}
            fill
            className="object-cover"
            sizes="55px"
          />
        </div>
        <div className="min-w-0">
          <strong className="block text-[13px] tracking-[-0.15px] text-white truncate">
            {currentTrack.title}
          </strong>
          <small className="block text-[#8c8c8c] text-[11px] mt-1 truncate">
            {currentTrack.artist}
          </small>
        </div>
        <button
          type="button"
          onClick={toggleFavorite}
          className={`heart ml-2 sm:ml-5 text-[20px] transition-colors duration-150 p-1 flex-shrink-0 ${
            isFavorite ? "text-[#F3334D]" : "text-[#aaa] hover:text-white"
          }`}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      {/* 2. Controls & Seekbar (center - desktop) */}
      <div className="player-center hidden md:flex flex-col items-center gap-[9px]">
        {/* Controls */}
        <div className="ctrl flex items-center gap-6 text-[#888] text-[18px]">
          <button
            type="button"
            onClick={toggleShuffle}
            className={`transition-colors hover:text-white p-1 text-[17px] ${
              isShuffle ? "text-[#FFC501]" : ""
            }`}
            aria-label="Reproducción aleatoria"
            title="Aleatorio"
          >
            ⇄
          </button>
          <button
            type="button"
            onClick={previousTrack}
            className="transition-colors hover:text-white p-1 text-[16px]"
            aria-label="Pista anterior"
            title="Reiniciar pista"
          >
            ⏮
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="playcontrol w-[29px] h-[29px] rounded-full text-[#111] bg-[#f1f1f1] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-[13px] shadow-sm"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <span className="font-bold text-[11px]">❚❚</span>
            ) : (
              <span className="ml-0.5">▶</span>
            )}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            className="transition-colors hover:text-white p-1 text-[16px]"
            aria-label="Pista siguiente"
            title="Siguiente pista"
          >
            ⏭
          </button>
          <button
            type="button"
            onClick={toggleRepeat}
            className={`transition-colors hover:text-white p-1 text-[17px] ${
              isRepeat ? "text-[#FFC501]" : ""
            }`}
            aria-label="Repetir pista"
            title="Repetir"
          >
            ↻
          </button>
        </div>

        {/* Seekbar */}
        <div className="seek flex items-center gap-2.5 w-full max-w-[450px] text-[10px] text-[#888] font-mono select-none">
          <span className="w-8 text-right tabular-nums">{formatTime(currentTime)}</span>
          <div
            ref={progressBarRef}
            onClick={handleSeekClick}
            className="seekbar group relative flex-1 h-[4px] bg-[#474747] rounded-[5px] cursor-pointer"
            role="slider"
            aria-label="Línea de tiempo del audio"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seek(currentTime + 5);
              if (e.key === "ArrowLeft") seek(currentTime - 5);
            }}
          >
            {/* Played progress */}
            <div
              className="absolute inset-y-0 left-0 bg-[#f1f1f1] group-hover:bg-[#FFC501] rounded-[5px] transition-colors"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -ml-[5px] w-[10px] h-[10px] rounded-full bg-white opacity-0 group-hover:opacity-100 shadow transition-opacity"
              style={{ left: `${progressPercent}%` }}
            />
          </div>
          <span className="w-8 tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Tools & Volume (right - desktop) */}
      <div className="tools hidden md:flex justify-end items-center gap-4 text-[#999] text-[13px]">
        <button
          type="button"
          className="hover:text-white transition-colors p-1 text-[15px]"
          aria-label="Letra o notas"
          title="Notas de la edición"
        >
          ≡
        </button>
        <button
          type="button"
          className="hover:text-white transition-colors p-1 text-[14px]"
          aria-label="Cola de reproducción"
          title="Cola"
        >
          ▣
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="hover:text-white transition-colors p-1 text-[15px]"
          aria-label={isMuted ? "Reactivar sonido" : "Silenciar"}
          title={isMuted ? "Reactivar sonido" : "Silenciar"}
        >
          {isMuted ? "🔇" : "◖))"}
        </button>

        {/* Volume Bar */}
        <div
          ref={volumeBarRef}
          onClick={handleVolumeClick}
          className="volume group relative w-[92px] h-[4px] rounded-[3px] bg-[#494949] cursor-pointer"
          role="slider"
          aria-label="Volumen"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(currentVolume * 100)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowRight") setVolume(volume + 0.05);
            if (e.key === "ArrowDown" || e.key === "ArrowLeft") setVolume(volume - 0.05);
          }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-[#bdbdbd] group-hover:bg-[#FFC501] rounded-[3px] transition-colors"
            style={{ width: `${currentVolume * 100}%` }}
          />
        </div>

        {/* Sabbath Symbol Badge */}
        <div
          className="roundmark w-[28px] h-[28px] rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center select-none"
          title="Sabbath Cultura Local"
        >
          <Image
            src="/assets/sabbath-symbol.png"
            alt="Sabbath"
            width={16}
            height={20}
            className="w-[13px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Mobile Play Button */}
      <div className="flex md:hidden items-center">
        <button
          type="button"
          onClick={togglePlay}
          className="w-[36px] h-[36px] rounded-full bg-white text-[#111] flex items-center justify-center text-[14px] shadow font-bold"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            <span className="text-[12px]">❚❚</span>
          ) : (
            <span className="ml-0.5">▶</span>
          )}
        </button>
      </div>
    </footer>
  );
};
