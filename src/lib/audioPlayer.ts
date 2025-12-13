/**
 * Audio Player Utility for Arabic Learning App
 * Handles custom audio files with TTS fallback
 */

// Audio instances cache to prevent multiple loads
const audioCache = new Map<string, HTMLAudioElement>();

// Current playing audio
let currentAudio: HTMLAudioElement | null = null;

/**
 * Play an audio file with fallback to TTS
 * @param audioPath - Path to the audio file (relative to /public)
 * @param fallbackText - Text to speak if audio file not found
 * @param onComplete - Optional callback when audio finishes
 */
export const playAudio = async (
  audioPath: string,
  fallbackText?: string,
  onComplete?: () => void
): Promise<void> => {
  // Stop any currently playing audio
  stopAudio();

  try {
    // Check cache first
    let audio = audioCache.get(audioPath);

    if (!audio) {
      // Create new audio instance
      audio = new Audio(audioPath);

      // Add to cache
      audioCache.set(audioPath, audio);

      // Preload the audio
      audio.preload = 'auto';
    }

    // Set current audio
    currentAudio = audio;

    // Reset to start
    audio.currentTime = 0;

    // Add completion handler
    if (onComplete) {
      audio.onended = onComplete;
    }

    // Play the audio
    await audio.play();
  } catch (error) {
    console.warn(`Failed to play audio: ${audioPath}`, error);

    // Fallback to TTS if provided
    if (fallbackText) {
      speakArabicTTS(fallbackText, onComplete);
    }
  }
};

/**
 * Play letter pronunciation audio
 * @param letterId - Letter ID (e.g., "alif", "ba", "ta")
 * @param fallbackText - Text to speak if audio not available
 */
export const playLetterAudio = (letterId: string, fallbackText?: string): Promise<void> => {
  const audioPath = `/audio/letters/${letterId}.mp3`;
  return playAudio(audioPath, fallbackText);
};

/**
 * Play mascot guide audio
 * @param audioName - Mascot audio name (e.g., "intro", "congratulations", "excellent")
 * @param fallbackText - Text to speak if audio not available
 */
export const playMascotAudio = (audioName: string, fallbackText?: string): Promise<void> => {
  const audioPath = `/audio/mascot/mascot_${audioName}.mp3`;
  return playAudio(audioPath, fallbackText);
};

/**
 * Stop currently playing audio
 */
export const stopAudio = (): void => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Also stop TTS
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Preload audio files for better performance
 * @param audioPaths - Array of audio file paths
 */
export const preloadAudio = (audioPaths: string[]): void => {
  audioPaths.forEach((path) => {
    if (!audioCache.has(path)) {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audioCache.set(path, audio);
    }
  });
};

/**
 * Text-to-Speech fallback function
 * @param text - Arabic text to speak
 * @param onComplete - Optional callback when speech finishes
 */
const speakArabicTTS = (text: string, onComplete?: () => void): void => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
    utterance.rate = 0.8; // Slower for kids
    utterance.pitch = 1.2; // Slightly higher pitch for friendliness

    // Try to find an Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((voice) => voice.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    // Add completion handler
    if (onComplete) {
      utterance.onend = onComplete;
    }

    window.speechSynthesis.speak(utterance);
  }
};

/**
 * Clear audio cache (useful for memory management)
 */
export const clearAudioCache = (): void => {
  audioCache.clear();
};
