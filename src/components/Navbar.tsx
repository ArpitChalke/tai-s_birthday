import React, { useState, useEffect } from "react";
import { Music, Volume2, VolumeX, Menu, X, Search, Sparkles, Heart } from "lucide-react";

interface NavbarProps {
  name: string;
  themeColor: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  playlistName: string;
}

export default function Navbar({
  name,
  themeColor,
  searchValue,
  onSearchChange,
  isPlayingMusic,
  onToggleMusic,
  playlistName
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active target section
      const sections = ["hero", "story", "deck", "gallery", "wishes", "gifts", "rsvp"];
      const scrollPos = window.scrollY + 120;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Get accent color values based on theme color selection
  const accentTextClass = 
    themeColor === "rockstar-pink" ? "text-[#FF4FA3]" :
    themeColor === "retro-purple" ? "text-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "text-[#00D9FF]" :
    themeColor === "sweet-peach" ? "text-[#FF4FA3]" :
    "text-[#FFD93D]";

  const accentBgClass = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3]" :
    themeColor === "retro-purple" ? "bg-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF]" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3]" :
    "bg-[#FFD93D]";

  const ringColorClass = 
    themeColor === "rockstar-pink" ? "focus-within:border-[#FF4FA3]" :
    themeColor === "retro-purple" ? "focus-within:border-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "focus-within:border-[#00D9FF]" :
    themeColor === "sweet-peach" ? "focus-within:border-[#FF4FA3]" :
    "focus-within:border-[#FFD93D]";

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b-4 border-slate-950 py-2.5 shadow-[0px_4px_0px_rgba(18,18,18,1)]"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with dynamic handwritten accent */}
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className={`p-2 rounded-xl text-white border-2 border-slate-950 ${accentBgClass} shadow-[2px_2px_0px_#121212] group-hover:scale-105 transition-transform`}>
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg font-sans tracking-tight text-slate-150 flex items-center text-slate-950">
              #{name.replace(/\s+/g, "")}
              <Sparkles className="w-4 h-4 ml-1 text-yellow-500 animate-spin" style={{ animationDuration: "3s" }} />
            </span>
            <p className="text-[8px] text-slate-700 tracking-wider uppercase font-mono font-bold">
              Virtual Birthday Bash
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-4">
          {[
            { id: "hero", label: "Home" },
            { id: "story", label: "Story" },
            { id: "deck", label: "Interactive Deck" },
            { id: "gallery", label: "Gallery Memories" },
            { id: "wishes", label: "Wishes" },
            { id: "gifts", label: "Gift Corner" },
            { id: "rsvp", label: "RSVP" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-xs font-black uppercase tracking-wider relative px-2.5 py-1.5 rounded-lg border-2 transition-all duration-200 cursor-pointer select-none ${
                activeSection === item.id 
                  ? `${accentBgClass} text-white border-slate-950 shadow-[2px_2px_0px_#121212]` 
                  : "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-950"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search and Music Controls Container */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dynamic Search Box */}
          <div className={`relative flex items-center bg-white border-3 border-slate-950 rounded-full px-3 py-1.5 text-xs text-slate-800 w-48 shadow-[2px_2px_0px_#121212] ${ringColorClass} transition-all duration-300 group`}>
            <Search className="w-3.5 h-3.5 mr-2 text-slate-500 group-focus-within:text-slate-950" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search memories..."
              className="bg-transparent focus:outline-none w-full text-slate-950 placeholder-slate-500 font-bold"
            />
            {searchValue && (
              <button 
                onClick={() => onSearchChange("")}
                className="absolute right-2 text-slate-500 hover:text-slate-950"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Music Control Pill */}
          <button
            id="btn-navbar-music"
            onClick={onToggleMusic}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border-3 border-slate-950 select-none cursor-pointer bg-white text-slate-950 shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
          >
            <div className="flex gap-0.5 items-end h-3">
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className={`w-0.5 rounded-full ${accentBgClass} ${
                    isPlayingMusic ? "animate-audio-bars" : "h-1"
                  }`}
                  style={{
                    animationDelay: `${bar * 0.15}s`,
                    height: isPlayingMusic ? "100%" : "4px"
                  }}
                />
              ))}
            </div>
            
            <div className="text-left font-mono text-[9px] max-w-[80px] truncate">
              {isPlayingMusic ? (
                <>
                  <span className="text-[7px] font-black opacity-75 block text-slate-505 leading-none">PLAYING:</span>
                  <span className="font-black text-slate-950">{playlistName}</span>
                </>
              ) : (
                <span className="font-black text-slate-700">MUSIC OFF</span>
              )}
            </div>

            {isPlayingMusic ? (
              <Volume2 className="w-3.5 h-3.5 ml-0.5 text-slate-950 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 ml-0.5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Quick Audio Control (Mobile Friendly) */}
          <button
            onClick={onToggleMusic}
            className={`p-2 rounded-xl border-2 border-slate-950 cursor-pointer ${
              isPlayingMusic ? "bg-slate-100 text-slate-950 shadow-[2px_2px_0px_#121212]" : "text-slate-700 bg-white"
            }`}
          >
            <Music className={`w-4 h-4 ${isPlayingMusic ? "animate-bounce" : ""}`} />
          </button>

          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-950 bg-white border-2 border-slate-950 shadow-[2px_2px_0px_#121212] cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Side Panel Menu */}
      <div
        id="side-menu-mobile"
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r-4 border-slate-950 z-50 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-350 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-950">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-slate-950 font-sans uppercase">
                #{name}'s Bash
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-xl border-2 border-slate-950 bg-[#FFD1DC] text-slate-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Search input */}
          <div className="relative flex items-center bg-white border-2 border-slate-950 rounded-xl px-3 py-2 text-xs text-slate-950">
            <Search className="w-3.5 h-3.5 mr-2 text-slate-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search recollections..."
              className="bg-transparent focus:outline-none w-full text-slate-950 placeholder-slate-500 font-bold"
            />
          </div>

          <div className="flex flex-col gap-2">
            {[
              { id: "hero", label: "Home" },
              { id: "story", label: "Story" },
              { id: "deck", label: "Interactive Deck" },
              { id: "gallery", label: "Gallery Memories" },
              { id: "wishes", label: "Wishes" },
              { id: "gifts", label: "Gift Corner" },
              { id: "rsvp", label: "RSVP" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-left border-2 duration-150 transition-all cursor-pointer select-none ${
                  activeSection === item.id
                    ? `${accentBgClass} text-white border-slate-950 shadow-[2px_2px_0px_#121212]`
                    : "text-slate-800 hover:bg-slate-50 border-transparent hover:border-slate-950"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t-2 border-slate-950 text-center space-y-4">
          <div className="text-[10px] font-mono text-slate-800 font-black">
            {isPlayingMusic ? `Playing: ${playlistName}` : "Sound Synth Suspended"}
          </div>
          <button
            onClick={() => {
              onToggleMusic();
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-black font-sans uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 border-3 border-slate-950 ${
              isPlayingMusic 
                ? "bg-slate-100 text-slate-950" 
                : `${accentBgClass} text-white shadow-[2px_2px_0px_#121212]`
            }`}
          >
            <Music className="w-4 h-4" />
            {isPlayingMusic ? "Stop Synth Soundtrack" : "Play Synth Soundtrack"}
          </button>
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">
            Crafted for fun & celebrations Online.
          </p>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden font-mono"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
