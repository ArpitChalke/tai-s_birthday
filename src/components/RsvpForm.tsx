import React, { useState } from "react";
import { Smile, Send, Mail, CheckCircle2, Flame, Heart, Sparkles, MapPin } from "lucide-react";
import { playConfettiSfx, playPopSfx } from "../utils/audio";

interface RsvpFormProps {
  name: string; // Birthday host
  themeColor: string;
}

export default function RsvpForm({ name, themeColor }: RsvpFormProps) {
  // states
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpNote, setRsvpNote] = useState("");
  const [choice, setChoice] = useState("stagedive");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setIsSubmitting(true);
    playPopSfx();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playConfettiSfx();
    }, 1200);
  };

  const accentBorderClass = 
    themeColor === "rockstar-pink" ? "border-slate-950 shadow-[6px_6px_0px_#FF4FA3]" :
    themeColor === "retro-purple" ? "border-slate-950 shadow-[6px_6px_0px_#6A00F4]" :
    themeColor === "cyber-cyan" ? "border-slate-950 shadow-[6px_6px_0px_#00D9FF]" :
    themeColor === "sweet-peach" ? "border-slate-950 shadow-[6px_6px_0px_#FF4FA3]" :
    "border-slate-950 shadow-[6px_6px_0px_#FFD93D]";

  const focusInputClass = 
    themeColor === "rockstar-pink" ? "focus:border-[#FF4FA3]" :
    themeColor === "retro-purple" ? "focus:border-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "focus:border-[#00D9FF]" :
    themeColor === "sweet-peach" ? "focus:border-[#FF4FA3]" :
    "focus:border-[#FFD93D]";

  const btnColorClass = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white" :
    themeColor === "retro-purple" ? "bg-[#6A00F4] hover:bg-[#6A00F4]/90 text-white" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF] text-slate-950 hover:bg-[#00D9FF]/90 font-black" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3] text-slate-950 hover:bg-[#FF4FA3]/90 font-black" :
    "bg-[#FFD93D] text-slate-950 hover:bg-[#FFD93D]/90 font-black";

  return (
    <section
      id="rsvp"
      className="pt-20 bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-20 pb-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_#121212]">
            <Mail className="w-3.5 h-3.5 text-[#FF4FA3]" /> Virtual Attendance Sheet
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans">
            RSVP and Send a Note
          </h2>
          <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-850 font-medium max-w-sm mx-auto">
            Are you joining the virtual concert bash? Leave your status and a quick congrats note for {name}!
          </p>
        </div>

        {/* 2-Column Split: Form and Map directions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between max-w-5xl mx-auto pt-4">
          
          {/* Column 1: Interactive scrapbook RSVP layout (7-span) */}
          <div className={`lg:col-span-7 bg-white border-4 border-slate-950 rounded-3xl p-6 sm:p-8 ${accentBorderClass} relative`}>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Jack, Samantha"
                      className={`w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-4 py-2.5 text-sm text-slate-950 placeholder-slate-500 font-bold focus:outline-none transition-all ${focusInputClass}`}
                    />
                  </div>

                  {/* Note block */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900">
                      Quick Greeting Note
                    </label>
                    <input
                      type="text"
                      value={rsvpNote}
                      onChange={(e) => setRsvpNote(e.target.value)}
                      placeholder="e.g. See you there rockstar!"
                      className={`w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-4 py-2.5 text-sm text-slate-950 placeholder-slate-550 font-bold focus:outline-none transition-all ${focusInputClass}`}
                    />
                  </div>
                </div>

                {/* Option selector checklist */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900">
                    Your Attendance Option:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "stagedive", label: "🤘 Heck yeah, Stage-dive!", desc: "I am ready to rock." },
                      { id: "wishes", label: "🍕 Send Pizza & Wishes", desc: "Joining online!" },
                      { id: "lazy", label: "🍿 Just Lurking Lazy", desc: "Silently watching!" }
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setChoice(opt.id)}
                        className={`border-3 rounded-2xl p-3 aspect-[3/2] flex flex-col justify-between cursor-pointer select-none transition-all duration-200 ${
                          choice === opt.id
                            ? "bg-[#FFD93D] border-slate-950 text-slate-950 scale-102 shadow-[3px_3px_0px_#121212] font-semibold"
                            : "bg-white text-slate-700 border-slate-950 shadow-[1.5px_1.5px_0px_#121212] hover:bg-slate-50"
                        }`}
                      >
                        <span className="block font-sans text-xs font-black uppercase tracking-tight leading-tight">
                          {opt.label}
                        </span>
                        <span className="block text-[9px] font-mono font-black opacity-75 leading-tight">
                          {opt.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button actions */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl border-3 border-slate-950 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 select-none ${btnColorClass}`}
                >
                  {isSubmitting ? (
                    <span>Registering your ticket...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit RSVP Ticket! 💥</span>
                    </>
                  )}
                </button>

              </form>
            ) : (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-3 border-slate-950 text-slate-950 text-2xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_rgba(18,18,18,1)]">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-sm text-slate-950 uppercase tracking-wider font-sans leading-none">
                    RSVP TICKET REGISTERED!
                  </h3>
                  <p className="text-xs text-slate-800 font-mono font-bold mt-1.5">
                    Your attendance: <span className="text-slate-950 font-black uppercase bg-[#FFD93D] px-1 py-0.5 border border-slate-950 rounded-md">{choice === "stagedive" ? "Stage-dive" : choice === "wishes" ? "Send Pizza" : "Lazy Lurker"}</span>
                  </p>
                </div>
                
                <p className="text-xs text-slate-800 font-bold max-w-sm mx-auto leading-relaxed">
                  Thanks, <span className="font-extrabold text-[#FF4FA3]">{rsvpName}</span>! Your attendance checklist has been registered. Get ready for an absolute blast of an hour under the lasers!
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-950 border-3 border-slate-950 rounded-xl text-[10px] font-black tracking-wider uppercase shadow-[3px_3px_0px_#121212] active:translate-y-0.5 active:shadow-none select-none cursor-pointer duration-100"
                >
                  Submit another card
                </button>
              </div>
            )}

          </div>

          {/* Column 2: Creative concert details directions (5-span) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            
            <div className="bg-white border-4 border-slate-950 p-5 rounded-3xl relative overflow-hidden select-none space-y-4 shadow-[4px_4px_0px_#121212] pr-4">
              <span className="text-5xl absolute right-2 bottom-2 opacity-10">🎫</span>
              <h4 className="font-black text-xs tracking-wider text-slate-950 uppercase flex items-center gap-1.5 pb-2 border-b-2 border-slate-950">
                <Flame className="w-4.5 h-4.5 text-red-500" /> Concert Details:
              </h4>

              <div className="space-y-4 font-sans pt-1">
                
                {/* Item 1 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 border-2 border-slate-950 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#121212]">
                    <MapPin className="w-4 h-4 text-slate-950" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="block text-[9px] font-mono text-slate-700 uppercase font-black leading-none">WHERE?</span>
                    <span className="block text-xs text-slate-950 font-black">The Great Neon Backstage Lounge</span>
                    <span className="block text-[10px] text-slate-705 leading-tight font-bold">Virtual Cloud Run Web, Suite 3000</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 border-2 border-slate-950 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#121212]">
                    <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="block text-[9px] font-mono text-slate-700 uppercase font-black leading-none">DRESSCODE?</span>
                    <span className="block text-xs text-slate-950 font-black">Glitter Rockstar Custom Sticker Caps</span>
                    <span className="block text-[10px] text-slate-705 leading-tight font-bold">Comfortable for massive headbanging!</span>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-[10px] text-slate-600 font-mono font-black leading-relaxed pl-1 uppercase tracking-wider">
              * Note: The digital wishing deck gathers automatically and streams updates live inside local context state!
            </p>
          </div>

        </div>

      </div>

      {/* Modern, Aesthetic Primary Footer */}
      <footer className="border-t-4 border-slate-950 bg-white py-12 text-center text-slate-800 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b-2 border-slate-950 pb-8">
            <div className="text-left">
              <span className="font-extrabold text-lg sm:text-2xl text-slate-950 tracking-tight font-sans uppercase block">
                #{name}'s Birthday
              </span>
              <p className="text-[9px] uppercase font-mono tracking-wider text-slate-600 font-bold mt-1">
                Playful celebration landing page portfolio
              </p>
            </div>

            {/* Simulated social links */}
            <div className="flex items-center gap-3">
              {["INSTAGRAM", "TIKTOK", "SPOTIFY", "BACKSTAGE"].map((sc) => (
                <span
                  key={sc}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border-2 border-slate-950 text-slate-950 rounded-xl text-[9px] font-black tracking-widest transition-all hover:scale-103 cursor-pointer shadow-[2px_2px_0px_#121212]"
                >
                  {sc}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-mono text-slate-800 font-black flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
            <span>& AI Studio. All rights reserved. © {new Date().getFullYear()}</span>
          </p>

        </div>
      </footer>
    </section>
  );
}
