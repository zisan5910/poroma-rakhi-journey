import { useEffect, useRef, useState } from 'react';

export const useBackgroundMusic = (audioUrl: string, volume: number = 0.2) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';

    const audio = audioRef.current;

    // Event listeners
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      // Auto start music as soon as it's loaded
      audio.play().catch(() => {
        // If autoplay fails due to browser policy, try on first user interaction
        const startOnInteraction = () => {
          audio.play().catch(console.error);
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('touchstart', startOnInteraction);
          document.removeEventListener('scroll', startOnInteraction);
        };
        
        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('touchstart', startOnInteraction, { once: true });
        document.addEventListener('scroll', startOnInteraction, { once: true });
      });
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
    };
  }, [audioUrl, volume]);

  return {
    isPlaying,
    isLoaded,
  };
};