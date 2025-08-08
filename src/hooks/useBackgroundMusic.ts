import { useEffect, useRef, useState } from 'react';

// Global audio instance to persist across page changes
let globalAudio: HTMLAudioElement | null = null;
let isGlobalAudioInitialized = false;

export const useBackgroundMusic = (audioUrl: string, volume: number = 0.15) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only initialize once globally
    if (!isGlobalAudioInitialized) {
      globalAudio = new Audio(audioUrl);
      globalAudio.loop = true;
      globalAudio.volume = volume;
      globalAudio.preload = 'auto';
      
      // Force autoplay attributes for mobile
      globalAudio.setAttribute('autoplay', 'true');
      globalAudio.setAttribute('muted', 'false');
      globalAudio.setAttribute('playsinline', 'true');
      
      isGlobalAudioInitialized = true;

      const startMusic = async () => {
        try {
          await globalAudio?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play blocked, trying with user interaction');
          
          // Immediate interaction attempt
          const startOnAnyInteraction = async () => {
            try {
              await globalAudio?.play();
              setIsPlaying(true);
              
              // Remove all listeners after successful play
              document.removeEventListener('click', startOnAnyInteraction);
              document.removeEventListener('touchstart', startOnAnyInteraction);
              document.removeEventListener('touchend', startOnAnyInteraction);
              document.removeEventListener('scroll', startOnAnyInteraction);
              document.removeEventListener('keydown', startOnAnyInteraction);
              document.removeEventListener('mousemove', startOnAnyInteraction);
              window.removeEventListener('load', startOnAnyInteraction);
            } catch (e) {
              console.error('Failed to play audio:', e);
            }
          };
          
          // Add listeners for any possible interaction
          document.addEventListener('click', startOnAnyInteraction, { passive: true });
          document.addEventListener('touchstart', startOnAnyInteraction, { passive: true });
          document.addEventListener('touchend', startOnAnyInteraction, { passive: true });
          document.addEventListener('scroll', startOnAnyInteraction, { passive: true });
          document.addEventListener('keydown', startOnAnyInteraction, { passive: true });
          document.addEventListener('mousemove', startOnAnyInteraction, { passive: true });
          window.addEventListener('load', startOnAnyInteraction, { passive: true });
          
          // Try again after a short delay
          setTimeout(startOnAnyInteraction, 100);
        }
      };

      const handleCanPlayThrough = () => {
        setIsLoaded(true);
        startMusic();
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      globalAudio.addEventListener('canplaythrough', handleCanPlayThrough);
      globalAudio.addEventListener('play', handlePlay);
      globalAudio.addEventListener('pause', handlePause);
      
      // Force immediate load and play attempt
      globalAudio.load();
      
      // Try to start immediately without waiting
      setTimeout(() => {
        startMusic();
      }, 50);
      
    } else if (globalAudio) {
      // If already initialized, just sync state
      setIsPlaying(!globalAudio.paused);
      setIsLoaded(globalAudio.readyState >= 3);
    }

    // Don't clean up global audio on unmount
    return () => {};
  }, [audioUrl, volume]);

  return {
    isPlaying,
    isLoaded,
  };
};