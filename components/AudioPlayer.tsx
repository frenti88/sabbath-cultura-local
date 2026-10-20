"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  title: string;
  artist: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  isPlaying,
  onTogglePlay,
  title,
  artist,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Default initial values matching reference mockup (01:24 / 03:52 = ~36%)
  const [currentTime, setCurrentTime] = useState(84);
  const [duration, setDuration] = useState(232);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (isPlaying) {
      if (!hasStarted) {
        setHasStarted(true);
        audio.currentTime = 0;
      }
      setIsLoading(true);
      setHasError(false);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.warn("Audio autoplay blocked or interrupted:", err);
          });
      }
    } else {
      audio.pause();
      setIsLoading(false);
    }
  }, [isPlaying, hasStarted, src]);

  const handleTimeUpdate = () => {
    if (audioRef.current && hasStarted) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    setIsLoading(false);
    if (audioRef.current && audioRef.current.duration) {
      if (hasStarted) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || !src || hasError) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newProgress * (duration || 232);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 36.2;

  if (!src) {
    return (
      <div
        className="w-full mt-3 py-3 px-3 rounded-lg bg-[#16161B] border border-white/10 text-[11px] text-[#90909A] text-center"
        role="status"
      >
        Pista de audio pendiente de carga para esta edición.
      </div>
    );
  }

  return (
    <div className="w-full mt-3" aria-label={`Reproductor de audio para ${title} de ${artist}`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        onEnded={() => onTogglePlay()}
        preload="metadata"
      />

      {/* Progress Track with Draggable Thumb */}
      <div
        ref={progressBarRef}
        onClick={handleSeek}
        className="group/seek relative w-full h-3 flex items-center cursor-pointer select-none"
        role="slider"
        aria-label="Progreso de reproducción"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuenow={Math.floor(currentTime)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (!audioRef.current) return;
          if (e.key === "ArrowRight") {
            audioRef.current.currentTime = Math.min(duration, currentTime + 5);
          } else if (e.key === "ArrowLeft") {
            audioRef.current.currentTime = Math.max(0, currentTime - 5);
          }
        }}
      >
        {/* Track Line */}
        <div className="w-full h-[2px] bg-[#3B3B42] rounded-full overflow-hidden">
          <div
            className={`h-full bg-white transition-all duration-75 ${isLoading ? "animate-pulse" : ""}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Circular Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none transition-transform duration-75 group-hover/seek:scale-125"
          style={{ left: `calc(${progressPercent}% - 5px)` }}
        />
      </div>

      {/* Timestamps or Error State */}
      <div className="flex justify-between items-center text-[11px] text-[#868690] font-normal tracking-wide mt-0.5">
        <span>{hasError ? "Audio no disponible" : formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 5);
          }}
          className="text-white/80 hover:text-white transition-colors duration-150 p-1 active:scale-[0.98] focus:outline-none focus-visible:ring-1 focus-visible:ring-sabbath-yellow rounded"
          aria-label="Pista anterior o retroceder"
        >
          <SkipBack className="w-3.5 h-3.5 fill-current stroke-none" />
        </button>

        {/* Circular Play/Pause Button */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-full border border-white/90 flex items-center justify-center text-white hover:scale-105 active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sabbath-yellow"
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {hasStarted && !isPlaying ? (
            <Play className="w-3.5 h-3.5 fill-white stroke-none ml-0.5" />
          ) : (
            <Pause className="w-3.5 h-3.5 fill-white stroke-none" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 5);
          }}
          className="text-white/80 hover:text-white transition-colors duration-150 p-1 active:scale-[0.98] focus:outline-none focus-visible:ring-1 focus-visible:ring-sabbath-yellow rounded"
          aria-label="Pista siguiente o avanzar"
        >
          <SkipForward className="w-3.5 h-3.5 fill-current stroke-none" />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
