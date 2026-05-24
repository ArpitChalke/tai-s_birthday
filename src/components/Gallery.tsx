import React, { useState } from "react";
import { Image, Filter, Heart, ChevronRight, X, Sparkles, MessageCircle } from "lucide-react";
import { MemoryItem } from "../types";
import { playPopSfx } from "../utils/audio";

interface GalleryProps {
  memories: MemoryItem[];
  searchValue: string;
  themeColor: string;
}

const CATEGORIES = ["All", "Milestones", "Party", "Travel", "Friends", "Festival", "Birthday"];

export default function Gallery({ memories, searchValue, themeColor }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [likesState, setLikesState] = useState<Record<string, number>>({});

  const handleLikeMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSfx();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Filter memories based on Category Select and search text passed from parent navbar
  const filteredMemories = memories.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = 
      searchValue.trim() === "" ||
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const accentColorClass = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3]" :
    themeColor === "retro-purple" ? "bg-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF]" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3]" :
    "bg-[#FFD93D]";

  const outlineAccent = 
    themeColor === "rockstar-pink" ? "border-[#FF4FA3] text-[#FF4FA3]" :
    themeColor === "retro-purple" ? "border-[#6A00F4] text-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "border-[#00D9FF] text-[#00D9FF]" :
    themeColor === "sweet-peach" ? "border-[#FF4FA3]" :
    "border-[#FFD93D]";

  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-b-4 border-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-20">
        
        {/* Module Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_#121212]">
            <Image className="w-3.5 h-3.5 text-[#FF4FA3]" /> Celebratory Polaroid Deck
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans">
            Birthday Memory Wall
          </h2>
          <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-850 font-medium max-w-md mx-auto">
            Browse through snapshot polaroids documenting key moments, crazy travel jams, and warm friendships.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const activeClassShadow = 
              themeColor === "rockstar-pink" ? "shadow-[3px_3px_0px_#FF4FA3]" :
              themeColor === "retro-purple" ? "shadow-[3px_3px_0px_#6A00F4]" :
              themeColor === "cyber-cyan" ? "shadow-[3px_3px_0px_#00D9FF]" :
              themeColor === "sweet-peach" ? "shadow-[3px_3px_0px_#FF4FA3]" :
              "shadow-[3px_3px_0px_#FFD93D]";

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-3 border-slate-950 transition-all select-none cursor-pointer ${
                  isSelected
                    ? `${accentColorClass} text-white ${activeClassShadow} -translate-y-0.5`
                    : "bg-white text-slate-800 hover:text-slate-950 shadow-[1.5px_1.5px_0px_#121212] hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Filter Results and Grid */}
        <div>
          {filteredMemories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 items-stretch">
              {filteredMemories.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActiveMemory(m)}
                  className="bg-white border-4 border-slate-950 hover:shadow-[10px_10px_0px_0px_rgba(18,18,18,1)] transition-all duration-350 rounded-3xl p-4 select-none cursor-zoom-in transform hover:-translate-y-1.5 group flex flex-col justify-between h-full shadow-[5px_5px_0px_0px_rgba(18,18,18,1)]"
                >
                  {/* Polaroid Frame Container */}
                  <div className="w-full aspect-[4/3] rounded-2xl border-3 border-slate-950 overflow-hidden relative bg-slate-900">
                    <img
                      src={m.image}
                      alt={m.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-100"
                    />

                    {/* Cyber overlay textures */}
                    <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(0,0,0,1)_95%)] bg-[size:100%_10px] pointer-events-none" />

                    {/* Category Label watermark */}
                    <span className="absolute top-2.5 left-2.5 bg-slate-950 text-white font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-md border-2 border-white z-10 font-bold">
                      {m.category}
                    </span>
                  </div>

                  {/* Caption section representing old handwritten marker styling */}
                  <div className="pt-4 flex flex-col justify-between flex-1">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-950 text-base uppercase tracking-tight">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-slate-700 font-medium line-clamp-2">
                        {m.description}
                      </p>
                    </div>

                    {/* Bottom Reaction row */}
                    <div className="flex items-center justify-between border-t-2 border-slate-100 pt-3 mt-3">
                      <span className="font-mono text-[9px] font-black text-slate-600 uppercase tracking-widest">
                        📅 {m.date}
                      </span>

                      {/* Heart Count */}
                      <button
                        onClick={(e) => handleLikeMemory(m.id, e)}
                        className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-bold font-mono py-1 px-2.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Love this Memory!"
                      >
                        <Heart className={`w-3.5 h-3.5 ${likesState[m.id] ? "fill-current scale-110" : ""}`} />
                        <span>{12 + (likesState[m.id] || 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 p-6 border-4 border-dashed border-slate-950 rounded-3xl max-w-sm mx-auto bg-white shadow-[4px_4px_0px_#121212]">
              <span className="text-4xl">📸</span>
              <p className="font-mono text-xs text-slate-900 font-black uppercase mt-4 tracking-wider">
                No matching memory logs
              </p>
              <p className="text-[10px] text-slate-650 font-bold mt-1">
                Refine category filters or try searching for keywords like "guitar", "roadtrip", or "cake"!
              </p>
            </div>
          )}
        </div>

        {/* Polaroid caption banner footnote */}
        <div className="text-center mt-6">
          <p className="text-[10px] font-mono text-slate-700 font-bold uppercase tracking-widest">
            * Tap any image above to explore full card details and leave comments!
          </p>
        </div>

      </div>

      {/* Full Immersive Lightbox Modal */}
      {activeMemory && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300"
          onClick={() => setActiveMemory(null)}
        >
          {/* Main layout card */}
          <div 
            className="bg-white border-4 border-slate-950 p-5 rounded-3xl w-full max-w-2xl shadow-[16px_16px_0px_0px_#020617] transform scale-100 transition-transform duration-300 relative flex flex-col md:grid md:grid-cols-12 gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating absolute close button */}
            <button
              onClick={() => setActiveMemory(null)}
              className="absolute top-[-16px] right-[-16px] p-2 bg-slate-950 text-white rounded-full hover:scale-110 active:scale-90 transition-transform cursor-pointer border-2 border-white z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side column: Main image (7-span) */}
            <div className="md:col-span-7 border-3 border-slate-950 rounded-2xl overflow-hidden relative aspect-[4/3] bg-slate-950">
              <img
                src={activeMemory.image}
                alt={activeMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-slate-900 border border-white/10 px-2.5 py-0.5 text-[8px] font-mono font-bold tracking-widest text-white uppercase rounded">
                CATEGORY: {activeMemory.category}
              </span>
            </div>

            {/* Right side column: message captions (5-span) */}
            <div className="md:col-span-5 flex flex-col justify-between py-2">
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                    📅 MEMORY RECORDED: {activeMemory.date}
                  </span>
                  <h3 className="font-extrabold text-[#020617] text-lg sm:text-xl uppercase leading-tight font-sans tracking-tight mt-1">
                    {activeMemory.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto pr-2">
                  {activeMemory.description}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 text-[10px] rounded-lg font-mono text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Sticker ID: {activeMemory.id}</span>
                </div>
              </div>

              {/* Bottom modal action triggers */}
              <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
                <button
                  onClick={(e) => handleLikeMemory(activeMemory.id, e)}
                  className="flex items-center gap-1 px-3 py-2 border-2 border-slate-950 hover:bg-slate-50 text-slate-950 font-bold rounded-xl text-xs font-mono transition-transform active:scale-95 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 text-rose-500 ${likesState[activeMemory.id] ? "fill-current" : ""}`} />
                  <span>Like ({12 + (likesState[activeMemory.id] || 0)})</span>
                </button>

                <button
                  onClick={() => setActiveMemory(null)}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl"
                >
                  Close Card
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
