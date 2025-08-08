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
      isGlobalAudioInitialized = true;

      // More aggressive autoplay attempts for mobile
      const handleCanPlayThrough = () => {
        setIsLoaded(true);
        
        // Try to play immediately
        const playPromise = globalAudio?.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If autoplay fails, try multiple interaction events
            const startOnInteraction = () => {
              globalAudio?.play().then(() => {
                setIsPlaying(true);
              }).catch(console.error);
              
              // Remove all listeners after first successful play
              document.removeEventListener('click', startOnInteraction);
              document.removeEventListener('touchstart', startOnInteraction);
              document.removeEventListener('scroll', startOnInteraction);
              document.removeEventListener('keydown', startOnInteraction);
              document.removeEventListener('mousemove', startOnInteraction);
            };
            
            // Add multiple event listeners for better mobile coverage
            document.addEventListener('click', startOnInteraction, { once: true });
            document.addEventListener('touchstart', startOnInteraction, { once: true });
            document.addEventListener('scroll', startOnInteraction, { once: true });
            document.addEventListener('keydown', startOnInteraction, { once: true });
            document.addEventListener('mousemove', startOnInteraction, { once: true });
          });
        }
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
      
      // Try immediate load
      globalAudio.load();
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