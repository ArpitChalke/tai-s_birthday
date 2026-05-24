import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutTimeline from "./components/AboutTimeline";
import CelebrationDeck from "./components/CelebrationDeck";
import Gallery from "./components/Gallery";
import WishCreator from "./components/WishCreator";
import GiftRevealer from "./components/GiftRevealer";
import RsvpForm from "./components/RsvpForm";
import Customizer from "./components/Customizer";
import SisterLetter from "./components/SisterLetter";
import { BirthdayProfile, MemoryItem, WishItem, GiftItem } from "./types";
import { DEFAULT_PROFILE, DEFAULT_MEMORIES, DEFAULT_WISHES, DEFAULT_GIFTS } from "./data";
import { playSynthesizedSoundtrack, stopSynthesizedSoundtrack, playConfettiSfx } from "./utils/audio";
import { Sparkles, Calendar, Volume2 } from "lucide-react";

interface FloatingConfetti {
  id: number;
  emoji: string;
  left: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  angle: number; // rotate angle
}

const DEFAULT_HERO_IMAGE = "/images/WhatsApp Image 2026-05-23 at 22.26.21.jpeg";

export default function App() {
  // 1. Initial State Initialization from LocalStorage
  const [profile, setProfile] = useState<BirthdayProfile>(() => {
    try {
      const saved = localStorage.getItem("birthday_profile_configuration");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === "Arpit" || parsed.birthdayDate === "2026-09-20") {
          return DEFAULT_PROFILE;
        }
        const shouldUseDefaultHero =
          !parsed.mainImage ||
          parsed.mainImage === "/assets/images/WhatsApp Image 2026-05-23 at 22.26.21.jpeg" ||
          parsed.mainImage === "/src/assets/images/WhatsApp Image 2026-05-23 at 22.26.21.jpeg";

        return {
          ...parsed,
          mainImage: shouldUseDefaultHero ? DEFAULT_HERO_IMAGE : parsed.mainImage,
        };
      }
      return DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  });

  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem("birthday_wishes_wall");
      return saved ? JSON.parse(saved) : DEFAULT_WISHES;
    } catch (e) {
      return DEFAULT_WISHES;
    }
  });

  const [gifts, setGifts] = useState<GiftItem[]>(() => {
    try {
      const saved = localStorage.getItem("birthday_gifts_scratch");
      return saved ? JSON.parse(saved) : DEFAULT_GIFTS;
    } catch (e) {
      return DEFAULT_GIFTS;
    }
  });

  const [memories, setMemories] = useState<MemoryItem[]>(DEFAULT_MEMORIES);

  // Layout UI State
  const [searchValue, setSearchValue] = useState("");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeConfetti, setActiveConfetti] = useState<FloatingConfetti[]>([]);
  const confettiIdCounter = React.useRef(0);

  // 2. Synchronize configuration to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("birthday_profile_configuration", JSON.stringify(profile));
    } catch (e) {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem("birthday_wishes_wall", JSON.stringify(wishes));
    } catch (e) {}
  }, [wishes]);

  useEffect(() => {
    try {
      localStorage.setItem("birthday_gifts_scratch", JSON.stringify(gifts));
    } catch (e) {}
  }, [gifts]);

  // Handle ambient soundtrack updates
  useEffect(() => {
    if (isPlayingMusic) {
      // Start loop-playing synthesized theme
      playSynthesizedSoundtrack(profile.musicType, 0.15, () => {
        // Automatically request play restart on loop complete to simulate continuous loop
        if (isPlayingMusic) {
          playSynthesizedSoundtrack(profile.musicType, 0.15);
        }
      });
    } else {
      stopSynthesizedSoundtrack();
    }
    return () => stopSynthesizedSoundtrack();
  }, [isPlayingMusic, profile.musicType]);

  // Master music toggle control
  const handleToggleMusic = () => {
    if (!isPlayingMusic) {
      playConfettiSfx();
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  // Launch a burst of floating screen particles (Confetti Emojis)
  const handlePopConfettiBurst = () => {
    playConfettiSfx();
    
    const celebrationSymbols = ["🎈", "🎉", "🎸", "🍰", "🍻", "🍩", "🎁", "💖", "🌟", "✨", "🔥", "🤘"];
    const newConfettiBurst: FloatingConfetti[] = [];
    const burstCount = 20;

    for (let i = 0; i < burstCount; i++) {
      const randomSymbol = celebrationSymbols[Math.floor(Math.random() * celebrationSymbols.length)];
      const randLeft = Math.floor(Math.random() * 90) + 5; // bounds check
      const randSize = Math.floor(Math.random() * 20) + 16; // 16px to 36px
      const randDelay = Math.random() * 0.4; // staggered trigger times
      const randAngle = Math.floor(Math.random() * 60) - 30; // pitch tilt

      newConfettiBurst.push({
        id: confettiIdCounter.current++,
        emoji: randomSymbol,
        left: randLeft,
        size: randSize,
        delay: randDelay,
        angle: randAngle
      });
    }

    setActiveConfetti((prev) => [...prev, ...newConfettiBurst]);

    // Garbage collector for finished particles
    setTimeout(() => {
      setActiveConfetti((prev) => prev.filter((item) => !newConfettiBurst.some((nb) => nb.id === item.id)));
    }, 4500);
  };

  // State update actions
  const handleChangeProfile = (updated: BirthdayProfile) => {
    setProfile(updated);
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    setWishes(DEFAULT_WISHES);
    setGifts(DEFAULT_GIFTS);
    playConfettiSfx();
  };

  const handleAddFieldWish = (wish: WishItem) => {
    setWishes((prev) => [wish, ...prev]);
  };

  const handleScratchGift = (id: string) => {
    setGifts((prev) =>
      prev.map((g) => (g.id === id ? { ...g, unveiled: true } : g))
    );
  };

  // Theme variable wrappers based on themeColor matching standard Tailwind variables
  const getThemeClassPrefix = () => {
    switch (profile.themeColor) {
      case "rockstar-pink":
        return "bg-[#FFD1DC] text-[#121212] selection:bg-[#FF4FA3] selection:text-white";
      case "retro-purple":
        return "bg-[#E8D9FF] text-[#121212] selection:bg-[#6A00F4] selection:text-white";
      case "cyber-cyan":
        return "bg-[#D6FAFF] text-[#121212] selection:bg-[#00D9FF] selection:text-slate-950";
      case "sweet-peach":
        return "bg-[#FFE8E8] text-[#121212] selection:bg-[#FF4FA3] selection:text-[#121212]";
      default:
        return "bg-[#FFF6D1] text-[#121212] selection:bg-[#FFD93D] selection:text-slate-950";
    }
  };

  return (
    <div id="app-root-frame" className={`min-h-screen relative font-sans transition-colors duration-500 scrapbook-grid ${getThemeClassPrefix()}`}>
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        name={profile.name}
        themeColor={profile.themeColor}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        playlistName={profile.soundtrack}
      />

      {/* 2. Hero Presentation Banner */}
      <Hero 
        profile={profile} 
        onPopConfetti={handlePopConfettiBurst} 
      />

      {/* 3. Story timeline and milestones */}
      <AboutTimeline 
        memories={memories} 
        themeColor={profile.themeColor} 
      />

      {/* 3.5 Hand-crafted Sisterly Love Letter note */}
      <SisterLetter
        name={profile.name}
        themeColor={profile.themeColor}
      />

      {/* 4. Gamified Celebration Deck */}
      <CelebrationDeck
        name={profile.name}
        themeColor={profile.themeColor}
        onPopConfetti={handlePopConfettiBurst}
      />

      {/* 5. Memory Snaps Gallery */}
      <Gallery
        memories={memories}
        searchValue={searchValue}
        themeColor={profile.themeColor}
      />

      {/* 6. AI Wishing Assistant and Wall */}
      {/* <WishCreator
        name={profile.name}
        wishes={wishes}
        themeColor={profile.themeColor}
        onAddWish={handleAddFieldWish}
      /> */}

      {/* 7. Mystery scratch pass gifts corner */}
      <GiftRevealer
        name={profile.name}
        gifts={gifts}
        themeColor={profile.themeColor}
        onScratchGift={handleScratchGift}
      />

      {/* 8. RSVP response and Footer block */}
      <RsvpForm 
        name={profile.name} 
        themeColor={profile.themeColor} 
      />

      {/* 9. Floating administrative customization Workshop */}
      <Customizer
        profile={profile}
        onChange={handleChangeProfile}
        onReset={handleResetProfile}
      />

      {/* Interactive Overlay: Floating Confetti Burst Render Engine */}
      {activeConfetti.length > 0 && (
        <div id="confetti-particles-layer" className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
          {activeConfetti.map((particle) => (
            <div
              key={particle.id}
              className="absolute text-center animate-confetti-particle-float"
              style={{
                left: `${particle.left}%`,
                fontSize: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                top: `-50px`,
                transform: `rotate(${particle.angle}deg)`,
              }}
            >
              {particle.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Mini top scroll indicator representing page progression */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 z-50"
        style={{
          width: "100%",
          animation: "scroll-track linear",
          animationTimeline: "scroll()"
        }}
      />

    </div>
  );
}
