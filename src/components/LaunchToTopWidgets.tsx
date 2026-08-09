import { useState, useEffect } from "react";

export default function LaunchToTopWidgets() {
  const [isVisible, setIsVisible] = useState(false);

  // Widget 1: Origami Airplane States
  const [airplaneState, setAirplaneState] = useState<"idle" | "hover" | "pressed" | "launch">("idle");

  // Widget 2: Cartridge States
  const [cartridgeState, setCartridgeState] = useState<"idle" | "hover" | "pressed" | "eject">("idle");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAirplaneClick = () => {
    setAirplaneState("pressed");
    setTimeout(() => {
      setAirplaneState("launch");
      scrollToTop();
      setTimeout(() => setAirplaneState("idle"), 1000);
    }, 150);
  };

  const handleCartridgeClick = () => {
    setCartridgeState("pressed");
    setTimeout(() => {
      setCartridgeState("eject");
      scrollToTop();
      setTimeout(() => setCartridgeState("idle"), 1000);
    }, 150);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end gap-5 pointer-events-auto select-none animate-fade-in">
      
      {/* ------------------------------------------------------------------------- */}
      {/* WIDGET 1: PURE ORIGAMI 3D PAPER AIRPLANE (No Background Container Around It) */}
      {/* ------------------------------------------------------------------------- */}
      <div className="flex flex-col items-center group">
        
        {/* Floating Label Tooltip */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-['Caveat',cursive] text-xs text-chalk bg-[#181616] px-2 py-0.5 rounded-[4px] border border-white/20 shadow-md mb-1.5 whitespace-nowrap">
          Paper Plane Launch ✈️
        </span>

        <button
          type="button"
          onClick={handleAirplaneClick}
          onMouseEnter={() => airplaneState === "idle" && setAirplaneState("hover")}
          onMouseLeave={() => airplaneState === "hover" && setAirplaneState("idle")}
          aria-label="Launch paper plane to top of page"
          className={`relative p-1 flex items-center justify-center cursor-pointer transition-all duration-300 bg-transparent border-0 outline-none ${
            airplaneState === "hover"
              ? "scale-125 rotate-[-15deg] filter drop-shadow-[0_8px_20px_rgba(255,255,255,0.4)]"
              : airplaneState === "pressed"
              ? "scale-95"
              : airplaneState === "launch"
              ? "-translate-y-96 rotate-[-25deg] opacity-0 transition-all duration-700 ease-in-out"
              : "hover:scale-110"
          }`}
        >
          {/* Pure 3D Folded Origami Paper Plane SVG (No Background Container) */}
          <svg
            viewBox="0 0 100 100"
            className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          >
            {/* Main Fold Left Wing */}
            <polygon points="50,12 12,82 50,66" fill="#FFFFFF" stroke="#181616" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Right Wing Shadow Facet */}
            <polygon points="50,12 88,82 50,66" fill="#F3F4F6" stroke="#181616" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Center Fold Line */}
            <line x1="50" y1="12" x2="50" y2="88" stroke="#181616" strokeWidth="3" strokeLinecap="round" />
            
            {/* Bottom Left Keel Shadow */}
            <polygon points="50,66 12,82 50,88" fill="#E5E7EB" stroke="#181616" strokeWidth="2" />
          </svg>

          {/* Air Jet Thruster Lines on Hover/Launch */}
          {(airplaneState === "hover" || airplaneState === "launch") && (
            <div className="absolute -bottom-3 flex gap-1 animate-pulse">
              <span className="w-1 h-3.5 bg-white/70 rounded-full rotate-[-10deg]" />
              <span className="w-1 h-4 bg-white/90 rounded-full" />
              <span className="w-1 h-3.5 bg-white/70 rounded-full rotate-[10deg]" />
            </div>
          )}

        </button>

      </div>

      {/* ----------------------------------------------------------------- */}
      {/* WIDGET 2: RETRO GAMEBOY CARTRIDGE SPRING EJECTOR */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col items-center group">
        
        {/* Floating Label Tooltip */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-['Caveat',cursive] text-xs text-chalk bg-[#181616] px-2 py-0.5 rounded-[4px] border border-white/20 shadow-md mb-1.5 whitespace-nowrap">
          Spring Eject Cartridge 🎮
        </span>

        {/* Spring Coil Graphic (Visible when ejecting) */}
        {cartridgeState === "eject" && (
          <div className="absolute bottom-2 z-0 flex flex-col items-center animate-bounce">
            <span className="w-8 h-2 rounded-full border-2 border-zinc-400 bg-zinc-600" />
            <span className="w-7 h-2 rounded-full border-2 border-zinc-400 bg-zinc-700 -mt-1" />
            <span className="w-6 h-2 rounded-full border-2 border-zinc-400 bg-zinc-800 -mt-1" />
          </div>
        )}

        <button
          type="button"
          onClick={handleCartridgeClick}
          onMouseEnter={() => cartridgeState === "idle" && setCartridgeState("hover")}
          onMouseLeave={() => cartridgeState === "hover" && setCartridgeState("idle")}
          aria-label="Spring eject GameBoy cartridge to top of page"
          className={`relative z-10 w-16 h-18 sm:w-18 sm:h-20 bg-gradient-to-b from-[#6b7280] via-[#4b5563] to-[#374151] rounded-[7px] border-2 border-zinc-700 p-1.5 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.7)] ${
            cartridgeState === "hover"
              ? "scale-105 shadow-[0_0_22px_#4DFF9A] border-[#4DFF9A]"
              : cartridgeState === "pressed"
              ? "translate-y-2 scale-95"
              : cartridgeState === "eject"
              ? "-translate-y-96 opacity-0 transition-all duration-600 ease-out shadow-[0_0_30px_#4DFF9A]"
              : "hover:scale-105"
          }`}
        >
          {/* Top Notch Ridge Grip */}
          <div className="w-full flex justify-between px-1 pt-0.5 opacity-80">
            <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full shadow-inner" />
            <div className="flex gap-0.5">
              <span className="w-1 h-2 bg-zinc-800 rounded-sm" />
              <span className="w-1 h-2 bg-zinc-800 rounded-sm" />
              <span className="w-1 h-2 bg-zinc-800 rounded-sm" />
            </div>
            <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full shadow-inner" />
          </div>

          {/* Paper Label Sticker */}
          <div className="bg-[#eae2d0] text-[#201c16] p-1 rounded-[3px] border border-[#201c16]/40 text-center shadow-inner my-1 flex flex-col items-center justify-center">
            <span className="font-['Silkscreen',monospace] text-[8px] sm:text-[9px] font-bold tracking-wider text-[#201c16]">
              TOP
            </span>
            <svg
              className="w-4 h-4 text-[#047857] animate-pulse my-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </div>

          {/* Soft Neon Green Active Side Edge Glow Indicator */}
          <div className="flex justify-between items-center px-1 pb-0.5">
            <span className="font-['Silkscreen',monospace] text-[6px] text-zinc-300">AGY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DFF9A] shadow-[0_0_6px_#4DFF9A]" />
          </div>

        </button>

      </div>

    </div>
  );
}
