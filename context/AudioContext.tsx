"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { CulturalEdition } from "@/types/edition";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioSrc?: string;
  duration?: number;
}

interface AudioContextValue {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  isLoading: boolean;
  hasError: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFavorite: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  togglePlay: () => void;
  pause: () => void;
  play: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleFavorite: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{
  edition: CulturalEdition;
  children: React.ReactNode;
}> = ({ edition, children }) => {
  const defaultTrack: AudioTrack = {
    id: edition.id,
    title: edition.music.title,
    artist: edition.music.artist.replace(/ · .*/, ""),
    cover: edition.music.cover,
    audioSrc: edition.music.audioSrc,
    duration: edition.music.duration || 232,
  };

  const [currentTrack] = useState<AudioTrack>(defaultTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(84); // 01:24 default match with mockup
  const [duration, setDuration] = useState(defaultTrack.duration || 232); // 03:52
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Restore volume and favorite from localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFav = localStorage.getItem("sabbath_fav_001");
        if (savedFav) setIsFavorite(savedFav === "true");
        const savedVol = localStorage.getItem("sabbath_vol");
        if (savedVol) {
          const v = parseFloat(savedVol);
          if (!isNaN(v) && v >= 0 && v <= 1) setVolumeState(v);
        }
      } catch (e) {
        // Ignore localStorage restrictions
      }
    }
  }, []);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    if (!currentTrack.audioSrc) {
      setHasError(true);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!hasStarted) {
        setHasStarted(true);
        audio.currentTime = 0;
        setCurrentTime(0);
      }
      setIsLoading(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
            setHasError(false);
          })
          .catch((err) => {
            console.warn("Playback prevented or aborted:", err);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [isPlaying, hasStarted, currentTrack.audioSrc]);

  const play = useCallback(() => {
    if (!isPlaying) togglePlay();
  }, [isPlaying, togglePlay]);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const seek = useCallback(
    (seconds: number) => {
      if (!audioRef.current) return;
      const targetTime = Math.max(0, Math.min(seconds, duration));
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
      if (!hasStarted) {
        setHasStarted(true);
      }
    },
    [duration, hasStarted]
  );

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0) setIsMuted(false);
    try {
      localStorage.setItem("sabbath_vol", clamped.toString());
    } catch (e) {}
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sabbath_fav_001", next.toString());
      } catch (e) {}
      return next;
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const previousTrack = useCallback(() => {
    seek(0);
  }, [seek]);

  const nextTrack = useCallback(() => {
    if (isRepeat) {
      seek(0);
      play();
    } else {
      seek(0);
      pause();
    }
  }, [isRepeat, seek, play, pause]);

  // Audio element events
  const handleTimeUpdate = () => {
    if (audioRef.current && hasStarted) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      if (hasStarted) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      seek(0);
      play();
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isLoading,
        hasError,
        currentTime,
        duration,
        volume,
        isMuted,
        isFavorite,
        isShuffle,
        isRepeat,
        togglePlay,
        pause,
        play,
        seek,
        setVolume,
        toggleMute,
        toggleFavorite,
        toggleShuffle,
        toggleRepeat,
        previousTrack,
        nextTrack,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
        }}
        onEnded={handleEnded}
        preload="metadata"
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioProvider");
  }
  return context;
};
