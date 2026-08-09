import { useState, useEffect } from "react";

export interface MemoryCartridge {
  id: string;
  code: string;
  sublabel: string;
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
    sublabel: "OFFICE BAKES",
    title: "OFFICE BAKES",
    date: "2025",
    location: "CAFETERIA",
    tagline: "Late Night Coffee & Mug Cake Break",
    image: "/memories-office-bakes.jpg",
  },
  {
    id: "cognizant-codex",
    code: "OPENAI CODEX HACKATHON.ROM",
    sublabel: "OPENAI CODEX",
    title: "OPENAI CODEX HACKATHON",
    date: "2025",
    location: "COGNIZANT x OPENAI",
    tagline: "Engineering the Frontier Participant",
    image: "/memories-cognizant-codex.jpg",
  },
  {
    id: "sap-flower",
    code: "SAP LEARNING ZEN.ROM",
    sublabel: "BOTANICAL CODE",
    title: "SAP LEARNING ZEN",
    date: "2025",
    location: "SAP SE",
    tagline: "When SAP Certification Meets Flower Power",
    image: "/memories-sap-flower.jpg",
  },
  {
    id: "train-commute",
    code: "EXPRESS COMMUTE DEVS.ROM",
    sublabel: "EXPRESS COMMUTE",
    title: "EXPRESS COMMUTE DEVS",
    date: "2025",
    location: "VANDE BHARAT",
    tagline: "Debugging at 160 km/h on Indian Railways",
    image: "/memories-train-commute.jpg",
  },
  {
    id: "mccafe-uno",
    code: "MCCAFE UNO STRATEGY.ROM",
    sublabel: "MCCAFE UNO",
    title: "MCCAFE UNO STRATEGY",
    date: "2025",
    location: "MCCAFE",
    tagline: "Draw +4 Cards & Fix Race Conditions",
    image: "/memories-mccafe-uno.jpg",
  },
];

export default function TechWorldMemoriesConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(true);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  const activeMem = MEMORIES[activeIndex] ?? MEMORIES[0]!;

  // 1. Show title overlay for 3 seconds on cartridge selection, then fade out
  useEffect(() => {
    setShowTitleOverlay(true);
    const timer = setTimeout(() => {
      setShowTitleOverlay(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // 2. Auto-play slideshow cycles smoothly through all 5 memory cartridges
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MEMORIES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    triggerBtnPress("A");
    setActiveIndex((prev) => (prev + 1) % MEMORIES.length);
  };

  const handlePrev = () => {
    triggerBtnPress("B");
    setActiveIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  };

  const triggerBtnPress = (btnName: string) => {
    setPressedBtn(btnName);
    setTimeout(() => setPressedBtn(null), 150);
  };

  const handleStartToggle = () => {
    triggerBtnPress("START");
    setIsAutoPlaying((p) => !p);
  };

  return (
    <section className="relative my-20 px-4 sm:px-6 max-w-5xl mx-auto select-none">
      
      {/* RETRO HANDHELD GAME CONSOLE Header Banner */}
      <div className="relative mb-12 text-center">
        <div className="inline-block relative">
          <div className="relative paper-grid torn-paper bg-[#f4ead6] text-[#201c16] px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-2 border-[#201c16]/20 rounded-[4px] rotate-[-1deg]">
            <h2 className="font-['Silkscreen',monospace] text-xl sm:text-3xl font-bold tracking-wider uppercase text-[#201c16]">
              RETRO HANDHELD GAME CONSOLE
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

      {/* Main Grid: Transparent Console (Left) + Cartridge Stack (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Transparent Handheld Game Console */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Transparent Acrylic Shell Container */}
          <div className="relative w-[310px] xs:w-[345px] sm:w-[385px] bg-[#1e2029]/85 backdrop-blur-md rounded-[42px] p-5 sm:p-6 border-4 border-white/25 shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            
            {/* Inner Circuit Board Lines & Screw Details */}
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

            {/* Screws */}
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
              <div
                onClick={() => window.dispatchEvent(new CustomEvent("maaz_screen_clicked"))}
                className="relative w-full h-[210px] xs:h-[235px] sm:h-[255px] rounded-[14px] overflow-hidden bg-black border-2 border-white/20 shadow-2xl cursor-pointer"
              >
                {/* Photo Image Display */}
                {activeMem.image && (
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
                      <div className="absolute bottom-3 inset-x-0 text-center z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-opacity duration-700 animate-fade-in px-2">
                        <div className="font-['Silkscreen',monospace] text-xs sm:text-sm text-yellow-300 font-bold tracking-wider truncate">
                          {activeMem.title}
                        </div>
                        <div className="font-['Space_Mono',monospace] text-[10px] text-chalk/90 mt-0.5 font-bold truncate">
                          {activeMem.tagline}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Controller Buttons Section */}
            <div className="relative pt-2 pb-1 px-1 flex items-center justify-between">
              
              {/* D-Pad */}
              <div className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center">
                <div className="absolute w-full h-8 sm:h-9 bg-gradient-to-b from-[#2a2c34] via-[#1a1b22] to-[#121318] rounded-sm shadow-[0_6px_14px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-black/80" />
                <div className="absolute h-full w-8 sm:w-9 bg-gradient-to-r from-[#2a2c34] via-[#1a1b22] to-[#121318] rounded-sm shadow-[0_6px_14px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-black/80" />
                
                {/* D-Pad Arrow Markings */}
                <span className="absolute left-2.5 text-[10px] text-zinc-500 font-bold pointer-events-none">◀</span>
                <span className="absolute right-2.5 text-[10px] text-zinc-500 font-bold pointer-events-none">▶</span>
                <span className="absolute top-2.5 text-[10px] text-zinc-500 font-bold pointer-events-none">▲</span>
                <span className="absolute bottom-2.5 text-[10px] text-zinc-500 font-bold pointer-events-none">▼</span>

                {/* Clickable Directional Buttons */}
                <button
                  type="button"
                  onClick={() => { triggerBtnPress("DPAD_LEFT"); handlePrev(); }}
                  title="Previous Memory"
                  className="absolute left-0 w-7 h-7 hover:bg-white/10 active:scale-95 rounded-l-sm transition-transform cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => { triggerBtnPress("DPAD_RIGHT"); handleNext(); }}
                  title="Next Memory"
                  className="absolute right-0 w-7 h-7 hover:bg-white/10 active:scale-95 rounded-r-sm transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => { triggerBtnPress("DPAD_UP"); handleNext(); }}
                  title="Next Memory"
                  className="absolute top-0 w-7 h-7 hover:bg-white/10 active:scale-95 rounded-t-sm transition-colors cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => { triggerBtnPress("DPAD_DOWN"); handlePrev(); }}
                  title="Previous Memory"
                  className="absolute bottom-0 w-7 h-7 hover:bg-white/10 active:scale-95 rounded-b-sm transition-colors cursor-pointer"
                />
                
                <div className="relative w-3.5 h-3.5 rounded-full bg-[#121318] shadow-inner border border-zinc-800" />
              </div>

              {/* A & B Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 rotate-[-15deg] pr-1">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Memory (B Button)"
                    className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#c81e1e] via-[#9b1313] to-[#680b0b] border-2 border-red-400/70 shadow-[0_6px_16px_rgba(180,20,20,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center text-white font-['Silkscreen',monospace] font-bold text-base transition-all duration-150 cursor-pointer ${
                      pressedBtn === "B" ? "translate-y-1 shadow-[0_2px_6px_rgba(180,20,20,0.6)]" : "hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="absolute top-1 left-2.5 w-4 h-2 rounded-full bg-white/40 blur-[1px] pointer-events-none" />
                    B
                  </button>
                  <span className="font-['Silkscreen',monospace] text-[9px] text-chalk/80 font-bold mt-1">
                    B
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Memory (A Button)"
                    className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#c81e1e] via-[#9b1313] to-[#680b0b] border-2 border-red-400/70 shadow-[0_6px_16px_rgba(180,20,20,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center text-white font-['Silkscreen',monospace] font-bold text-base transition-all duration-150 cursor-pointer ${
                      pressedBtn === "A" ? "translate-y-1 shadow-[0_2px_6px_rgba(180,20,20,0.6)]" : "hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="absolute top-1 left-2.5 w-4 h-2 rounded-full bg-white/40 blur-[1px] pointer-events-none" />
                    A
                  </button>
                  <span className="font-['Silkscreen',monospace] text-[9px] text-chalk/80 font-bold mt-1">
                    A
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Controls & Speaker Slits */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between px-2">
              <div className="flex items-center gap-4 rotate-[-12deg]">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => { triggerBtnPress("SELECT"); handleNext(); }}
                    className={`w-9 h-3.5 bg-gradient-to-b from-[#3a3d46] to-[#1c1e24] rounded-full border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all cursor-pointer ${
                      pressedBtn === "SELECT" ? "scale-95 bg-zinc-800" : "hover:brightness-125"
                    }`}
                  />
                  <span className="font-['Silkscreen',monospace] text-[8px] text-chalk/70 font-bold mt-1">
                    SELECT
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={handleStartToggle}
                    className={`w-9 h-3.5 rounded-full border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all cursor-pointer ${
                      isAutoPlaying ? "bg-[#4DFF9A] shadow-[0_0_10px_#4DFF9A]" : "bg-gradient-to-b from-[#3a3d46] to-[#1c1e24] hover:brightness-125"
                    } ${pressedBtn === "START" ? "scale-95" : ""}`}
                  />
                  <span className="font-['Silkscreen',monospace] text-[8px] text-chalk/70 font-bold mt-1">
                    START
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rotate-[-25deg] opacity-80">
                <span className="w-1.5 h-7 bg-zinc-900 rounded-full border-r border-white/20 shadow-inner" />
                <span className="w-1.5 h-7 bg-zinc-900 rounded-full border-r border-white/20 shadow-inner" />
                <span className="w-1.5 h-7 bg-zinc-900 rounded-full border-r border-white/20 shadow-inner" />
                <span className="w-1.5 h-7 bg-zinc-800 rounded-full border-r border-white/20 shadow-inner" />
                <span className="w-1.5 h-7 bg-zinc-800 rounded-full border-r border-white/20 shadow-inner" />
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

        {/* RIGHT COLUMN: GameBoy Cartridge Stack */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
          
          {/* Top Arrow Note */}
          <div className="relative mb-4 bg-[#f4ead6] text-[#201c16] px-4 py-2 rounded-[6px] shadow-md border border-[#201c16]/20 rotate-[1.5deg]">
            <p className="font-['Caveat',cursive] text-lg font-bold text-center lg:text-left">
              Choose your memory cartridge ⤵
            </p>
          </div>

          {/* Stack of 5 3D Cartridges (ALL 5 CARTRIDGES UNLOCKED WITH REAL PHOTOS) */}
          <div className="w-full max-w-[340px] space-y-3.5">
            {MEMORIES.map((m, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative w-full h-[78px] sm:h-[84px] rounded-[10px] p-2 sm:p-2.5 transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? "bg-gradient-to-b from-[#4a4d56] via-[#383b44] to-[#24262d] -translate-y-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.85)] scale-[1.02]"
                      : "bg-gradient-to-b from-[#3d4048] via-[#2f3138] to-[#1e2025] hover:-translate-y-1.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.75)] shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "0 16px 36px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.6)"
                      : "0 8px 20px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Left & Right Injection-Molded Grooves */}
                  <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-70">
                    <span className="w-1 h-3 bg-black/50 rounded-full" />
                    <span className="w-1 h-3 bg-black/50 rounded-full" />
                    <span className="w-1 h-3 bg-black/50 rounded-full" />
                  </div>
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-70">
                    <span className="w-1 h-3 bg-black/50 rounded-full" />
                    <span className="w-1 h-3 bg-black/50 rounded-full" />
                    <span className="w-1 h-3 bg-black/50 rounded-full" />
                  </div>

                  {/* ACTIVE CARTRIDGE NEON GREEN SIDE GLOW (#4DFF9A) */}
                  {isActive && (
                    <>
                      <div className="absolute -left-2 top-0 bottom-0 w-3 rounded-l-[8px] bg-[#4DFF9A] shadow-[0_0_25px_#4DFF9A,inset_0_0_10px_#4DFF9A] opacity-90 animate-pulse pointer-events-none" />
                      <div className="absolute -right-2 top-0 bottom-0 w-3 rounded-r-[8px] bg-[#4DFF9A] shadow-[0_0_25px_#4DFF9A,inset_0_0_10px_#4DFF9A] opacity-90 animate-pulse pointer-events-none" />
                    </>
                  )}

                  {/* Recessed Sticker Label (#EAE2D0 Warm Off-White Paper Texture) */}
                  <div className="mx-2.5 h-full bg-[#EAE2D0] text-[#1F1F1F] px-3.5 py-2 rounded-[5px] border border-[#1F1F1F]/40 flex flex-col justify-between shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]">
                    <div className="font-['Silkscreen',monospace] text-[11px] sm:text-xs font-bold tracking-wide text-[#1F1F1F] truncate">
                      {m.code}
                    </div>
                    <div className="font-['Space_Mono',monospace] text-[9px] font-bold tracking-wider text-emerald-800">
                      ● {m.sublabel}
                    </div>
                  </div>
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
