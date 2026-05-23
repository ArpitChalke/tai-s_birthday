import React, { useState } from "react";
import { Gift, Lock, Sparkles, Smile, CheckCircle, Ticket } from "lucide-react";
import { GiftItem } from "../types";
import { playConfettiSfx, playPopSfx } from "../utils/audio";

interface GiftRevealerProps {
  name: string;
  gifts: GiftItem[];
  themeColor: string;
  onScratchGift: (id: string) => void;
}

export default function GiftRevealer({ name, gifts, themeColor, onScratchGift }: GiftRevealerProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleRevealScratch = (id: string, alreadyRevealed: boolean) => {
    if (alreadyRevealed) return;
    playConfettiSfx();
    onScratchGift(id);
  };

  const accentColorText = 
    themeColor === "rockstar-pink" ? "text-[#FF4FA3]" :
    themeColor === "retro-purple" ? "text-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "text-[#00D9FF]" :
    themeColor === "sweet-peach" ? "text-[#FF4FA3]" :
    "text-[#FFD93D]";

  const glowAccent = 
    themeColor === "rockstar-pink" ? "hover:border-[#FF4FA3] hover:shadow-[6px_6px_0px_rgba(18,18,18,1)]" :
    themeColor === "retro-purple" ? "hover:border-[#6A00F4] hover:shadow-[6px_6px_0px_rgba(18,18,18,1)]" :
    themeColor === "cyber-cyan" ? "hover:border-[#00D9FF] hover:shadow-[6px_6px_0px_rgba(18,18,18,1)]" :
    themeColor === "sweet-peach" ? "hover:border-[#FF4FA3] hover:shadow-[6px_6px_0px_rgba(18,18,18,1)] animate-pulse" :
    "hover:border-[#FFD93D] hover:shadow-[6px_6px_0px_rgba(18,18,18,1)]";

  return (
    <section
      id="gifts"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent border-b-4 border-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-20">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_#121212]">
            <Gift className="w-3.5 h-3.5 text-[#FF4FA3] animate-bounce" /> Mystery Backstage Passes
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans">
            Scratch & Win Surprises!
          </h2>
          <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-850 font-medium max-w-sm mx-auto">
            We packed a set of virtual backstage passes for {name}. Click on the metallic gift boxes below to peel off the wrap and reveal your surprise ticket!
          </p>
        </div>

        {/* Gift grid cards layout with sticker designs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 items-stretch select-none">
          {gifts.map((g) => (
            <div
              key={g.id}
              onClick={() => handleRevealScratch(g.id, g.unveiled)}
              onMouseEnter={() => setHoveredCard(g.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`bg-white border-4 border-slate-950 rounded-2xl p-5 shadow-[3px_3px_0px_rgba(18,18,18,1)] relative min-h-[220px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${glowAccent} ${
                g.unveiled ? "scale-100" : "hover:scale-[1.03] active:scale-98"
              }`}
            >
              
              {/* Scratch metallic overlay wrap */}
              {!g.unveiled ? (
                <div className="absolute inset-2 p-2 rounded-xl bg-gradient-to-br from-[#FFD93D] via-yellow-200 to-[#FFD93D] border-3 border-slate-950 flex flex-col items-center justify-center text-center z-10 shadow-[2px_2px_0px_#121212] group">
                  
                  {/* Comic/scribble polka dots on gold foil */}
                  <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />

                  <Ticket className="w-8 h-8 text-slate-900 animate-pulse relative z-10" />
                  
                  <span className="block font-sans font-black text-slate-950 text-[10px] uppercase tracking-widest mt-2 relative z-10 leading-none">
                    TAP TO SCRATCH!
                  </span>

                  <p className="text-[8px] font-mono font-black text-slate-800 uppercase tracking-wider mt-1 relative z-10 opacity-75">
                    Metallic Scratch foil
                  </p>
                  
                  {/* Little star pin decorations */}
                  <span className="absolute top-1.5 right-1.5 text-xs">✨</span>
                  <span className="absolute bottom-1.5 left-1.5 text-xs opacity-60">🎫</span>
                </div>
              ) : (
                // Revealed scratch animation sparkles
                <div className="absolute top-2 right-2 animate-ping opacity-60 z-10 text-xs">
                  ✨
                </div>
              )}

              {/* Revealed Content Layout */}
              <div className="space-y-4 pt-1 flex-1 flex flex-col justify-between">
                
                {/* Header row stats */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    🎫 VIRTUAL TICKETING
                  </span>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ml-auto shadow-[1.5px_1.5px_0px_#121212] border-2 border-slate-950 font-black ${g.colorClass} text-white`}>
                    {g.sticker}
                  </span>
                </div>

                {/* Gift description details */}
                <div className="space-y-2 flex-1 flex flex-col justify-center">
                  <h4 className="font-black text-slate-950 text-sm uppercase tracking-tight leading-tight flex items-center gap-1.5 font-sans">
                    {g.title}
                  </h4>
                  <p className="text-[11px] text-slate-700 leading-relaxed font-sans font-extrabold">
                    {g.description}
                  </p>
                </div>

                {/* Bottom ticket watermark */}
                <div className="border-t-2 border-slate-100 pt-3 flex items-center justify-between">
                  <span className="font-mono text-[8.5px] uppercase text-emerald-900 font-extrabold bg-emerald-50 border-2 border-slate-950 py-0.5 px-2 rounded-lg flex items-center gap-1 shadow-[1.5px_1.5px_0px_#121212]">
                    <CheckCircle className="w-3 h-3 text-emerald-700" /> VERIFIED SURPRISE
                  </span>
                  
                  <div className="text-[9px] text-slate-600 font-mono font-black">
                    ID: #{g.id}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Footer info labels */}
        <div className="text-center pt-2">
          <p className="text-[10px] font-mono text-slate-700 font-black uppercase tracking-widest leading-none">
            * Fully client-side micro coupons. Click to claim they are verified instantly!
          </p>
        </div>

      </div>
    </section>
  );
}
