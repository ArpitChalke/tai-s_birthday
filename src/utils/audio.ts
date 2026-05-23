// Retro Chiptune & Synthesizer Engine using standard HTML5 Web Audio API
// No assets/mp3 downloads required, completely zero-latency and 100% offline-compatible.

type SynthType = "synthesized" | "cheerful" | "ambient";

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

export function stopSynthesizedSoundtrack() {
  currentTimeoutIDs.forEach((id) => clearTimeout(id));
  currentTimeoutIDs = [];
  if (activeGainNode) {
    try {
      activeGainNode.gain.setValueAtTime(0, 0);
    } catch (e) {}
  }
}

export function playSynthesizedSoundtrack(type: SynthType = "synthesized", volume: number = 0.2, onComplete?: () => void) {
  // Stop existing sounds first
  stopSynthesizedSoundtrack();

  // Initialize or resume context
  try {
    if (!activeAudioContext) {
      activeAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (activeAudioContext.state === "suspended") {
      activeAudioContext.resume();
    }
  } catch (e) {
    console.warn("Web Audio API not supported", e);
    return;
  }

  const ctx = activeAudioContext;
  const gainNode = ctx.createGain();
  activeGainNode = gainNode;
  
  // Set safety volume boundaries
  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.connect(ctx.destination);

  let currentTimeOffset = ctx.currentTime + 0.1;

  BIRTHDAY_MELODY.forEach((note, index) => {
    // Schedule Synthesizer trigger timers
    const playDelayMs = (currentTimeOffset - ctx.currentTime) * 1000;
    
    const timeoutId = window.setTimeout(() => {
      // Create oscillator
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.connect(noteGain);
      noteGain.connect(gainNode);

      // Waveshapes based on selected aesthetic flavor
      if (type === "synthesized") {
        osc.type = "square"; // 8-Bit chiptune theme
      } else if (type === "cheerful") {
        osc.type = "triangle"; // Bubbly retro waves
      } else {
        osc.type = "sine"; // Cool sci-fi ambient
      }

      osc.frequency.setValueAtTime(note.pitch, ctx.currentTime);
      
      // Fine-tuned ADSR envelope to make it sound premium (no clicks!)
      const duration = note.duration * 1.5;
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration - 0.05);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      // Clean up nodes when note completes
      osc.onended = () => {
        osc.disconnect();
        noteGain.disconnect();
      };
    }, playDelayMs);

    currentTimeoutIDs.push(timeoutId);
    
    // Add spacer before next note
    currentTimeOffset += note.duration * 1.4;
  });

  // Schedule final complete callback
  const totalDurationMs = (currentTimeOffset - ctx.currentTime) * 1000;
  const finalTimeout = window.setTimeout(() => {
    if (onComplete) onComplete();
  }, totalDurationMs);
  
  currentTimeoutIDs.push(finalTimeout);
}

// Fun interactive UI sound effect triggers
export function playPopSfx() {
  try {
    const ctx = activeAudioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
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
    const ctx = activeAudioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
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
    const ctx = activeAudioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
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
