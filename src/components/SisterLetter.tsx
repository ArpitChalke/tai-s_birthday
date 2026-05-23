import React, { useState } from "react";
import { Mail, MailOpen, Heart, Sparkles, Star, ChevronDown, Check } from "lucide-react";
import { playPopSfx, playConfettiSfx } from "../utils/audio";

interface SisterLetterProps {
  name: string;
  themeColor: string;
}

export default function SisterLetter({ name, themeColor }: SisterLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Style helper based on theme selection
  const accentBorderClass = 
    themeColor === "rockstar-pink" ? "shadow-[8px_8px_0px_#FF4FA3]" :
    themeColor === "retro-purple" ? "shadow-[8px_8px_0px_#6A00F4]" :
    themeColor === "cyber-cyan" ? "shadow-[8px_8px_0px_#00D9FF]" :
    themeColor === "sweet-peach" ? "shadow-[8px_8px_0px_#FF4FA3]" :
    "shadow-[8px_8px_0px_#FFD93D]";

  const accentBg = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3]" :
    themeColor === "retro-purple" ? "bg-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF]" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3]" :
    "bg-[#FFD93D]";

  const linkColor = 
    themeColor === "rockstar-pink" ? "text-[#FF4FA3]" :
    themeColor === "retro-purple" ? "text-[#6A00F4]" :
    themeColor === "cyber-cyan" ? "text-[#00D9FF]" :
    themeColor === "sweet-peach" ? "text-[#FF4FA3]" :
    "text-[#FFD93D]";

  const buttonAccent = 
    themeColor === "rockstar-pink" ? "bg-[#FF4FA3] hover:bg-[#FF4FA3]/90 text-white" :
    themeColor === "retro-purple" ? "bg-[#6A00F4] hover:bg-[#6A00F4]/90 text-white" :
    themeColor === "cyber-cyan" ? "bg-[#00D9FF] text-slate-950 hover:bg-[#00D9FF]/90 font-black" :
    themeColor === "sweet-peach" ? "bg-[#FF4FA3] text-white hover:bg-[#FF4FA3]/90" :
    "bg-[#FFD93D] text-slate-950 hover:bg-[#FFD93D]/90 font-black";

  const handleOpenLetter = () => {
    if (!isOpen) {
      playConfettiSfx();
      playPopSfx();
    } else {
      playPopSfx();
    }
    setIsOpen(!isOpen);
  };

  const handleCopy = () => {
    const fullText = `To My Sister ❤️\n\nSome people come into our lives and leave memories behind…\nBut you, my sister, became the most beautiful part of my life itself.\nFrom childhood fights over silly things to sharing secrets at midnight, every moment with you has become a memory I hold close to my heart. You were never just my sister — you were my safe place, my best friend, my silent strength, and the person who understood me even when I couldn’t explain myself.\nNo matter how difficult life becomes, your smile somehow makes everything feel lighter.\nYou stood beside me in my happiest moments and held me together in my weakest ones. And honestly, I can never thank you enough for loving me the way you do.\nSometimes I wonder how life would have been without you… and the answer always feels empty. Because you are the reason so many of my memories feel warm, alive, and meaningful.\nYou are not just family to me.\nYou are a piece of my heart walking outside my body.\nNo matter where life takes us, no matter how much time passes, one thing will never change —\nI will always be there for you, protecting you, supporting you, and loving you endlessly.\nThank you for being my sister.\nThank you for being you.\nI may not say it every day… but deep inside, I know this very clearly:\nMy life is better because you are in it. ❤️`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section 
      id="sister-letter-section" 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent max-w-4xl mx-auto text-center space-y-10 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Header section with cute stickers */}
      <div className="space-y-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_rgba(18,18,18,1)]">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> Double Trouble Secret Note
        </div>
        <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight font-sans">
          A Letter To My Elder Sister
        </h2>
        <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
        <p className="text-xs text-slate-700 font-extrabold max-w-sm mx-auto uppercase">
          From sister to sister with endless love & late-night secrets
        </p>
      </div>

      {/* Main Interactive Envelope & Letter area */}
      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* Decorative background doodles */}
        <div className="absolute -top-10 -left-6 text-4xl select-none animate-bounce duration-1000 hidden sm:block">👩‍❤️‍👩</div>
        <div className="absolute -bottom-6 -right-6 text-4xl select-none animate-bounce duration-750 hidden sm:block">💌</div>

        <div className={`bg-white border-4 border-slate-950 rounded-3xl p-6 sm:p-10 ${accentBorderClass} transition-all duration-300 relative overflow-hidden`}>
          
          {/* Polka dots background texture patterns */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Letter cover envelope if not open */}
          {!isOpen ? (
            <div className="py-8 space-y-6 flex flex-col items-center justify-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-amber-100 border-3 border-slate-950 flex items-center justify-center shadow-[4px_4px_0px_#121212] relative scale-100 hover:scale-105 hover:-rotate-2 transition-transform duration-200">
                <Mail className="w-10 h-10 text-slate-950" />
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full border-2 border-slate-950 w-6 h-6 flex items-center justify-center text-[10px] font-black shadow-[1.5px_1.5px_0px_#121212] animate-bounce">
                  1
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-black text-xl text-slate-950 tracking-tight uppercase leading-none">
                  You Have a Sealed Souvenir Letter!
                </h3>
                <p className="text-xs text-slate-600 font-bold max-w-xs mx-auto leading-relaxed">
                  A custom customized secret letter waiting exclusively for {name}. Click the button below to peel open the wax seal.
                </p>
              </div>

              {/* Interaction button wrapper */}
              <button
                onClick={handleOpenLetter}
                className={`px-6 py-3.5 rounded-xl border-3 border-slate-950 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#121212] transition-transform hover:-translate-y-0.5 active:translate-y-0 select-none cursor-pointer flex items-center gap-2 ${buttonAccent}`}
              >
                <MailOpen className="w-4 h-4" /> Open Sisterly Letter
              </button>
            </div>
          ) : (
            /* Opened Letter block with beautiful neobrutalist presentation style */
            <div className="space-y-6 text-left animate-fade-in relative z-20">
              
              {/* Header inside letter */}
              <div className="border-b-3 border-slate-950 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="font-black text-2xl text-slate-950 tracking-tight font-sans leading-none flex items-center gap-1">
                    To My Sister <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse inline" />
                  </h3>
                  <span className="font-mono text-[9px] font-black text-slate-500 tracking-wider block mt-1 uppercase">
                    ✉️ INTIMATE BACKSTAGE CORRESPONDENCE • FROM SISTER TO SISTER
                  </span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopy}
                    className="flex-1 sm:flex-initial px-3 py-1.5 bg-slate-55 border-2 border-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_rgba(18,18,18,1)] flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      "Copy Letter"
                    )}
                  </button>
                  <button
                    onClick={handleOpenLetter}
                    className="flex-1 sm:flex-initial px-3 py-1.5 bg-[#FFD93D] text-slate-950 border-2 border-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_rgba(18,18,18,1)] flex items-center gap-1 cursor-pointer hover:bg-[#FFD93D]/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Note body with customized cursive handwritten tone */}
              <div className="space-y-4 font-sans text-sm text-slate-900 leading-relaxed font-semibold pl-1 pr-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-350 pt-2 border-b-2 border-dashed border-slate-200 pb-4">
                
                <p className="first-letter:text-4xl first-letter:font-black first-letter:text-[#FF4FA3] first-letter:float-left first-letter:mr-2">
                  Some people come into our lives and leave memories behind…
                  But you, my sister, became the most beautiful part of my life itself.
                </p>

                <p>
                  From childhood fights over silly things to sharing secrets at midnight, every moment with you has become a memory I hold close to my heart. You were never just my sister — you were my safe place, my best friend, my silent strength, and the person who understood me even when I couldn’t explain myself.
                </p>

                <p className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-xl italic font-medium text-slate-850">
                  No matter how difficult life becomes, your smile somehow makes everything feel lighter.
                  You stood beside me in my happiest moments and held me together in my weakest ones. And honestly, I can never thank you enough for loving me the way you do.
                </p>

                <p>
                  Sometimes I wonder how life would have been without you… and the answer always feels empty. Because you are the reason so many of my memories feel warm, alive, and meaningful.
                </p>

                <p className="text-center font-black py-2 tracking-wide uppercase border-y-2 border-slate-100 my-4 text-slate-950">
                   "You are not just family to me. You are a piece of my heart walking outside my body." 
                </p>

                <p>
                  No matter where life takes us, no matter how much time passes, one thing will never change — I will always be there for you, protecting you, supporting you, and loving you endlessly.
                </p>

                <p className="font-extrabold pb-2">
                  Thank you for being my sister. <br />
                  Thank you for being you.
                </p>

                <p className="text-[#FF4FA3] font-black text-base border-t border-slate-100 pt-4 flex items-center gap-2">
                  <span>I may not say it every day… but deep inside, I know this very clearly:</span>
                </p>
                <p className="text-xl font-black text-slate-950 tracking-tight">
                  My life is better because you are in it. ❤️
                </p>

              </div>

              {/* Signature block */}
              <div className="flex justify-between items-center pt-2">
                <div className="text-left font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  🔒 VERIFIED SOUL-SISTER CONTRACT
                </div>
                <div className="text-right">
                  <span className="block font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">SIGNED WITH LOVE,</span>
                  <span className="block text-base font-black text-slate-950 mt-1 uppercase font-serif tracking-wider">
                    Your Little Sister 👩‍❤️‍👩
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </section>
  );
}
