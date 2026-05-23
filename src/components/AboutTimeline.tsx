import React from "react";
import { Milestone, Flag, Calendar, Heart, Award, Flame } from "lucide-react";
import { MemoryItem } from "../types";

interface AboutTimelineProps {
  memories: MemoryItem[];
  themeColor: string;
}

export default function AboutTimeline({ memories, themeColor }: AboutTimelineProps) {
  // Take first 3-4 memories as milestone timeline markers
  const timelineMilestones = memories.length > 0 ? memories.slice(0, 4) : [];

  // Icon selector based on items to add design randomness
  const getMilestoneIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Flame className="w-5 h-5 text-red-500 animate-pulse" />;
      case 1:
        return <Award className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />;
      default:
        return <Flag className="w-5 h-5 text-cyan-400" />;
    }
  };

  const lineBg = 
    themeColor === "rockstar-pink" ? "bg-pink-500/20" :
    themeColor === "retro-purple" ? "bg-purple-500/20" :
    themeColor === "cyber-cyan" ? "bg-cyan-500/20" :
    themeColor === "sweet-peach" ? "bg-rose-400/20" :
    "bg-yellow-500/20";

  const bulletBg = 
    themeColor === "rockstar-pink" ? "bg-pink-500 shadow-pink-500/40" :
    themeColor === "retro-purple" ? "bg-purple-600 shadow-purple-600/40" :
    themeColor === "cyber-cyan" ? "bg-cyan-500 shadow-cyan-500/40" :
    themeColor === "sweet-peach" ? "bg-rose-400 shadow-rose-400/40" :
    "bg-yellow-500 shadow-yellow-500/40";

  const headingAccent = 
    themeColor === "rockstar-pink" ? "text-pink-500 border-pink-500/20" :
    themeColor === "retro-purple" ? "text-purple-500 border-purple-500/20" :
    themeColor === "cyber-cyan" ? "text-cyan-400 border-cyan-500/20" :
    themeColor === "sweet-peach" ? "text-rose-400 border-rose-400/20" :
    "text-yellow-400 border-yellow-500/20";

  return (
    <section
      id="story"
      className="py-20 px-4 sm:px-6 lg:px-8 relative bg-transparent border-t-4 border-b-4 border-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Module Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_0px_rgba(18,18,18,1)]">
            <Milestone className="w-4 h-4 text-[#FF4FA3]" /> Story of Orbiting the Sun
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans drop-shadow-sm">
            The Celebration Timeline
          </h2>
          <div className="w-20 h-2 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-800 font-medium max-w-md mx-auto">
            Charting the milestones, random jams, late-night projects, and golden memories that make up an extraordinarily colorful universe.
          </p>
        </div>

        {/* Timeline representation block */}
        <div className="relative pt-6">
          
          {/* Vertical axis line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[4px] bg-slate-950 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineMilestones.map((item, index) => {
              const isEven = index % 2 === 0;

              // High-contrast neon tag styling
              const tagColors = [
                "bg-[#FF4FA3] text-white",
                "bg-[#6A00F4] text-white",
                "bg-[#00D9FF] text-slate-950",
                "bg-[#FFD93D] text-slate-950"
              ];
              const activeTagColor = tagColors[index % tagColors.length];

              const shadowColors = [
                "shadow-[8px_8px_0px_0px_#6A00F4]",
                "shadow-[8px_8px_0px_0px_#FF4FA3]",
                "shadow-[8px_8px_0px_0px_#FFD93D]",
                "shadow-[8px_8px_0px_0px_#00D9FF]"
              ];
              const activeShadow = shadowColors[index % shadowColors.length];

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Outer spacer column for grid centering in desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Bullet center timeline node point */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full border-4 border-slate-950 flex items-center justify-center transform -translate-x-[20px] z-20 overflow-hidden text-white cursor-pointer select-none transition-transform hover:scale-110 duration-200">
                    <div className={`w-full h-full flex items-center justify-center ${bulletBg} border-none`}>
                      {getMilestoneIcon(index)}
                    </div>
                  </div>

                  {/* Bubble card column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    
                    {/* Tilt graphic Polaroid style note block */}
                    <div className={`bg-white border-4 border-slate-950 rounded-3xl p-5 transform hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden ${activeShadow}`}>
                      
                      {/* Left color splash accent line with neo brutal stripes */}
                      <div className="absolute top-0 left-0 w-2 h-full bg-slate-950" />

                      {/* Header metadata row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-slate-850" />
                          <span>{item.date}</span>
                        </div>
                        <span className={`text-[9px] font-black font-mono tracking-widest uppercase border-2 border-slate-950 px-2 py-0.5 rounded-full ${activeTagColor}`}>
                          {item.tag}
                        </span>
                      </div>

                      {/* Cover Photo */}
                      <div className="w-full h-36 rounded-2xl overflow-hidden border-3 border-slate-950 relative mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-505 filter brightness-100"
                        />
                      </div>

                      {/* Milestone Text */}
                      <h4 className="font-sans font-black text-base text-slate-950 uppercase tracking-tight mb-2 group-hover:text-[#6A00F4] transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {item.description}
                      </p>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Epic Scrapbook storytelling quotes label */}
        <div className="p-6 rounded-3xl border-4 border-dashed border-slate-950 bg-white text-center space-y-3 relative overflow-hidden max-w-xl mx-auto shadow-[6px_6px_0px_0px_#121212] select-none">
          <span className="text-4xl absolute left-2 top-2 opacity-15">✨</span>
          <span className="text-4xl absolute right-2 bottom-2 opacity-15">🎸</span>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#FF4FA3] font-extrabold">
            - SCRAPBOOK ESSENCE -
          </p>
          <q className="text-sm italic text-slate-900 mt-2 block font-medium leading-relaxed">
            Time is measured not in the count of days, but in the riffs we hear, the candles we melt, and the chaotic memories that make us cry with laughter.
          </q>
        </div>

      </div>
    </section>
  );
}
