import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Disc3, Heart, Images, Play, Volume2 } from "lucide-react";
import { SlideshowCollection } from "../types";
import { playPopSfx, playSlideshowSoundtrack, stopSlideshowSoundtrack } from "../utils/audio";

interface PhotoSlideshowsProps {
  slideshows: SlideshowCollection[];
  themeColor: string;
}

const AUTO_ADVANCE_MS = 4200;

export default function PhotoSlideshows({ slideshows, themeColor }: PhotoSlideshowsProps) {
  const articleRefs = useRef<Record<string, HTMLElement | null>>({});
  const visibilityRatiosRef = useRef<Record<string, number>>({});
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(() =>
    slideshows.reduce<Record<string, number>>((acc, slideshow) => {
      acc[slideshow.id] = 0;
      return acc;
    }, {})
  );
  const [visibleSlideshowId, setVisibleSlideshowId] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndexes((prev) => {
      const next: Record<string, number> = {};
      slideshows.forEach((slideshow) => {
        next[slideshow.id] = prev[slideshow.id] ?? 0;
      });
      return next;
    });
  }, [slideshows]);

  useEffect(() => {
    const timers = slideshows.map((slideshow) =>
      window.setInterval(() => {
        setActiveIndexes((prev) => ({
          ...prev,
          [slideshow.id]: ((prev[slideshow.id] ?? 0) + 1) % slideshow.photos.length,
        }));
      }, AUTO_ADVANCE_MS)
    );

    return () => {
      timers.forEach((timer) => window.clearInterval(timer));
    };
  }, [slideshows]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slideshowId = (entry.target as HTMLElement).dataset.slideshowId;
          if (!slideshowId) return;
          visibilityRatiosRef.current[slideshowId] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        const mostVisible = (Object.entries(visibilityRatiosRef.current) as Array<[string, number]>)
          .filter(([, ratio]) => ratio >= 0.55)
          .sort((a, b) => b[1] - a[1])[0];

        setVisibleSlideshowId(mostVisible?.[0] ?? null);
      },
      {
        threshold: [0, 0.2, 0.4, 0.55, 0.7, 0.9],
        rootMargin: "-5% 0px -10% 0px",
      }
    );

    slideshows.forEach((slideshow) => {
      const node = articleRefs.current[slideshow.id];
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [slideshows]);

  const visibleSlideshow = useMemo(
    () => slideshows.find((slideshow) => slideshow.id === visibleSlideshowId) ?? null,
    [slideshows, visibleSlideshowId]
  );

  useEffect(() => {
    if (!visibleSlideshow) {
      stopSlideshowSoundtrack();
      return;
    }

    const loopTrack = () => {
      playSlideshowSoundtrack(visibleSlideshow.soundtrackId, 0.12, loopTrack);
    };

    playSlideshowSoundtrack(visibleSlideshow.soundtrackId, 0.12, loopTrack);
    return () => stopSlideshowSoundtrack();
  }, [visibleSlideshow]);

  const accentClass =
    themeColor === "rockstar-pink"
      ? "bg-[#FF4FA3] text-white"
      : themeColor === "retro-purple"
        ? "bg-[#6A00F4] text-white"
        : themeColor === "cyber-cyan"
          ? "bg-[#00D9FF] text-slate-950"
          : themeColor === "sweet-peach"
            ? "bg-[#FF4FA3] text-slate-950"
            : "bg-[#FFD93D] text-slate-950";

  const shadowClass =
    themeColor === "rockstar-pink"
      ? "shadow-[8px_8px_0px_0px_#FF4FA3]"
      : themeColor === "retro-purple"
        ? "shadow-[8px_8px_0px_0px_#6A00F4]"
        : themeColor === "cyber-cyan"
          ? "shadow-[8px_8px_0px_0px_#00D9FF]"
          : themeColor === "sweet-peach"
            ? "shadow-[8px_8px_0px_0px_#FF4FA3]"
            : "shadow-[8px_8px_0px_0px_#FFD93D]";

  const setSlide = (slideshowId: string, nextIndex: number) => {
    playPopSfx();
    setActiveIndexes((prev) => ({
      ...prev,
      [slideshowId]: nextIndex,
    }));
  };

  const shiftSlide = (slideshow: SlideshowCollection, direction: number) => {
    const currentIndex = activeIndexes[slideshow.id] ?? 0;
    const nextIndex = (currentIndex + direction + slideshow.photos.length) % slideshow.photos.length;
    setSlide(slideshow.id, nextIndex);
  };

  return (
    <section
      id="slideshows"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-b-4 border-slate-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-6xl mx-auto relative z-20 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-3 border-slate-950 text-xs font-mono font-black tracking-widest text-slate-800 uppercase shadow-[3px_3px_0px_#121212]">
            <Images className="w-3.5 h-3.5 text-[#FF4FA3]" /> Signature Slideshow Mix
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-slate-950 uppercase tracking-tight">
            Spotlight Photo Reels
          </h2>
          <div className="w-16 h-1.5 bg-slate-950 mx-auto rounded-full" />
          <p className="text-xs text-slate-800 font-medium max-w-2xl mx-auto">
            Three scrapbook-style reels, each with its own title card, curated photo set, and song cue to keep the mood in sync with the celebration theme.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {slideshows.map((slideshow) => {
            const activeIndex = activeIndexes[slideshow.id] ?? 0;
            const activePhoto = slideshow.photos[activeIndex];
            const isVisible = visibleSlideshowId === slideshow.id;

            return (
              <article
                key={slideshow.id}
                data-slideshow-id={slideshow.id}
                ref={(node) => {
                  articleRefs.current[slideshow.id] = node;
                }}
                className={`bg-white border-4 border-slate-950 rounded-[2rem] overflow-hidden ${shadowClass} flex flex-col`}
              >
                <div className="p-5 border-b-4 border-slate-950 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,255,255,0.78))]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-3 border-slate-950 bg-[#FFF7F9] text-[10px] font-mono font-black uppercase tracking-[0.25em] text-slate-800">
                        <Heart className="w-3 h-3 text-[#FF4FA3]" /> Photo Reel
                      </span>
                      <h3 className="text-2xl font-extrabold uppercase tracking-tight text-slate-950">
                        {slideshow.title}
                      </h3>
                    </div>

                    <div className={`shrink-0 px-3 py-2 rounded-2xl border-3 border-slate-950 ${accentClass}`}>
                      <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest">
                        <Disc3 className="w-3.5 h-3.5" /> Song Cue
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border-3 border-slate-950 bg-slate-950 text-white px-4 py-3">
                    <div className={`w-9 h-9 rounded-full border-2 border-white/80 ${accentClass} flex items-center justify-center`}>
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">Now featuring</p>
                      <p className="text-sm font-extrabold truncate">{slideshow.songTitle}</p>
                    </div>
                    <div className="sm:ml-auto inline-flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white/80">
                      <Volume2 className={`w-3.5 h-3.5 ${isVisible ? "text-[#FFD93D]" : "text-white/70"}`} />
                      {isVisible ? "Playing in view" : "Auto-play on view"}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-5 flex-1">
                  <div className="relative rounded-[1.5rem] border-4 border-slate-950 overflow-hidden bg-slate-950 aspect-[4/5] sm:aspect-[16/10]">
                    <img
                      src={activePhoto.image}
                      alt={slideshow.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent text-white">
                      <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/70">
                        Slide {activeIndex + 1} / {slideshow.photos.length}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-relaxed">{activePhoto.caption}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      onClick={() => shiftSlide(slideshow, -1)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border-3 border-slate-950 bg-white text-slate-950 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    <div className="flex items-center gap-2">
                      {slideshow.photos.map((photo, index) => (
                        <button
                          key={photo.id}
                          onClick={() => setSlide(slideshow.id, index)}
                          className={`h-3 rounded-full border-2 border-slate-950 transition-all cursor-pointer ${
                            index === activeIndex ? `${accentClass} w-8` : "bg-white w-3"
                          }`}
                          aria-label={`Show slide ${index + 1} from ${slideshow.title}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => shiftSlide(slideshow, 1)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-3 border-slate-950 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#121212] hover:-translate-y-0.5 transition-all cursor-pointer ${accentClass}`}
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {slideshow.photos.map((photo, index) => (
                      <button
                        key={`${slideshow.id}-${photo.id}`}
                        onClick={() => setSlide(slideshow.id, index)}
                        className={`rounded-2xl overflow-hidden border-3 transition-all cursor-pointer ${
                          index === activeIndex
                            ? "border-slate-950 shadow-[4px_4px_0px_#121212] -translate-y-1"
                            : "border-slate-300 hover:border-slate-950"
                        }`}
                      >
                        <img
                          src={photo.image}
                          alt={photo.caption}
                          className="w-full h-20 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
