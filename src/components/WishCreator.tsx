import React, { useState } from "react";
import { MessageSquare, Heart, RefreshCw, Send, Sparkles, Smile, User, ArrowRight, HelpCircle } from "lucide-react";
import { WishItem } from "../types";
import { RELATIONSHIP_PRESETS, VIBE_PRESETS, CONGRATS_EMOJIS } from "../data";
import { playPopSfx, playConfettiSfx } from "../utils/audio";

interface WishCreatorProps {
  name: string; // Birthday person's name
  wishes: WishItem[];
  themeColor: string;
  onAddWish: (newWish: WishItem) => void;
}

export default function WishCreator({ name, wishes, themeColor, onAddWish }: WishCreatorProps) {
  // Manual / Generator form inputs
  const [senderName, setSenderName] = useState("");
  const [relationship, setRelationship] = useState("Best Friend");
  const [vibe, setVibe] = useState("rockstar");
  const [additionalPrompt, setAdditionalPrompt] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState("🎈");

  // Loading and helper state
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generationTip, setGenerationTip] = useState("");
  const [likesState, setLikesState] = useState<Record<string, number>>({});

  // Trigger like count
  const handleLikeWish = (id: string) => {
    playPopSfx();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // AI Generation fetch trigger
  const handleGenerateAIWish = async () => {
    if (!senderName.trim()) {
      setErrorMessage("Please enter your name first so the AI can sign your custom card!");
      return;
    }
    
    setErrorMessage("");
    setIsGenerating(true);

    const tips = [
      "Strumming retro guitar strings...",
      "Asking the constellation stars for ideas...",
      "Tapping celebratory synthesizer chimes...",
      "Shuffling cozy adjectives...",
      "Drafting a friendly roast..."
    ];
    let tipIdx = 0;
    setGenerationTip(tips[0]);
    const tipInterval = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      setGenerationTip(tips[tipIdx]);
    }, 1500);

    try {
      const response = await fetch("/api/generate-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          sender: senderName,
          relationship: relationship,
          vibe: vibe,
          additionalPrompt: additionalPrompt
        }),
      });

      const data = await response.json();
      clearInterval(tipInterval);

      if (data.error) {
        throw new Error(data.error);
      }

      setDraftMessage(data.text);
      
      // Auto assign suitable emojis based on selected vibe style
      if (vibe === "rockstar") setChosenEmoji("🎸");
      else if (vibe === "cozy") setChosenEmoji("💖");
      else if (vibe === "funny") setChosenEmoji("🍕");
      else setChosenEmoji("🌟");

    } catch (err: any) {
      clearInterval(tipInterval);
      console.error(err);
      setErrorMessage("Service busy. Here is a sweet template layout for you to finalize!");
      
      // Fallback draft layout
      setDraftMessage(`HAPPY BIRTHDAY ${name.toUpperCase()}! You are the absolute absolute coolest! Thank you for sharing your brilliant energy with us. May this new year overflow with epic guitar jams and happiness in spades! - Love, ${senderName}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Append new wish trigger
  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      setErrorMessage("Please type your name before posting!");
      return;
    }
    if (!draftMessage.trim()) {
      setErrorMessage("Please write a message or use the AI Generator to co-draft one!");
      return;
    }

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      sender: senderName,
      relationship: relationship,
      vibe: vibe === "rockstar" ? "Rockstar Hype" : vibe === "cozy" ? "Cozy & Warm" : vibe === "funny" ? "Playful Roast" : "Constellation Space",
      message: draftMessage,
      emoji: chosenEmoji,
      likes: 0,
      timestamp: "Just now"
    };

    onAddWish(newWish);
    playConfettiSfx();
    
    // Clear draft and forms
    setDraftMessage("");
    setAdditionalPrompt("");
    setSenderName("");
  };

  // Style helpers
  const accentCardClass = 
    themeColor === "rockstar-pink" ? "border-slate-950 shadow-[4px_4px_0px_#FF4FA3]" :
    themeColor === "retro-purple" ? "border-slate-950 shadow-[4px_4px_0px_#6A00F4]" :
    themeColor === "cyber-cyan" ? "border-slate-950 shadow-[4px_4px_0px_#00D9FF]" :
    themeColor === "sweet-peach" ? "border-slate-950 shadow-[4px_4px_0px_#FF4FA3]" :
    "border-slate-950 shadow-[4px_4px_0px_#FFD93D]";

  const focusRingClass = 
    themeColor === "rockstar-pink" ? "focus:border-[#FF4FA3]" :
    themeColor === "retro-purple" ? "focus:border-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "focus:border-[#00D9FF]" :
    themeColor === "sweet-peach" ? "focus:border-[#FF4FA3]" :
    "focus:border-[#FFD93D]";

  const btnBgClass = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3] text-white hover:bg-[#FF4FA3]/90 shadow-[4px_4px_0px_#121212]" :
    themeColor === "retro-purple" ? "bg-[#6A00F4] text-white hover:bg-[#6A00F4]/90 shadow-[4px_4px_0px_#121212]" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF] text-slate-950 hover:bg-[#00D9FF]/90 shadow-[4px_4px_0px_#121212]" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3] text-slate-950 hover:bg-[#FF4FA3]/90 shadow-[4px_4px_0px_#121212]" :
    "bg-[#FFD93D] text-slate-950 hover:bg-[#FFD93D]/90 shadow-[4px_4px_0px_#121212]";

  const bubbleActiveColor = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3] border-slate-950 text-white shadow-[2px_2px_0px_#121212]" :
    themeColor === "retro-purple" ? "bg-[#6A00F4] border-slate-950 text-white shadow-[2px_2px_0px_#121212]" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF] border-slate-950 text-slate-950 shadow-[2px_2px_0px_#121212] font-black" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3] border-slate-950 text-slate-950 shadow-[2px_2px_0px_#121212] font-black" :
    "bg-[#FFD93D] border-slate-950 text-slate-950 shadow-[2px_2px_0px_#121212] font-black";

  return (
    <section
      id="wishes"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-20">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_#121212]">
            <MessageSquare className="w-3.5 h-3.5 text-[#FF4FA3]" /> Celebratory wishing wall
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans">
            AI Wishing Assistant & Wall
          </h2>
          <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-850 font-medium max-w-md mx-auto">
            Harness full-stack Gemini intelligence to write a jaw-dropping, nostalgic, or hilarious greeting card, then glue it onto {name}'s wishing wall!
          </p>
        </div>

        {/* 2-Column Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
          
          {/* Left Side: Generative Greeting Crafting Workshop (5-span) */}
          <div className="lg:col-span-5 bg-white border-4 border-slate-950 rounded-3xl p-6 shadow-[8px_8px_0px_rgba(18,18,18,1)] space-y-6 relative">
            
            {/* AI Magic header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-950">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                <h3 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider">
                  AI Co-Writer Lounge
                </h3>
              </div>
              <span className="text-[9px] font-mono font-bold bg-slate-950 text-emerald-400 py-1 px-2.5 rounded-md uppercase">
                ⚡ Powered by Gemini API
              </span>
            </div>

            {/* Form Fields config */}
            <div className="space-y-4">
              
              {/* Sender name */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  1. Who is sending this?
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-655" />
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name (e.g. Chloe, Tyler)"
                    className={`w-full bg-slate-50 border-3 border-slate-950 rounded-xl pl-10 pr-3 py-2 text-sm text-slate-950 placeholder-slate-550 font-bold focus:outline-none transition-all ${focusRingClass}`}
                  />
                </div>
              </div>

              {/* Relationship Presets */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                    2. Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className={`w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-2 py-2 text-xs text-slate-950 font-bold focus:outline-none transition-all ${focusRingClass}`}
                  >
                    {RELATIONSHIP_PRESETS.map((p) => (
                      <option key={p} className="bg-white text-slate-950 font-semibold" value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                    3. Choice of Emoji
                  </label>
                  <div className="grid grid-cols-4 gap-1 bg-slate-50 border-3 border-slate-950 rounded-xl px-1 py-1 flex-1">
                    {CONGRATS_EMOJIS.slice(0, 4).map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setChosenEmoji(em)}
                        className={`py-1.5 rounded-lg text-sm hover:bg-slate-20/10 transition-all cursor-pointer ${
                          chosenEmoji === em ? "bg-white border-2 border-slate-950 shadow-[1px_1px_0px_#121212]" : ""
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Choice of Vibe */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-2">
                  4. Set the Vibe / Tone style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {VIBE_PRESETS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVibe(v.id)}
                      className={`py-2 px-3 rounded-xl border-3 text-[11px] font-black tracking-wide uppercase transition-all cursor-pointer ${
                        vibe === v.id
                          ? bubbleActiveColor
                          : "bg-white text-slate-800 border-slate-950 hover:bg-slate-50 shadow-[1px_1px_0px_#121212]"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional facts context */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  5. Optional Facts / Cute memories (Context)
                </label>
                <textarea
                  value={additionalPrompt}
                  onChange={(e) => setAdditionalPrompt(e.target.value)}
                  placeholder="e.g. loves guitar, sleeps past noon, hates chocolate, rock-star stagedive memory!"
                  rows={2}
                  className={`w-full bg-slate-50 border-3 border-slate-950 rounded-xl p-3 text-xs text-slate-950 placeholder-slate-500 font-bold focus:outline-none transition-all ${focusRingClass} resize-none`}
                />
              </div>

            </div>

            {/* Action launcher triggers */}
            <div className="space-y-4">
              <button
                id="btn-wish-generate-ai"
                onClick={handleGenerateAIWish}
                disabled={isGenerating}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider border-3 border-slate-950 cursor-pointer flex items-center justify-center gap-2 duration-200 transition-all ${btnBgClass} ${
                  isGenerating ? "opacity-60 cursor-not-allowed animate-pulse" : ""
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{generationTip || "Drafting notes..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5" />
                    <span>Generate custom Gemini Wish! ✨</span>
                  </>
                )}
              </button>

              {/* Draft Output Box */}
              {(draftMessage || isGenerating) && (
                <div className="space-y-3 pt-4 border-t-2 border-slate-955 animate-fade-in">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700">
                    Review Card Content before posting:
                  </label>
                  
                  <textarea
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    rows={4}
                    placeholder="Wishes content draft goes here..."
                    className={`w-full bg-slate-50 border-3 border-slate-950 rounded-xl p-3 text-xs text-slate-950 font-bold focus:outline-none transition-all ${focusRingClass} resize-none leading-relaxed`}
                  />

                  {draftMessage && (
                    <button
                      id="btn-wish-post-it"
                      onClick={handleSubmitWish}
                      className="w-full py-2.5 bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white border-3 border-slate-950 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-white" />
                      Post To Wishing Wall! 💌
                    </button>
                  )}
                </div>
              )}

              {/* Status errors feedback */}
              {errorMessage && (
                <div className="p-3 bg-red-100 border-3 border-red-950 text-red-950 text-xs rounded-xl flex items-center gap-2 font-bold shadow-[2px_2px_0px_#121212]">
                  <Smile className="w-4 h-4 text-red-700" />
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Double-layered interactive grid wishing wall (7-span) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              🗣️ Public Congratulations:
            </h3>

            {/* Wishes Scroll wall Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[640px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-950">
              
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-white border-4 border-slate-950 rounded-3xl p-4.5 flex flex-col justify-between space-y-4 hover:shadow-[6px_6px_0px_rgba(18,18,18,1)] shadow-[3px_3px_0px_rgba(18,18,18,1)] transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Glassmorphism top floating bubble decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-slate-100/40 pointer-events-none" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#FFD93D] text-slate-950 flex items-center justify-center text-sm font-black border-2 border-slate-950 font-sans select-none shadow-[1.5px_1.5px_0px_#121212]">
                          {w.sender.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="block font-sans text-xs font-black text-slate-950 uppercase leading-none">
                            {w.sender}
                          </span>
                          <span className="block text-[8.5px] text-[#6A00F4] font-mono tracking-wider mt-1 uppercase font-black">
                            {w.relationship}
                          </span>
                        </div>
                      </div>
                      
                      {/* Floating stamp sticker */}
                      <span className="text-xl inline-block bg-white border-2 border-slate-950 p-1 rounded-xl shadow-[2px_2px_0px_rgba(18,18,18,1)] w-8 h-8 text-center select-none animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                        {w.emoji}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 leading-relaxed font-bold font-sans italic pt-1 pr-1">
                      "{w.message}"
                    </p>
                  </div>

                  {/* Reaction Likes box footer */}
                  <div className="flex items-center justify-between border-t-2 border-slate-100 pt-3 mt-1">
                    <span className="font-mono text-[8px] font-black text-slate-600 tracking-wider">
                      📅 TIMESTAMP: {w.timestamp}
                    </span>

                    <button
                      onClick={() => handleLikeWish(w.id)}
                      className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-black font-mono bg-white border-2 border-slate-950 px-2.5 py-1 rounded-xl transition-all cursor-pointer shadow-[2px_2px_0px_#121212] active:translate-y-0.5 active:shadow-none"
                    >
                      <Heart className={`w-3 h-3 ${likesState[w.id] ? "fill-current" : ""}`} />
                      <span>{w.likes + (likesState[w.id] || 0)}</span>
                    </button>
                  </div>

                </div>
              ))}

              {wishes.length === 0 && (
                <div className="col-span-2 text-center py-16 bg-white border-4 border-dashed border-slate-950 rounded-3xl shadow-[4px_4px_0px_#121212] max-w-sm mx-auto p-6">
                  <span className="text-4xl">🕊️</span>
                  <p className="font-mono text-xs text-slate-900 font-extrabold uppercase mt-4 tracking-wider">
                    Wishing Wall is empty!
                  </p>
                  <p className="text-[10px] text-slate-650 font-bold mt-1">
                    Be the very first one to generate a custom Gemini card and pin it to the wall!
                  </p>
                </div>
              )}

            </div>

            {/* Note banner footnote */}
            <div className="text-center pt-2">
              <p className="text-[9.5px] text-slate-700 font-mono font-black uppercase tracking-widest animate-pulse">
                * Real-time virtual wishing board. Cards persist in active local application state!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
