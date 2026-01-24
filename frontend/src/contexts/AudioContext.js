"use client";
import { createContext, use, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/audio/bg-audio.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;

    const stored = localStorage.getItem("bg-muted");
    if (stored) setMuted(stored === "true");

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : 0.25;
    localStorage.setItem("bg-muted", muted);
  }, [muted]);

  const startAudio = async () => {
    if (!audioRef.current || started) return;
    try {
      await audioRef.current.play();
      setStarted(true);
    } catch {
      // autoplay blocked — user must click again
    }
  };

  return (
    <AudioContext.Provider
      value={{
        muted,
        setMuted,
        startAudio,
        started,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
