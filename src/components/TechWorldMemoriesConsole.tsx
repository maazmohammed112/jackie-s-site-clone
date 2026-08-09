import { useState, useEffect } from "react";

export interface MemoryCartridge {
  id: string;
  code: string;
  title: string;
  date: string;
  location: string;
  tagline: string;
  image: string | null;
}

const MEMORIES: MemoryCartridge[] = [
  {
    id: "office-bakes",
    code: "CODE. COFFEE. REPEAT.ROM",
    title: "OFFICE BAKES",
    date: "2025",
    location: "CAFETERIA",
    tagline: "Late Night Coffee & Mug Cake Break",
    image: "/memories-office-bakes.jpg",
  },
  {
    id: "cognizant-codex",
    code: "OPENAI CODEX HACKATHON.ROM",
    title: "OPENAI CODEX HACKATHON",
    date: "2025",
    location: "COGNIZANT x OPENAI",
    tagline: "Engineering the Frontier Participant",
    image: "/memories-cognizant-codex.jpg",
  },
  {
    id: "slot-3",
    code: "SLOT 03",
    title: "SLOT 03",
    date: "2025",
    location: "STUDIO",
    tagline: "Empty Memory Slot",
    image: null,
  },
  {
    id: "slot-4",
    code: "SLOT 04",
    title: "SLOT 04",
    date: "2025",
    location: "LAB",
    tagline: "Empty Memory Slot",
    image: null,
  },
  {
    id: "slot-5",
    code: "SLOT 05",
    title: "SLOT 05",
    date: "2025",
    location: "PROD",
    tagline: "Empty Memory Slot",
    image: null,
  },
];

export default function TechWorldMemoriesConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(true);

  const activeMem = MEMORIES[activeIndex] ?? MEMORIES[0]!;

  // 1. Show title overlay for 3 seconds on cartridge selection, then fade out
  useEffect(() => {
    setShowTitleOverlay(true);
    const timer = setTimeout(() => {
      setShowTitleOverlay(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // 2. Auto-play slideshow cycles ONLY through cartridges that HAVE valid images
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    if (!MEMORIES[activeIndex]?.image) {
      setActiveIndex(0);
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MEMORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  };

  const handleStartToggle = () => {
    if (!isAutoPlaying && !MEMORIES[activeIndex]?.image) {
      setActiveIndex(0);
    }
    setIsAutoPlaying((p) => !p);
  };

  return (
    <section className="relative my-20 px-4 sm:px-6 max-w-5xl mx-auto select-none">
      
      {/* 1. RETRO HANDHELD GAME CONSOLE Header Banner */}
      <div className="relative mb-12 text-center">
        <div className="inline-block relative">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-2 border-[#201c16]/20 rounded-[4px] rotate-[-1deg]">
            <h2 className="font-['Silkscreen',monospace] text-xl sm:text-3xl font-bold tracking-wider uppercase text-[#201c16]">
              1. RETRO HANDHELD GAME CONSOLE
            </h2>
            <p className="font-['Caveat',cursive] text-xl sm:text-2xl font-bold text-primary italic mt-0.5">
              Insert Cartridge. Play Memories.
            </p>
          </div>
          {/* Tape Accent */}
          <span className="absolute -top-3 -left-6 w-20 h-6 bg-primary/40 rotate-[-15deg] shadow-sm pointer-events-none" />
          <span className="absolute -bottom-3 -right-6 w-20 h-6 bg-primary/40 rotate-[10deg] shadow-sm pointer-events-none" />
        </div>
      </div>

      {/* Main Container: Console (Left) + Cartridge Rack (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Transparent Handheld Game Console */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Transparent Acrylic Shell Container */}
          <div className="relative w-[310px] xs:w-[345px] sm:w-[385px] bg-[#1e2029]/80 backdrop-blur-md rounded-[42px] p-5 sm:p-6 border-4 border-white/25 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Inner Circuit Board Details */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 15%, rgba(255,215,0,0.4) 2px, transparent 2px),
                  radial-gradient(circle at 75% 85%, rgba(255,215,0,0.4) 2px, transparent 2px),
                  radial-gradient(circle at 85% 25%, rgba(255,255,255,0.4) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
                  linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: "36px 36px, 36px 36px, 36px 36px, 14px 14px, 14px 14px",
              }}
            />

            {/* Brass Screws */}
            <span className="absolute top-4 left-5 w-3.5 h-3.5 rounded-full border border-white/40 bg-zinc-800 shadow-inner flex items-center justify-center text-[8px] text-amber-200/80 font-bold">+</span>
            <span className="absolute top-4 right-5 w-3.5 h-3.5 rounded-full border border-white/40 bg-zinc-800 shadow-inner flex items-center justify-center text-[8px] text-amber-200/80 font-bold">+</span>
            <span className="absolute bottom-4 left-5 w-3.5 h-3.5 rounded-full border border-white/40 bg-zinc-800 shadow-inner flex items-center justify-center text-[8px] text-amber-200/80 font-bold">+</span>
            <span className="absolute bottom-4 right-5 w-3.5 h-3.5 rounded-full border border-white/40 bg-zinc-800 shadow-inner flex items-center justify-center text-[8px] text-amber-200/80 font-bold">+</span>

            {/* Screen Glass Bezel Area */}
            <div className="relative mb-5 bg-[#0a0c10] p-4 rounded-[24px] border-2 border-white/15 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]">
              
              {/* Bezel Title & Power LED */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_#ef4444]" />
                  </span>
                  <span className="font-['Silkscreen',monospace] text-[10px] text-red-400 font-bold tracking-wider">
                    POWER
                  </span>
                </div>
                <span className="font-['Silkscreen',monospace] text-[11px] sm:text-[12px] text-chalk/90 font-bold tracking-widest uppercase">
                  TECHWAZZY LIFE WORLD
                </span>
              </div>

              {/* Viewfinder Screen Box */}
              <div className="relative w-full h-[210px] xs:h-[235px] sm:h-[255px] rounded-[14px] overflow-hidden bg-black border-2 border-white/20 shadow-2xl">
                
                {/* Condition A: Photo Image Available */}
                {activeMem.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={activeMem.image}
                      alt={activeMem.title}
                      className="w-full h-full object-cover filter brightness-95 contrast-[1.05]"
                    />

                    {/* CRT Scanline Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-25"
                      style={{
                        backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
                        backgroundSize: "100% 4px",
                      }}
                    />

                    {/* LCD Pixel Text Overlay — Shows for 3 seconds then disappears */}
                    {showTitleOverlay && (
                      <div className="absolute bottom-3 inset-x-0 text-center z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-opacity duration-700 animate-fade-in">
                        <div className="font-['Silkscreen',monospace] text-sm sm:text-base text-yellow-300 font-bold tracking-wider">
                          {activeMem.title}
                        </div>
                        <div className="font-['Silkscreen',monospace] text-[11px] text-chalk/90 mt-1 animate-pulse">
                          Loading Memory...
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Condition B: NO IMAGE -> PURE CONTINUOUS SCREEN GLITCH ANIMATION WITH NO TITLE AND NO TEXT ON SCREEN AT ALL */
                  <div className="relative w-full h-full bg-[#030406] overflow-hidden flex items-center justify-center">
                    
                    {/* Continuous Red / Cyan RGB Glitch Scanlines */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-80 animate-pulse"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            0deg,
                            rgba(255, 0, 85, 0.35),
                            rgba(255, 0, 85, 0.35) 2px,
                            transparent 2px,
                            transparent 5px
                          ),
                          repeating-linear-gradient(
                            90deg,
                            rgba(0, 240, 255, 0.3),
                            rgba(0, 240, 255, 0.3) 3px,
                            transparent 3px,
                            transparent 7px
                          )
                        `,
                        backgroundSize: "100% 10px, 10px 100%",
                      }}
                    />

                    {/* Shifting Static Glitch Noise Strips */}
                    <div className="absolute top-1/5 inset-x-0 h-5 bg-cyan-400/50 mix-blend-screen animate-bounce" />
                    <div className="absolute top-1/2 inset-x-0 h-7 bg-red-500/50 mix-blend-screen animate-pulse" />
                    <div className="absolute bottom-1/4 inset-x-0 h-4 bg-yellow-300/40 mix-blend-screen animate-ping" />

                    {/* TV Static Noise Texture */}
                    <div
                      className="absolute inset-0 opacity-40 pointer-events-none"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle, #fff 1px, transparent 1px),
                          radial-gradient(circle, #000 1px, transparent 1px)
                        `,
                        backgroundSize: "6px 6px, 4px 4px",
                        backgroundPosition: "0 0, 2px 2px",
                      }}
                    />
                  </div>
                )}

              </div>
            </div>

            {/* Controls Section */}
            <div className="relative pt-2 pb-1 px-1 flex items-center justify-between">
              
              {/* D-Pad */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <div className="absolute w-full h-7 sm:h-8 bg-zinc-800 rounded-sm shadow-md border border-white/20" />
                <div className="absolute h-full w-7 sm:w-8 bg-zinc-800 rounded-sm shadow-md border border-white/20" />
                
                {/* D-Pad Buttons */}
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous Memory"
                  className="absolute left-0 w-6 h-6 hover:bg-white/20 active:bg-primary/50 rounded-l-sm transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next Memory"
                  className="absolute right-0 w-6 h-6 hover:bg-white/20 active:bg-primary/50 rounded-r-sm transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next Memory"
                  className="absolute top-0 w-6 h-6 hover:bg-white/20 active:bg-primary/50 rounded-t-sm transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous Memory"
                  className="absolute bottom-0 w-6 h-6 hover:bg-white/20 active:bg-primary/50 rounded-b-sm transition-colors cursor-pointer"
                />
                
                <div className="relative w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>

              {/* Translucent Red Action Buttons A & B */}
              <div className="flex items-center gap-3 sm:gap-4 rotate-[-15deg] pr-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Memory"
                  className="group relative flex flex-col items-center cursor-pointer active:scale-90 transition-transform"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-700/85 border-2 border-red-400/80 shadow-[0_4px_12px_rgba(220,38,38,0.6)] flex items-center justify-center text-white font-['Silkscreen',monospace] font-bold text-base group-hover:brightness-125">
                    B
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Memory"
                  className="group relative flex flex-col items-center cursor-pointer active:scale-90 transition-transform"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-700/85 border-2 border-red-400/80 shadow-[0_4px_12px_rgba(220,38,38,0.6)] flex items-center justify-center text-white font-['Silkscreen',monospace] font-bold text-base group-hover:brightness-125">
                    A
                  </div>
                </button>
              </div>

            </div>

            {/* Bottom Controls & Speaker Slits */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between px-2">
              
              {/* SELECT & START Pills */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex flex-col items-center cursor-pointer active:scale-95"
                >
                  <div className="w-9 h-3.5 bg-zinc-700 rounded-full border border-white/20 shadow-inner hover:bg-zinc-600" />
                  <span className="font-['Silkscreen',monospace] text-[8px] text-chalk/70 mt-1">
                    SELECT
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleStartToggle}
                  className="flex flex-col items-center cursor-pointer active:scale-95"
                >
                  <div className={`w-9 h-3.5 rounded-full border border-white/20 shadow-inner transition-colors ${isAutoPlaying ? "bg-primary shadow-[0_0_8px_#72f2d9]" : "bg-zinc-700 hover:bg-zinc-600"}`} />
                  <span className="font-['Silkscreen',monospace] text-[8px] text-chalk/70 mt-1">
                    {isAutoPlaying ? "STOP" : "START"}
                  </span>
                </button>
              </div>

              {/* Speaker Slits */}
              <div className="flex items-center gap-1.5 rotate-[-25deg] opacity-70">
                <span className="w-1 h-7 bg-zinc-800 rounded-full border-r border-white/10" />
                <span className="w-1 h-7 bg-zinc-800 rounded-full border-r border-white/10" />
                <span className="w-1 h-7 bg-zinc-800 rounded-full border-r border-white/10" />
                <span className="w-1 h-7 bg-zinc-800 rounded-full border-r border-white/10" />
              </div>

            </div>

          </div>

          {/* Bottom Left Pinned Paper Note */}
          <div className="relative mt-6 max-w-[280px] bg-[#f4ead6] text-[#201c16] p-3.5 rounded-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-[#201c16]/20 rotate-[-2.5deg]">
            <span className="absolute -top-2 left-4 w-3.5 h-3.5 rounded-full bg-red-600 shadow-md border border-white" />
            <p className="font-['Caveat',cursive] text-lg font-bold text-center leading-tight">
              Use [A] [B] to navigate memories!
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Cartridge Rack */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
          
          {/* Top Arrow Note */}
          <div className="relative mb-4 bg-[#f4ead6] text-[#201c16] px-4 py-2 rounded-[6px] shadow-md border border-[#201c16]/20 rotate-[1.5deg]">
            <p className="font-['Caveat',cursive] text-lg font-bold text-center lg:text-left">
              Choose your memory cartridge ⤵
            </p>
          </div>

          {/* Stack of 5 3D Cartridges (NO EMOJIS OR ICONS) */}
          <div className="w-full max-w-[340px] space-y-3.5">
            {MEMORIES.map((m, idx) => {
              const isActive = idx === activeIndex;
              const hasImage = Boolean(m.image);

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-[12px] transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? "bg-gradient-to-r from-[#444752] to-[#2c2f38] border-2 border-primary shadow-[0_0_20px_#72f2d9,inset_0_0_10px_#72f2d9] translate-x-2"
                      : "bg-[#2d3038] border border-white/15 hover:border-white/40 hover:bg-[#363942]"
                  }`}
                >
                  {/* Cartridge Recessed Sticker Label */}
                  <div className="bg-[#e8dec8] text-[#201c16] px-3.5 py-2 rounded-[6px] border border-[#201c16]/30 w-full shadow-inner">
                    {hasImage ? (
                      <>
                        <div className="font-['Silkscreen',monospace] text-[11px] sm:text-xs font-bold tracking-wide text-[#201c16] truncate">
                          {m.code}
                        </div>
                        <div className="font-['Space_Mono',monospace] text-[9px] font-bold text-emerald-700 mt-0.5">
                          ● READY
                        </div>
                      </>
                    ) : (
                      /* Clean side card text for unadded images: ONLY "NO IMAGE ADDED" */
                      <div className="font-['Silkscreen',monospace] text-[11px] sm:text-xs font-bold text-red-600 tracking-wider">
                        NO IMAGE ADDED
                      </div>
                    )}
                  </div>

                  {/* Active Neon Green Highlight Slot Dot */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_10px_#72f2d9] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Tape Banner */}
          <div className="relative mt-6 bg-[#f4ead6] text-[#201c16] px-5 py-2 rounded-[6px] shadow-md border border-[#201c16]/20 rotate-[-1deg]">
            <p className="font-['Caveat',cursive] text-lg font-bold text-center">
              Press START to begin ➔
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
