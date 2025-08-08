
import { useEffect, useRef, useState } from 'react';

// Global audio instance to persist across page changes
let globalAudio: HTMLAudioElement | null = null;
let isGlobalAudioInitialized = false;

export const useBackgroundMusic = (audioUrl: string, volume: number = 0.15) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const attemptCountRef = useRef(0);
  const maxAttempts = 50; // Maximum retry attempts

  useEffect(() => {
    // Only initialize once globally
    if (!isGlobalAudioInitialized) {
      globalAudio = new Audio(audioUrl);
      globalAudio.loop = true;
      globalAudio.volume = volume;
      globalAudio.preload = 'auto';
      
      // Mobile optimization attributes
      globalAudio.setAttribute('autoplay', 'true');
      globalAudio.setAttribute('muted', 'false');
      globalAudio.setAttribute('playsinline', 'true');
      
      isGlobalAudioInitialized = true;

      const tryToPlayMusic = async () => {
        if (!globalAudio || attemptCountRef.current >= maxAttempts) return;
        
        attemptCountRef.current++;
        
        try {
          // Set volume before playing
          globalAudio.volume = volume;
          await globalAudio.play();
          setIsPlaying(true);
          console.log('Background music started successfully');
        } catch (error) {
          console.log(`Auto-play attempt ${attemptCountRef.current} failed:`, error);
          
          // Continue trying with different strategies
          if (attemptCountRef.current < maxAttempts) {
            // Try again after a short delay
            setTimeout(tryToPlayMusic, 200 + (attemptCountRef.current * 100));
          }
        }
      };

      const startOnUserInteraction = async () => {
        try {
          if (globalAudio && globalAudio.paused) {
            globalAudio.volume = volume;
            await globalAudio.play();
            setIsPlaying(true);
            console.log('Music started on user interaction');
            
            // Remove all event listeners after successful play
            removeAllEventListeners();
          }
        } catch (error) {
          console.error('Failed to start music on interaction:', error);
        }
      };

      const removeAllEventListeners = () => {
        const events = ['click', 'touchstart', 'touchend', 'scroll', 'keydown', 'mousemove', 'pointermove', 'pointerdown'];
        events.forEach(event => {
          document.removeEventListener(event, startOnUserInteraction);
          window.removeEventListener(event, startOnUserInteraction);
        });
      };

      // Add comprehensive event listeners for user interaction
      const addInteractionListeners = () => {
        const events = ['click', 'touchstart', 'touchend', 'scroll', 'keydown', 'mousemove', 'pointermove', 'pointerdown'];
        events.forEach(event => {
          document.addEventListener(event, startOnUserInteraction, { 
            passive: true, 
            once: false  // Allow multiple attempts
          });
          window.addEventListener(event, startOnUserInteraction, { 
            passive: true, 
            once: false
          });
        });
      };

      const handleCanPlay = () => {
        setIsLoaded(true);
        console.log('Audio loaded, attempting to play...');
        tryToPlayMusic();
      };

      const handlePlay = () => {
        setIsPlaying(true);
        console.log('Audio started playing');
      };

      const handlePause = () => {
        setIsPlaying(false);
        console.log('Audio paused');
      };

      const handleLoadStart = () => {
        console.log('Audio loading started...');
      };

      const handleError = (e: Event) => {
        console.error('Audio error:', e);
      };

      // Add all event listeners
      globalAudio.addEventListener('canplay', handleCanPlay);
      globalAudio.addEventListener('canplaythrough', handleCanPlay);
      globalAudio.addEventListener('loadeddata', handleCanPlay);
      globalAudio.addEventListener('play', handlePlay);
      globalAudio.addEventListener('pause', handlePause);
      globalAudio.addEventListener('loadstart', handleLoadStart);
      globalAudio.addEventListener('error', handleError);
      
      // Start loading immediately
      globalAudio.load();
      
      // Add interaction listeners immediately
      addInteractionListeners();
      
      // Try to play immediately
      setTimeout(tryToPlayMusic, 100);
      
      // Aggressive retry strategy
      const retryInterval = setInterval(() => {
        if (globalAudio && globalAudio.paused && attemptCountRef.current < maxAttempts) {
          tryToPlayMusic();
        } else if (!globalAudio?.paused || attemptCountRef.current >= maxAttempts) {
          clearInterval(retryInterval);
        }
      }, 1000);
      
      // Try on page visibility change (when user comes back to tab)
      const handleVisibilityChange = () => {
        if (!document.hidden && globalAudio && globalAudio.paused) {
          tryToPlayMusic();
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Try on page focus
      const handleFocus = () => {
        if (globalAudio && globalAudio.paused) {
          tryToPlayMusic();
        }
      };
      
      window.addEventListener('focus', handleFocus);
      
    } else if (globalAudio) {
      // If already initialized, just sync state
      setIsPlaying(!globalAudio.paused);
      setIsLoaded(globalAudio.readyState >= 2);
      
      // Try to resume if paused
      if (globalAudio.paused) {
        const resumeMusic = async () => {
          try {
            await globalAudio.play();
            setIsPlaying(true);
          } catch (error) {
            console.log('Resume failed:', error);
          }
        };
        
        // Try to resume immediately
        resumeMusic();
        
        // Also try on next user interaction
        const resumeOnInteraction = () => {
          resumeMusic();
          document.removeEventListener('click', resumeOnInteraction);
          document.removeEventListener('touchstart', resumeOnInteraction);
        };
        
        document.addEventListener('click', resumeOnInteraction, { passive: true });
        document.addEventListener('touchstart', resumeOnInteraction, { passive: true });
      }
    }

    // Don't clean up global audio on unmount
    return () => {};
  }, [audioUrl, volume]);

  return {
    isPlaying,
    isLoaded,
  };
};
