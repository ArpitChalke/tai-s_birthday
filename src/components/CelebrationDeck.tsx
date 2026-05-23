import React, { useState, useEffect, useRef } from "react";
import { Zap, Gamepad2, Gift, Flame, Sparkles, Volume2, Music4 } from "lucide-react";
import { playPopSfx, playConfettiSfx, playSynthesizerCoreNote, playSynthesizedSoundtrack } from "../utils/audio";
import { CONGRATS_EMOJIS } from "../data";

interface CelebrationDeckProps {
  name: string;
  themeColor: string;
  onPopConfetti: () => void;
}

interface MiniBalloon {
  id: number;
  left: number; // percentage
  bottom: number; // pixels
  speed: number;
  color: string;
  popped: boolean;
  scoreTag: boolean;
}

const BALLOON_COLORS = [
  "from-pink-500 to-rose-600 border-pink-400 shadow-pink-500/30",
  "from-purple-500 to-indigo-600 border-purple-400 shadow-purple-500/30",
  "from-cyan-400 to-blue-500 border-cyan-300 shadow-cyan-400/30",
  "from-emerald-400 to-teal-500 border-emerald-300 shadow-emerald-400/30",
  "from-yellow-400 to-amber-500 border-yellow-300 shadow-yellow-500/30"
];

const SYNTH_KEYS = [
  { note: "C4", name: "Do", freq: 261.63, color: "bg-red-500 text-white shadow-red-500/40" },
  { note: "D4", name: "Re", freq: 293.66, color: "bg-orange-500 text-white shadow-orange-500/40" },
  { note: "E4", name: "Mi", freq: 329.63, color: "bg-yellow-500 text-slate-950 shadow-yellow-500/40" },
  { note: "F4", name: "Fa", freq: 349.23, color: "bg-green-500 text-white shadow-green-500/40" },
  { note: "G4", name: "Sol", freq: 392.00, color: "bg-cyan-500 text-slate-950 shadow-cyan-500/40" },
  { note: "A4", name: "La", freq: 440.00, color: "bg-blue-500 text-white shadow-blue-500/40" },
  { note: "B4", name: "Ti", freq: 493.88, color: "bg-purple-500 text-white shadow-purple-500/40" },
  { note: "C5", name: "Do", freq: 523.25, color: "bg-pink-500 text-white shadow-pink-500/40" }
];

export default function CelebrationDeck({ name, themeColor, onPopConfetti }: CelebrationDeckProps) {
  // Candle states
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [showBlowSparkles, setShowBlowSparkles] = useState(false);

  // Game states
  const [balloonPoppingActive, setBalloonPoppingActive] = useState(false);
  const [balloons, setBalloons] = useState<MiniBalloon[]>([]);
  const [score, setScore] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const balloonIdCounter = useRef(0);

  // Sound chimes playing helper
  const playBirthdaySong = () => {
    playSynthesizedSoundtrack("synthesized", 0.15);
  };

  const handleBlowCandle = () => {
    if (!candlesLit) return;
    playConfettiSfx();
    setCandlesLit(false);
    setShowBlowSparkles(true);
    setWishMade(true);
    onPopConfetti();

    setTimeout(() => {
      setShowBlowSparkles(false);
    }, 1800);
  };

  // Spark candles back to life
  const handleRelightCandle = () => {
    playPopSfx();
    setCandlesLit(true);
    setWishMade(false);
  };

  // Piano keypad controller
  const handleSynthKey = (freq: number) => {
    playSynthesizerCoreNote(freq);
  };

  // Game balloon generation logic
  useEffect(() => {
    if (!balloonPoppingActive) {
      setBalloons([]);
      return;
    }

    // Spawn ballons at interval
    const spawnInterval = setInterval(() => {
      if (balloons.length > 20) return; // Keep clean

      const randLeft = Math.floor(Math.random() * 85) + 5; // offset margins
      const randSpeed = Math.floor(Math.random() * 3) + 2; 
      const randColor = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
      
      const newBalloon: MiniBalloon = {
        id: balloonIdCounter.current++,
        left: randLeft,
        bottom: -40,
        speed: randSpeed,
        color: randColor,
        popped: false,
        scoreTag: false
      };

      setBalloons((prev) => [...prev, newBalloon]);
    }, 1200);

    return () => clearInterval(spawnInterval);
  }, [balloonPoppingActive, balloons.length]);

  // Main Balloon position update looping timer tick
  useEffect(() => {
    if (!balloonPoppingActive) return;

    const gameLoop = setInterval(() => {
      setBalloons((prev) => 
        prev
          .map((b) => {
            if (b.popped) return b;
            return {
              ...b,
              bottom: b.bottom + b.speed
            };
          })
          // Filter out balloons exceeding height boundaries
          .filter((b) => b.bottom < 420)
      );
    }, 30);

    return () => clearInterval(gameLoop);
  }, [balloonPoppingActive]);

  const handlePopBalloon = (id: number) => {
    playPopSfx();
    setScore((val) => val + 1);
    
    setBalloons((prev) => 
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            popped: true,
            scoreTag: true
          };
        }
        return b;
      })
    );

    // Delayed deletion
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== id));
    }, 500);
  };

  // Style helper
  const accentCardClass = 
    themeColor === "rockstar-pink" ? "bg-white border-4 border-slate-950 shadow-[8px_8px_0px_0px_#FF4FA3]" :
    themeColor === "retro-purple" ? "bg-white border-4 border-slate-950 shadow-[8px_8px_0px_0px_#6A00F4]" :
    themeColor === "cyber-cyan" ? "bg-white border-4 border-slate-950 shadow-[8px_8px_0px_0px_#00D9FF]" :
    themeColor === "sweet-peach" ? "bg-white border-4 border-slate-950 shadow-[8px_8px_0px_0px_#FF4FA3]" :
    "bg-white border-4 border-slate-950 shadow-[8px_8px_0px_0px_#FFD93D]";

  const btnBgClass = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3] hover:bg-[#FF72B6] text-white border-3 border-slate-950 shadow-[3px_3px_0px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0.5" :
    themeColor === "retro-purple" ? "bg-[#6A00F4] hover:bg-[#8123FF] text-white border-3 border-slate-950 shadow-[3px_3px_0px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0.5" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF] hover:bg-[#43E6FF] text-slate-950 border-3 border-slate-950 shadow-[3px_3px_0px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0.5" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3] hover:bg-[#FF72B6] text-slate-950 border-3 border-slate-950 shadow-[3px_3px_0px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0.5" :
    "bg-[#FFD93D] hover:bg-[#FFE366] text-slate-950 border-3 border-slate-950 shadow-[3px_3px_0px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0.5";

  return (
    <section
      id="deck"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-b-4 border-slate-950 relative overflow-hidden"
    >
      {/* Polka dots texture overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-20">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_0px_#121212]">
            <Gamepad2 className="w-3.5 h-3.5 text-[#00D9FF]" /> Interactive Celebration Deck
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans">
            Have Fun and Play!
          </h2>
          <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-850 font-medium max-w-md mx-auto">
            Interact with our retro custom features. Relive arcade vibes, blow physical birthday candles, or compose a quick synthesized chime note on the keyboard!
          </p>
        </div>

        {/* 3-Part Grid Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 bg-transparent">

          {/* Card 1: Virtual Candle Blowing Cake Widget (4-span) */}
          <div className={`lg:col-span-4 rounded-3xl p-6 ${accentCardClass} flex flex-col justify-between relative overflow-hidden`}>
            
            {/* Candle Sparks overlay */}
            {showBlowSparkles && (
              <div className="absolute inset-0 bg-white/95 border-4 border-slate-950 z-20 flex flex-col items-center justify-center text-center p-4">
                <Sparkles className="w-12 h-12 text-[#FFD93D] animate-spin" />
                <p className="font-sans font-black text-slate-950 text-lg tracking-tight uppercase mt-3 animate-pulse">
                  WISH SENT TO STARS! ✨
                </p>
                <p className="text-[10px] font-mono text-slate-700 mt-1 max-w-[200px]">
                  Sparklers are glowing, hope your birthday wishes manifest!
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4.5 h-4.5 text-[#FF4FA3] fill-[#FF4FA3]/25" /> Blow Virtual Candle
                </h3>
                <span className="font-mono text-[9px] text-slate-900 uppercase font-black tracking-wider border-2 border-slate-950 px-2 py-0.5 rounded-full bg-slate-100">
                  {candlesLit ? "Lit 🕯️" : "Blown 💨"}
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-medium">
                Close your eyes, visualize your dream milestones, and tap block blew controls below!
              </p>
            </div>

            {/* Cupcake Vector representation */}
            <div className="my-8 flex justify-center scale-102 transition-transform duration-300">
              <div className="relative w-36 h-36 flex flex-col items-center justify-end select-none">
                
                {/* 1. Fire candle flame */}
                {candlesLit ? (
                  <div className="absolute top-1 flex flex-col items-center group cursor-pointer animate-float" style={{ animationDuration: "2s" }}>
                    <div className="w-4 h-6 rounded-full bg-linear-to-b from-yellow-300 via-orange-500 to-red-600 blur-[1px] animate-pulse relative" />
                    <div className="w-0.5 h-2.5 bg-slate-400 mt-[-1px]" />
                  </div>
                ) : (
                  <div className="absolute top-6 flex flex-col items-center opacity-60">
                    {/* Tiny smoke trail */}
                    <div className="w-1.5 h-5 bg-white/25 rounded-full animate-pulse blur-xs" />
                    <div className="w-0.5 h-2.5 bg-slate-500" />
                  </div>
                )}

                {/* 2. Cupcake Cream / Icing Vector overlay */}
                <div className="w-24 h-16 rounded-full bg-gradient-to-b from-pink-300 to-pink-500 border-3 border-slate-950 flex shadow-md relative z-10 box-border items-center justify-center">
                  <span className="text-xl">🍓</span>
                  {/* Glowing sprinkles overlays */}
                  <span className="absolute top-3 left-4 w-2 h-1 bg-yellow-300 rounded-full rotate-45" />
                  <span className="absolute top-5 right-6 w-2.5 h-1 bg-cyan-300 rounded-full -rotate-12" />
                  <span className="absolute bottom-4 left-8 w-2 h-1 bg-white rounded-full rotate-12" />
                </div>

                {/* 3. Cupcake Wrapper crust */}
                <div 
                  className="w-20 h-14 bg-gradient-to-b from-yellow-600 to-amber-700 border-3 border-slate-950 rounded-b-xl relative shadow-md mt-[-8px] z-0 flex overflow-hidden justify-around"
                >
                  {/* Creases vector list */}
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <div key={idx} className="w-[3px] h-full bg-amber-800 opacity-60" />
                  ))}
                </div>
              </div>
            </div>

            {/* Blow interaction buttons action trigger */}
            <div className="space-y-2 mt-4">
              {candlesLit ? (
                <button
                  id="btn-deck-blow-candle"
                  onClick={handleBlowCandle}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider outline-none cursor-pointer select-none text-center ${btnBgClass}`}
                >
                  Blow Out The Candles! 🎂
                </button>
              ) : (
                <button
                  id="btn-deck-relight-candle"
                  onClick={handleRelightCandle}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-950 rounded-xl text-xs font-black border-3 border-slate-950 shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0.5 duration-200 transition-all cursor-pointer select-none"
                >
                  🪄 Spark Candles Back to Life!
                </button>
              )}

              <button
                id="btn-deck-play-happy-birthday"
                onClick={playBirthdaySong}
                className="w-full py-2 pb-2.5 bg-white hover:bg-slate-50 text-xs font-black text-slate-850 rounded-xl border-3 border-dashed border-slate-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none mt-1"
              >
                <Music4 className="w-4 h-4 text-pink-500" /> Play Chiptune Tune ♪
              </button>
            </div>

          </div>

          {/* Card 2: Interactive Balloon Pop Arcade Game (5-span) */}
          <div className={`lg:col-span-5 rounded-3xl p-6 ${accentCardClass} flex flex-col justify-between relative overflow-hidden h-[440px] lg:h-auto`}>
            
            <div className="space-y-3 relative z-10 mb-2">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <Gamepad2 className="w-4.5 h-4.5 text-[#00D9FF]" /> Balloon Burst Game
                </h3>
                <div className="bg-white border-3 border-slate-950 py-1.5 px-3.5 rounded-full text-slate-950 font-mono text-[10px] font-black shadow-[2px_2px_0px_#121212]">
                  Score: {score} Pt
                </div>
              </div>
              <p className="text-[11px] text-slate-700 font-medium">
                Turn on of arcade triggers, then click to pop rising chimes balloons!
              </p>
            </div>

            {/* Game Screen Canvas Box representing virtual screen */}
            <div 
              ref={gameAreaRef}
              id="game-panel-stage"
              className="flex-1 bg-slate-50 border-4 border-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center min-h-[220px]"
            >
              {!balloonPoppingActive ? (
                <div className="text-center p-4 max-w-[240px] space-y-4">
                  <span className="text-4xl animate-bounce block">🎈</span>
                  <p className="font-mono text-[10px] uppercase font-black text-slate-800 tracking-wider">
                    Arcade System Suspended
                  </p>
                  <button
                    id="btn-game-play-unlock"
                    onClick={() => setBalloonPoppingActive(true)}
                    className="px-4 py-2.5 bg-[#00D9FF] hover:bg-[#43E6FF] text-slate-950 font-black rounded-lg text-xs tracking-wider border-3 border-slate-950 shadow-[3px_3px_0px_#121212] uppercase transition-all active:scale-95 cursor-pointer select-none"
                  >
                    Start Balloon Spawner
                  </button>
                </div>
              ) : (
                <>
                  {/* Spawning active balloon elements */}
                  {balloons.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handlePopBalloon(b.id)}
                      className={`absolute pointer-events-auto cursor-crosshair z-10 transition-opacity duration-300 select-none ${
                        b.popped ? "opacity-30 pointer-events-none origin-center scale-150 text-3xl" : "hover:scale-102"
                      }`}
                      style={{
                        left: `${b.left}%`,
                        bottom: `${b.bottom}px`
                      }}
                    >
                      {b.popped ? (
                        <div className="text-center">
                          <span className="text-xl">✨</span>
                          {b.scoreTag && (
                            <span className="absolute top-[-15px] left-[-5px] bg-[#00D9FF] text-slate-950 text-[8px] font-black tracking-widest uppercase px-1 rounded shadow-md font-mono scale-75">
                              +1 PT
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          {/* Circle balloon body */}
                          <div className={`w-10 h-13 rounded-full bg-gradient-to-tr ${b.color} border-2 border-slate-950 relative flex items-center justify-center text-xs shadow-md`}>
                            <span className="text-[10px] filter brightness-150">🎈</span>
                            
                            {/* Reflex glossy line */}
                            <span className="absolute top-1.5 left-2.5 w-1.5 h-3 bg-white/25 rounded-md" />
                          </div>
                          {/* Thread node wrapper */}
                          <div className="w-[1.5px] h-4 bg-slate-950 mt-[-1px]" />
                        </div>
                      )}
                    </div>
                  ))}

                  {balloons.length === 0 && (
                    <p className="text-[10px] font-mono text-slate-700 uppercase font-black tracking-widest text-center animate-pulse">
                      Spawning next balloon waves...
                    </p>
                  )}

                  {/* Disable game trigger */}
                  <button
                    id="btn-game-close"
                    onClick={() => {
                      setBalloonPoppingActive(false);
                      setScore(0);
                    }}
                    className="absolute bottom-2 right-2 p-1.5 px-2.5 bg-white border-2 border-slate-950 font-mono text-[8px] font-bold hover:bg-slate-50 text-slate-800 rounded z-20"
                  >
                    SUSPEND GAME
                  </button>
                </>
              )}
            </div>

            {/* Bottom game guidelines metadata notice */}
            <div className="pt-3 block">
              <p className="text-[9px] text-slate-800 font-mono font-black tracking-wide leading-none text-center">
                * Pop as many as possible. Pop signals trigger nice physical retro pops Sfx!
              </p>
            </div>

          </div>

          {/* Card 3: Micro Synthesizer Keyboard Applet (3-span) */}
          <div className={`lg:col-span-3 rounded-3xl p-6 ${accentCardClass} flex flex-col justify-between relative overflow-hidden`}>
            
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-4.5 h-4.5 text-[#FFD93D]" /> Jam Chimes synth
              </h3>
              <p className="text-[11px] text-slate-700 font-medium">
                Compose custom tunes. Click or tap any key below to play synthesized soundwaves directly.
              </p>
            </div>

            {/* Piano Board vector representation */}
            <div className="my-6 grid grid-cols-4 gap-2">
              {SYNTH_KEYS.map((k) => (
                <button
                  key={k.note}
                  onClick={() => handleSynthKey(k.freq)}
                  className={`relative aspect-[3/4] rounded-xl flex flex-col justify-between p-2 pb-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-left border-2 border-slate-950 cursor-pointer shadow-md select-none ${k.color} hover:brightness-110 active:brightness-95`}
                >
                  {/* Stylized speaker hole */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950/20" />
                  
                  <div>
                    <span className="block font-sans text-xs font-black tracking-tight uppercase leading-none">
                      {k.note}
                    </span>
                    <span className="block font-mono text-[8px] opacity-75 mt-0.5 font-black">
                      {k.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] text-slate-700 font-mono font-black leading-tight">
                Synthesizer mapped directly via mathematical sine oscillation frequencies. No lag.
              </p>
              
              <div 
                onClick={onPopConfetti}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border-3 border-slate-950 flex items-center justify-between cursor-pointer group shadow-[3px_3px_0px_#121212]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl group-hover:scale-110 transition-transform">🥳</span>
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] font-mono text-slate-600 uppercase font-bold">PARTY CLAPPER:</span>
                    <span className="text-[10px] text-slate-950 font-black">Launch Confetti Chimes</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] text-xs flex items-center justify-center font-bold">
                  💥
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
