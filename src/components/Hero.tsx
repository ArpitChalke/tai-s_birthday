import React, { useState, useEffect } from "react";
import { Sparkles, Play, Calendar, AlarmClock, Heart, Zap } from "lucide-react";
import { BirthdayProfile } from "../types";
import { CONGRATS_EMOJIS } from "../data";
import { playConfettiSfx } from "../utils/audio";

interface HeroProps {
  profile: BirthdayProfile;
  onPopConfetti: () => void;
}

export default function Hero({ profile, onPopConfetti }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);
  const [tickerMessage, setTickerMessage] = useState("Wishing You the Absolute Best!");

  // Dynamic ticking messages carousel
  useEffect(() => {
    const messages = [
      "Sending warm wishes and sisterly hugs for Tai.",
      "Blow the virtual candles and celebrate every moment. 🎂",
      "Confetti moments are ready to brighten the day. 🎉",
      "Unlock surprise keepsake gifts made just for her. 🎁",
      "Cherish the memories, the laughter, and the love. ❤️"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setTickerMessage(messages[idx]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Compute countdown timer dynamically based on customized profile.birthdayDate
  useEffect(() => {
    const calculateTimeLeft = () => {
      const bdayDate = new Date(profile.birthdayDate);
      const now = new Date();
      
      // Set year to current year for near countdown or next year
      let targetYear = now.getFullYear();
      let targetDate = new Date(targetYear, bdayDate.getMonth(), bdayDate.getDate());
      
      if (now.getTime() > targetDate.getTime()) {
        const isBdayToday = 
          now.getDate() === bdayDate.getDate() && 
          now.getMonth() === bdayDate.getMonth();
        
        if (isBdayToday) {
          setIsToday(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        
        // Otherwise countdown is for next year
        targetYear += 1;
        targetDate = new Date(targetYear, bdayDate.getMonth(), bdayDate.getDate());
        setIsToday(false);
      } else {
        const isBdayToday = 
          now.getDate() === bdayDate.getDate() && 
          now.getMonth() === bdayDate.getMonth();
        
        setIsToday(isBdayToday);
      }

      const difference = targetDate.getTime() - now.getTime();
      
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((difference / 1000 / 60) % 60);
      let seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [profile.birthdayDate]);

  // Format date helper (e.g. "20 TH SEP")
  const formatBirthdateLabel = () => {
    try {
      const d = new Date(profile.birthdayDate);
      const day = d.getDate();
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const month = monthNames[d.getMonth()] || "SEP";
      
      let suffix = "TH";
      if (day === 1 || day === 21 || day === 31) suffix = "ST";
      else if (day === 2 || day === 22) suffix = "ND";
      else if (day === 3 || day === 23) suffix = "RD";
      
      return `${day} ${suffix} ${month}`;
    } catch (e) {
      return "20 TH SEP";
    }
  };

  // Color mappings
  const themeAccentClass = 
    profile.themeColor === "rockstar-pink" ? "bg-[#FF4FA3] hover:bg-[#FF72B6] text-white border-3 border-slate-950 shadow-[4px_4px_0px_rgba(18,18,18,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none" :
    profile.themeColor === "retro-purple" ? "bg-[#6A00F4] hover:bg-[#8123FF] text-white border-3 border-slate-950 shadow-[4px_4px_0px_rgba(18,18,18,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none" :
    profile.themeColor === "cyber-cyan" ? "bg-[#00D9FF] hover:bg-[#43E6FF] text-slate-950 border-3 border-slate-950 shadow-[4px_4px_0px_rgba(18,18,18,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none" :
    profile.themeColor === "sweet-peach" ? "bg-[#FF4FA3] hover:bg-[#FF72B6] text-slate-950 border-3 border-slate-950 shadow-[4px_4px_0px_rgba(18,18,18,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none" :
    "bg-[#FFD93D] hover:bg-[#FFE366] text-slate-950 border-3 border-slate-950 shadow-[4px_4px_0px_rgba(18,18,18,1)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-none";

  const themeTextStroke = 
    profile.themeColor === "rockstar-pink" ? "text-[#FF4FA3]" :
    profile.themeColor === "retro-purple" ? "text-[#6A00F4]" :
    profile.themeColor === "cyber-cyan" ? "text-[#00D9FF]" :
    profile.themeColor === "sweet-peach" ? "text-[#FF4FA3]" :
    "text-[#FFD93D]";

  const gradientBg = "bg-transparent";

  const circleAccent = "from-transparent to-transparent";

  const borderAccent = "border-slate-950";

  const glowAccent = "shadow-none";

  const playChime = () => {
    onPopConfetti();
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 ${gradientBg}`}
    >
      {/* Playful dots overlay representing retro sketchbook design */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Floating background glowing radial circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-linear-to-br from-[#FF4FA3]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-linear-to-br from-[#6A00F4]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Scattered Retro Sparkles Stars */}
      {[
        { top: "12%", left: "15%", delay: "0s", size: "w-6 h-6 text-[#FFD93D]" },
        { top: "25%", left: "7%", delay: "1.2s", size: "w-4 h-4 text-[#00D9FF]" },
        { top: "85%", left: "12%", delay: "0.8s", size: "w-5 h-5 text-[#FF4FA3] animate-pulse" },
        { top: "15%", left: "85%", delay: "1.5s", size: "w-5 h-5 text-[#6A00F4]" },
        { top: "45%", left: "92%", delay: "0.3s", size: "w-7 h-7 text-[#FF4FA3] animate-bounce" },
        { top: "82%", left: "80%", delay: "2s", size: "w-4 h-4 text-[#FFD93D]" }
      ].map((star, i) => (
        <span
          key={i}
          className={`absolute pointer-events-none z-10 transition-transform hover:scale-125 duration-500`}
          style={{
            top: star.top,
            left: star.left,
            animation: `float 4s ease-in-out infinite`,
            animationDelay: star.delay
          }}
        >
          <Sparkles className={star.size} />
        </span>
      ))}

      {/* Interactive Balloon Spawners Floating Upwards in Gutter Margins */}
      {[
        { left: "3%", delay: "0.5s", color: "from-[#FF4FA3] to-[#FF72B6]", scale: "scale-100" },
        { left: "14%", delay: "2.8s", color: "from-[#FFD93D] to-amber-500", scale: "scale-75" },
        { left: "82%", delay: "1.2s", color: "from-[#6A00F4] to-[#B485FF]", scale: "scale-110" },
        { left: "91%", delay: "4s", color: "from-[#00D9FF] to-blue-500", scale: "scale-90" }
      ].map((b, i) => (
        <div
          key={i}
          className={`absolute bottom-[-100px] pointer-events-none z-10 animate-float-up opacity-80 ${b.scale}`}
          style={{
            left: b.left,
            animationDelay: b.delay,
          }}
        >
          {/* Balloon shape */}
          <div className={`w-14 h-18 rounded-full bg-gradient-to-tr ${b.color} relative border-3 border-slate-950 shadow-[3px_3px_0px_rgba(18,18,18,1)]`}>
            {/* Balloon tie */}
            <div className="absolute bottom-[-4px] left-[25px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-slate-950" />
            {/* Balloon string */}
            <div className="absolute bottom-[-34px] left-[28px] w-[2px] h-[30px] bg-slate-950/20" />
          </div>
        </div>
      ))}

      {/* Main Container Layout */}
      <div id="content-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content and Hype Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col justify-center">
            
            {/* Date Tag sticker style */}
            <div className="inline-flex mx-auto lg:mx-0 items-center gap-2 bg-white border-3 border-slate-950 px-4 py-2 rounded-full shadow-[4px_4px_0px_#121212] scale-100 hover:scale-102 transition-transform duration-300">
              <Calendar className="w-5 h-5 text-slate-950" />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-950">
                CELEBRATING: {formatBirthdateLabel()}
              </span>
            </div>

            {/* Main Interactive Headline - Sticker Styled Shadow Effects */}
            <div className="space-y-3">
              <h1 className="font-extrabold text-slate-950 font-sans tracking-tight leading-none text-4xl md:text-5xl lg:text-7xl uppercase">
                HAPPY BIRTHDAY <br />
                <span className={`relative inline-block text-transparent bg-clip-text bg-gradient-to-r ${profile.themeColor === "rockstar-pink" ? "from-[#FF4FA3] via-[#ff2288] to-[#6A00F4]" : profile.themeColor === "retro-purple" ? "from-[#6A00F4] via-[#9e00ff] to-indigo-600" : profile.themeColor === "cyber-cyan" ? "from-[#00D9FF] via-teal-500 to-blue-600" : profile.themeColor === "sweet-peach" ? "from-[#FF4FA3] via-[#ff6ba9] to-[#FFD93D]" : "from-[#FFD93D] via-amber-500 to-amber-600"} filter drop-shadow-[2px_2px_0px_rgba(18,18,18,1)]`}>
                  {profile.name}
                </span>{" "}
                <br />
                <span className="text-lg md:text-2xl font-mono text-slate-850 tracking-widest block mt-3 normal-case border-t-3 border-b-3 border-slate-950 py-1.5 font-black uppercase">
                  ⚡ {profile.tagline} ⚡
                </span>
              </h1>
            </div>

            {/* Emotional Birthday Story Hook */}
            <p className="text-xs md:text-sm text-slate-850 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Every moment here is a page from a sister’s heart, created to celebrate Tai with warmth and wonder. Light up the confetti, browse retro photo polaroids, unlock surprise keepsakes, and share your own custom wishes — this is a gentle tribute to the love, laughter, and memories you share.
            </p>

            <div className="pt-2">
              {/* Dynamic ticker status bar banner */}
              <div className="inline-flex items-center gap-2 bg-white border-3 border-slate-950 py-2 px-4 rounded-2xl shadow-[4px_4px_0px_#121212]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4FA3] animate-ping" />
                <p className="text-[10px] sm:text-xs font-mono font-black text-slate-950">
                  <span className="text-[#6A00F4] font-black uppercase mr-1">STATUS:</span>
                  {tickerMessage}
                </p>
              </div>
            </div>

            {/* Live CountDown Ticker Boxes */}
            <div className="space-y-3 max-w-lg mx-auto lg:mx-0 pt-4">
              <h3 className="text-xs font-black tracking-wider text-slate-950 uppercase flex items-center justify-center lg:justify-start gap-1.5">
                <AlarmClock className="w-4 h-4 text-[#6A00F4]" /> 
                {isToday ? "CONGRATULATIONS! IT'S PARTY TIME! 🎂" : "Countdown to the Celebration:"}
              </h3>

              {!isToday ? (
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "DAYS", val: timeLeft.days, color: "shadow-[6px_6px_0px_0px_#6A00F4]" },
                    { label: "HOURS", val: timeLeft.hours, color: "shadow-[6px_6px_0px_0px_#FF4FA3]" },
                    { label: "MINS", val: timeLeft.minutes, color: "shadow-[6px_6px_0px_0px_#00D9FF]" },
                    { label: "SECS", val: timeLeft.seconds, color: "shadow-[6px_6px_0px_0px_#FFD93D]" }
                  ].map((unit, i) => (
                    <div
                      key={unit.label}
                      className={`relative bg-white border-3 border-slate-950 rounded-2xl p-3 text-center transition-all duration-300 group hover:-translate-y-1 ${unit.color}`}
                    >
                      <div className="text-xl md:text-3.5xl font-black font-mono text-slate-950 tracking-tight tabular-nums">
                        {String(unit.val).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] md:text-[10px] font-black font-mono tracking-widest text-slate-800 mt-1">
                        {unit.label}
                      </div>

                      {/* Spark glow decorative pin corner */}
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-950/20" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-3xl bg-[#FF4FA3] border-4 border-slate-950 text-center animate-pulse shadow-[8px_8px_0px_0px_rgba(18,18,18,1)] text-white">
                  <p className="font-black text-lg sm:text-2xl tracking-tight uppercase">
                    🎈 HAPPY BIRTHDAY! 🎉
                  </p>
                  <p className="text-xs font-mono opacity-90 mt-1">
                    The absolute star of the show. Turn on the music and let us celebrate!
                  </p>
                </div>
              )}
            </div>

            {/* Interactive Call to Actions (Split layout buttons) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
              <button
                id="btn-hero-launch-confetti"
                onClick={playChime}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transform transition-all flex items-center justify-center gap-2 select-none cursor-pointer ${themeAccentClass}`}
              >
                <Zap className="w-4.5 h-4.5 animate-bounce" />
                Fire Confetti Cannon! 💥
              </button>

              <button
                id="btn-hero-scroll-deck"
                onClick={() => {
                  const element = document.getElementById("deck");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    playConfettiSfx();
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-950 bg-white border-3 border-slate-950 shadow-[4px_4px_0px_rgba(18,18,18,1)] hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                Enter Celebration Lounge 🍰
              </button>
            </div>
          </div>

          {/* Right Column: Polaroid Rockstar Sticker Portrait & Illustrations */}
          <div className="lg:col-span-5 flex justify-center relative select-none">
            
            {/* Pop-art Card Layout with bold black shadows and custom outlines */}
            <div className="relative w-full max-w-[360px] aspect-[4/5] bg-white border-4 border-slate-950 p-4 shadow-[12px_12px_0px_0px_#020617] rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-500 group flex flex-col justify-between">
              
              {/* Outer floating graphic tags */}
              {/* 'COOL!' sticker */}
              <div className="absolute top-[-25px] right-[-20px] bg-yellow-400 text-slate-950 px-3 py-1.5 rounded-xl border-3 border-slate-900 font-extrabold text-xs uppercase tracking-widest shadow-md transform rotate-12 hover:scale-110 active:scale-95 cursor-pointer select-none transition-all z-20 flex items-center gap-1.5 animate-pulse">
                <span>COOL!</span>
                <span className="text-red-500">🔥</span>
              </div>

              {/* 'MAKE A WISH!' cupcake sticker */}
              <div 
                onClick={onPopConfetti}
                className="absolute bottom-16 left-[-35px] bg-white text-slate-950 p-2 rounded-2xl border-3 border-slate-900 shadow-md transform -rotate-12 hover:scale-110 active:scale-95 cursor-pointer transition-all z-20 w-20 text-center"
              >
                <span className="text-2xl block">🧁</span>
                <span className="text-[7.5px] font-black uppercase tracking-wider leading-none text-pink-500 block">
                  MAKE A WISH!
                </span>
              </div>

              {/* Glowing ring under portrait */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-teal-400/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Polaroid Photo Section */}
              <div className="w-full h-[80%] rounded-2xl border-4 border-slate-950 overflow-hidden relative bg-slate-950 flex items-center justify-center">
                <img
                  src={profile.mainImage}
                  alt={`${profile.name} Celebration`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105"
                />

                {/* Cyber lines overlays for pop art texture */}
                <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(0,0,0,1)_95%)] bg-[size:100%_12px]" />

                {/* Sparkle badge watermark */}
                <div className="absolute bottom-2 right-2 bg-slate-900/90 text-white font-mono text-[8px] tracking-widest uppercase py-0.5 px-2 rounded-md border border-white/10 z-10">
                  ⚡ SUPER HYPE ⚡
                </div>
              </div>

              {/* Polaroid Footer caption - handwritten style */}
              <div className="pt-3 text-center pb-1">
                <p className="font-extrabold font-sans text-lg text-slate-950 uppercase tracking-tight flex items-center justify-center gap-1.5">
                  IT'S YOUR DAY! 
                  <span className="text-lg">🎸</span>
                </p>
                <p className="text-[10px] font-mono font-medium text-slate-600 uppercase tracking-wider">
                  Orbit: #{new Date().getFullYear() - new Date(profile.birthdayDate).getFullYear()} Completed
                </p>
              </div>
            </div>

            {/* Sparklet particle emitter bubble behind portrait */}
            <div className={`absolute bottom-4 right-12 w-28 h-28 rounded-full bg-pink-500/10 blur-xl pointer-events-none`} />
            <div className={`absolute top-4 left-12 w-28 h-28 rounded-full bg-cyan-400/10 blur-xl pointer-events-none`} />
          </div>

        </div>
      </div>
    </section>
  );
}
