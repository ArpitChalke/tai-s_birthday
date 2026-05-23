import React, { useState } from "react";
import { Settings, X, RotateCcw, Sparkles, Music, Calendar, Palette, User, Heart, Upload } from "lucide-react";
import { BirthdayProfile } from "../types";

interface CustomizerProps {
  profile: BirthdayProfile;
  onChange: (updated: BirthdayProfile) => void;
  onReset: () => void;
}

const AVATAR_PRESETS = [
  { name: "Cool Rocker (Image)", url: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&q=80&w=500" },
  { name: "Retro DJ", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500" },
  { name: "Fun Sparkles", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=500" },
  { name: "Sweet Pastel Portrait", url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=500" }
];

export default function Customizer({ profile, onChange, onReset }: CustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const updateField = (field: keyof BirthdayProfile, value: any) => {
    onChange({
      ...profile,
      [field]: value
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processImageFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField("mainImage", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Floating Settings Toggle Button */}
      <button
        id="btn-customizer-toggle"
        onClick={() => setIsOpen(true)}
        className="fixed top-24 right-4 z-50 p-3 bg-[#FFD93D] text-slate-950 border-3 border-slate-950 rounded-full shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all cursor-pointer outline-none group"
        title="Customize Birthday Page"
      >
        <Settings className="w-6 h-6 animate-spin-slow group-hover:rotate-90 transition-transform duration-500" />
        <span className="absolute right-14 top-2 px-3 py-1.5 bg-white border-2 border-slate-950 text-slate-950 text-xs font-black rounded-xl scale-0 group-hover:scale-100 origin-right transition-transform shadow-[2px_2px_0px_#121212] duration-200 whitespace-nowrap uppercase">
          🎈 Edit Page Content!
        </span>
      </button>

      {/* Slide-out Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Control Panel Drawer */}
      <div 
        id="panel-customizer"
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white border-l-4 border-slate-950 text-slate-850 z-50 shadow-[-8px_0px_0px_rgba(18,18,18,0.15)] flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b-3 border-slate-950 flex items-center justify-between bg-[#FF4FA3]/15">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-slate-950 animate-pulse animate-bounce" />
            <span className="font-extrabold text-xs bg-[#FFD93D] border-2 border-slate-950 px-2 py-0.5 rounded-lg shadow-[1.5px_1.5px_0px_#121212] uppercase leading-none">WORKSHOP</span>
            <h2 className="font-black text-base text-slate-950 font-sans tracking-tight uppercase">Customizer</h2>
          </div>
          <button
            id="btn-customizer-close"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl border-2 border-slate-950 hover:bg-slate-50 text-slate-950 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(18,18,18,1)] bg-white"
          >
            <X className="w-5 h-5 text-slate-950" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
          <p className="text-xs text-slate-700 font-bold leading-relaxed">
            Build a unique, personalized birthday experience! Change details here and view them immediately in the interactive layout.
          </p>

          {/* Section: Birthday Hero details */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2 tracking-wider uppercase border-b border-dashed border-slate-300 pb-1.5">
              <User className="w-4 h-4 text-[#FF4FA3]" /> Who is the Rock Star?
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Recipient's Name"
                  className="w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-3 py-2 text-sm text-slate-950 placeholder-slate-400 font-bold focus:outline-none focus:border-slate-950 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider mb-1">Tagline Pitch</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="Tagline e.g. ROCKSTAR!"
                  className="w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-3 py-2 text-sm text-slate-950 placeholder-slate-400 font-bold focus:outline-none focus:border-slate-950 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Birthday Date */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2 tracking-wider uppercase border-b border-dashed border-slate-300 pb-1.5">
              <Calendar className="w-4 h-4 text-[#00D9FF]" /> Party Countdown Date
            </h3>

            <div>
              <label className="block text-[10px] font-mono font-black text-slate-755 uppercase tracking-wider mb-1">Date of Birthday</label>
              <input
                type="date"
                value={profile.birthdayDate}
                onChange={(e) => updateField("birthdayDate", e.target.value)}
                className="w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-3 py-2 text-sm text-slate-950 placeholder-slate-400 font-bold focus:outline-none focus:border-slate-950 transition-colors cursor-pointer"
              />
              <span className="text-[10px] text-slate-600 font-bold mt-1.5 block">
                The count down ticking widget is keyed off this date.
              </span>
            </div>
          </div>

          {/* Section: Themes */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2 tracking-wider uppercase border-b border-dashed border-slate-300 pb-1.5">
              <Palette className="w-4 h-4 text-[#FFD93D]" /> Choose Aesthetic Motif
            </h3>

            <div>
              <label className="block text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider mb-2">Theme Accents</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "rockstar-pink", label: "🎸 Rockstar Pink", class: "bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white" },
                  { id: "retro-purple", label: "👾 Retro Purple", class: "bg-[#6A00F4] hover:bg-[#6A00F4]/90 text-white" },
                  { id: "cyber-cyan", label: "🌐 Cyber Cyan", class: "bg-[#00D9FF] hover:bg-[#00D9FF]/95 text-slate-950" },
                  { id: "sweet-peach", label: "🌸 Sweet Peach", class: "bg-[#FF4FA3] hover:bg-[#FF4FA3]/95 text-white" },
                  { id: "sunny-yellow", label: "☀️ Sunny Yellow", class: "bg-[#FFD93D] hover:bg-[#FFD93D]/95 text-slate-950" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateField("themeColor", t.id as any)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-black select-none flex items-center justify-center cursor-pointer border-2 border-slate-950 transition-all ${t.class} ${
                      profile.themeColor === t.id
                        ? "ring-2 ring-slate-950 ring-offset-2 ring-offset-white scale-102 shadow-[1.5px_1.5px_0px_rgba(18,18,18,1)]"
                        : "opacity-85 shadow-none"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Main Image presets / URL */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2 tracking-wider uppercase border-b border-dashed border-slate-300 pb-1.5">
              <Heart className="w-4 h-4 text-[#FF4FA3]" /> Host Profile Portrait
            </h3>

            <div className="space-y-4">
              
              {/* Drag & Drop File Upload Box */}
              <div>
                <label className="block text-[10px] font-mono font-black text-slate-755 uppercase tracking-wider mb-2">
                  Upload Real Photo from Device
                </label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-3 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 select-none ${
                    dragActive 
                      ? "border-[#00D9FF] bg-[#00D9FF]/5 scale-102" 
                      : "border-slate-400 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-950"
                  }`}
                >
                  <input
                    type="file"
                    id="image-file-upload-input"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="image-file-upload-input" 
                    className="w-full h-full cursor-pointer flex flex-col items-center justify-center space-y-2 py-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-slate-950 flex items-center justify-center shadow-[2px_2px_0px_#121212]">
                      <Upload className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-950 uppercase leading-none">
                        Drag & Drop or Click to Upload
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold block mt-1.5 leading-tight">
                        PNG, JPG, or WEBP. Upload your sister's original, real photo!
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider mb-2">Preset Outlines</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVATAR_PRESETS.map((av, index) => (
                    <button
                      key={index}
                      onClick={() => updateField("mainImage", av.url)}
                      className={`text-slate-800 bg-white border-2 border-slate-950 p-2 rounded-xl text-[11px] font-bold text-left hover:bg-slate-50 transition-all cursor-pointer shadow-[1.5px_1.5px_0px_rgba(18,18,18,1)] ${
                        profile.mainImage === av.url ? "border-slate-950 bg-[#00D9FF] text-slate-950 font-black shadow-[2.5px_2.5px_0px_rgba(18,18,18,1)]" : ""
                      }`}
                    >
                      {av.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider mb-1">Or direct image URL</label>
                <input
                  type="text"
                  value={profile.mainImage.startsWith("data:") ? "[Local Device Uploaded Image]" : profile.mainImage}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val !== "[Local Device Uploaded Image]") {
                      updateField("mainImage", val);
                    }
                  }}
                  placeholder="Paste custom graphic address..."
                  className="w-full bg-slate-50 border-3 border-slate-950 rounded-xl px-3 py-2 text-sm text-slate-950 placeholder-slate-450 font-bold focus:outline-none focus:border-slate-950 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Atmosphere Sound track */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2 tracking-wider uppercase border-b border-dashed border-slate-300 pb-1.5">
              <Music className="w-4 h-4 text-[#6A00F4]" /> Synthesized Soundtrack
            </h3>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-black text-slate-750 uppercase tracking-wider">Synth Sound Tone Style</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {[
                  { type: "synthesized", label: "8-Bit Jam" },
                  { type: "cheerful", label: "Happy Bells" },
                  { type: "ambient", label: "Retro Space" }
                ].map((m) => (
                  <button
                    key={m.type}
                    onClick={() => {
                      updateField("musicType", m.type as any);
                      updateField("soundtrack", m.type === "synthesized" ? "Rockstar Synth Chimes" : m.type === "cheerful" ? "Bubbly Birthday Chimes" : "Mystical Ambient Orbit");
                    }}
                    className={`px-2 py-2.5 rounded-xl text-[11px] font-black border-2 border-slate-950 shadow-[1.5px_1.5px_0px_rgba(18,18,18,1)] cursor-pointer transition-all ${
                      profile.musicType === m.type
                        ? "bg-[#6A00F4] text-white ring-2 ring-slate-950"
                        : "bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-600 font-bold pt-1">
                You can toggle of the sound system in the top navigation panel! Sound signals utilize standard browser Synthesizer API so it requires no external audio download files.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t-3 border-slate-950 bg-slate-50 flex gap-3">
          <button
            onClick={() => {
              onReset();
              setIsOpen(false);
            }}
            className="flex-1 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 border-3 border-slate-950 shadow-[3px_3px_0px_#121212] transition-all cursor-pointer select-none active:translate-y-0.5 active:shadow-none"
          >
            <RotateCcw className="w-4 h-4" /> Restore Standard
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2.5 bg-[#FFD93D] hover:bg-[#FFD93D]/95 text-slate-950 rounded-xl text-xs font-black shadow-[3px_3px_0px_#121212] border-3 border-slate-950 transition-all cursor-pointer select-none text-center active:translate-y-0.5 active:shadow-none"
          >
            Looking Good! 🚀
          </button>
        </div>
      </div>
    </>
  );
}
