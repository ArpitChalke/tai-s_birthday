// Retro Chiptune & Synthesizer Engine using standard HTML5 Web Audio API
// No assets/mp3 downloads required, completely zero-latency and 100% offline-compatible.

type SynthType = "synthesized" | "cheerful" | "ambient";
export type SlideshowTrackId = "anuu-darling" | "owner-of-our-hearts" | "fam-jam";
const SLIDESHOW_AUDIO_SOURCES: Record<SlideshowTrackId, string> = {
  "anuu-darling": new URL("../assets/audio/itni-kyun-tum-khubsurat-ho.mp3", import.meta.url).href,
  "owner-of-our-hearts": new URL("../assets/audio/piyu-bole-piya-bole.mp3", import.meta.url).href,
  "fam-jam": new URL("../assets/audio/pal-pal-dil-ke-paas.mp3", import.meta.url).href,
};

interface Note {
  pitch: number; // Hz representation
  duration: number; // seconds
}

// Frequencies for Happiest birthday tune
const NOTES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  Bb4: 466.16,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
};

// "Happy Birthday to you" schedule
const BIRTHDAY_MELODY: Note[] = [
  { pitch: NOTES.C4, duration: 0.3 },
  { pitch: NOTES.C4, duration: 0.1 },
  { pitch: NOTES.D4, duration: 0.4 },
  { pitch: NOTES.C4, duration: 0.4 },
  { pitch: NOTES.F4, duration: 0.4 },
  { pitch: NOTES.E4, duration: 0.8 },
  
  { pitch: NOTES.C4, duration: 0.3 },
  { pitch: NOTES.C4, duration: 0.1 },
  { pitch: NOTES.D4, duration: 0.4 },
  { pitch: NOTES.C4, duration: 0.4 },
  { pitch: NOTES.G4, duration: 0.4 },
  { pitch: NOTES.F4, duration: 0.8 },

  { pitch: NOTES.C4, duration: 0.3 },
  { pitch: NOTES.C4, duration: 0.1 },
  { pitch: NOTES.C5, duration: 0.4 },
  { pitch: NOTES.A4, duration: 0.4 },
  { pitch: NOTES.F4, duration: 0.4 },
  { pitch: NOTES.E4, duration: 0.4 },
  { pitch: NOTES.D4, duration: 0.8 },

  { pitch: NOTES.Bb4, duration: 0.3 },
  { pitch: NOTES.Bb4, duration: 0.1 },
  { pitch: NOTES.A4, duration: 0.4 },
  { pitch: NOTES.F4, duration: 0.4 },
  { pitch: NOTES.G4, duration: 0.4 },
  { pitch: NOTES.F4, duration: 1.0 },
];

let activeAudioContext: AudioContext | null = null;
let currentTimeoutIDs: number[] = [];
let activeGainNode: GainNode | null = null;
let activeSlideshowAudio: HTMLAudioElement | null = null;
const slideshowAudioCache: Partial<Record<SlideshowTrackId, HTMLAudioElement>> = {};

function getAudioContext() {
  if (!activeAudioContext) {
    activeAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (activeAudioContext.state === "suspended") {
    activeAudioContext.resume();
  }
  return activeAudioContext;
}

function scheduleMelodyPlayback(
  melody: Note[],
  options: {
    oscillatorType: OscillatorType;
    volume: number;
    stretch?: number;
    timeoutBucket: number[];
    setGainNode: (gainNode: GainNode) => void;
    onComplete?: () => void;
  }
) {
  const ctx = getAudioContext();
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(options.volume, ctx.currentTime);
  gainNode.connect(ctx.destination);
  options.setGainNode(gainNode);

  let currentTimeOffset = ctx.currentTime + 0.08;
  const stretch = options.stretch ?? 1.35;

  melody.forEach((note) => {
    const playDelayMs = (currentTimeOffset - ctx.currentTime) * 1000;
    const timeoutId = window.setTimeout(() => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.connect(noteGain);
      noteGain.connect(gainNode);
      osc.type = options.oscillatorType;
      osc.frequency.setValueAtTime(note.pitch, ctx.currentTime);

      const duration = note.duration * stretch;
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration - 0.04);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
      osc.onended = () => {
        osc.disconnect();
        noteGain.disconnect();
      };
    }, playDelayMs);

    options.timeoutBucket.push(timeoutId);
    currentTimeOffset += note.duration * 1.25;
  });

  if (options.onComplete) {
    const finalTimeout = window.setTimeout(options.onComplete, (currentTimeOffset - ctx.currentTime) * 1000);
    options.timeoutBucket.push(finalTimeout);
  }
}

export function stopSynthesizedSoundtrack() {
  currentTimeoutIDs.forEach((id) => clearTimeout(id));
  currentTimeoutIDs = [];
  if (activeGainNode) {
    try {
      activeGainNode.gain.setValueAtTime(0, 0);
    } catch (e) {}
  }
}

export function stopSlideshowSoundtrack() {
  if (activeSlideshowAudio) {
    activeSlideshowAudio.pause();
    activeSlideshowAudio.currentTime = 0;
    activeSlideshowAudio.onended = null;
  }
  activeSlideshowAudio = null;
}

export function playSynthesizedSoundtrack(type: SynthType = "synthesized", volume: number = 0.2, onComplete?: () => void) {
  // Stop existing sounds first
  stopSynthesizedSoundtrack();

  // Initialize or resume context
  try {
    getAudioContext();
  } catch (e) {
    console.warn("Web Audio API not supported", e);
    return;
  }

  const oscillatorType: OscillatorType =
    type === "synthesized" ? "square" : type === "cheerful" ? "triangle" : "sine";

  scheduleMelodyPlayback(BIRTHDAY_MELODY, {
    oscillatorType,
    volume,
    stretch: 1.5,
    timeoutBucket: currentTimeoutIDs,
    setGainNode: (gainNode) => {
      activeGainNode = gainNode;
    },
    onComplete,
  });
}

export function playSlideshowSoundtrack(trackId: SlideshowTrackId, volume: number = 0.14, onComplete?: () => void) {
  stopSlideshowSoundtrack();

  try {
    const audio =
      slideshowAudioCache[trackId] ??
      new Audio(SLIDESHOW_AUDIO_SOURCES[trackId]);

    slideshowAudioCache[trackId] = audio;
    activeSlideshowAudio = audio;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    audio.preload = "auto";
    audio.onended = () => {
      if (onComplete) onComplete();
    };

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch((error) => {
        console.warn("Unable to autoplay slideshow soundtrack", error);
      });
    }
  } catch (e) {
    console.warn("Audio playback not supported", e);
    return;
  }
}

// Fun interactive UI sound effect triggers
export function playPopSfx() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    // Quick pitch sweep upwards for popping balloon sound
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

export function playConfettiSfx() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "triangle";
    // High-pitched sparkle chirp
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

export function playSynthesizerCoreNote(frequency: number) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}
