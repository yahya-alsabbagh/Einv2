import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
// @ts-ignore
import musicFile from '../assets/music.mp3';

export function GlobalMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We create the audio element dynamically to avoid DOM clutter
    const audio = new Audio(musicFile);
    audio.loop = true;
    audioRef.current = audio;

    // Function to play audio on first user interaction
    const playAudio = () => {
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(console.error);
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };

    // Add listeners for first interaction
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);

    // Initial attempt to autoplay (browsers usually block this until user interacts)
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      console.log("Autoplay blocked. Waiting for user interaction.");
    });

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the global document click listener
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-slate hover:bg-white/50 transition-all shadow-lg hover:scale-105 active:scale-95"
      aria-label="Toggle music"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-red-600" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-70" />
      )}
    </button>
  );
}
