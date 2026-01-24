import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { useEffect, useRef } from "react";

export default function MuteButton() {
  const { muted, setMuted, startAudio } = useAudio();
  const startedRef = useRef(false);

  useEffect(() => {
    const unlockAudio = () => {
      if (startedRef.current) return;

      startAudio();
      startedRef.current = true;

      // 🔥 Remove listeners after first interaction
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    // ✅ Listen for ANY user interaction
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [startAudio]);

  return (
    <button
      onClick={() => setMuted((m) => !m)}
      aria-label={muted ? "Unmute audio" : "Mute audio"}
      className="
        fixed top-6 left-6 z-[10000]
        w-9 h-9 rounded-full
        bg-black/50 backdrop-blur
        flex items-center justify-center
        text-white
        hover:bg-black/70
        transition
        pointer-events-auto
      "
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
