import { useState, useEffect } from "react";

export default function LaunchToTopWidgets() {
  const [isVisible, setIsVisible] = useState(false);
  const [airplaneState, setAirplaneState] = useState<"idle" | "hover" | "pressed" | "launch">("idle");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
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

  if (!isVisible) return null;

  return (
    /* Positioned clear of the 70px right vertical stamp icon rail (right-20 sm:right-24 md:right-28 lg:right-32) */
    <div className="fixed bottom-4 right-20 sm:bottom-6 sm:right-24 md:right-28 lg:right-32 z-50 flex items-end pointer-events-auto select-none animate-fade-in">
      
      {/* PURE ORIGAMI 3D PAPER AIRPLANE WITH CURVED AIR RELEASE TRAILS */}
      <div className="flex flex-col items-center group relative">
        
        {/* Floating Tooltip Label */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-['Caveat',cursive] text-xs text-chalk bg-[#181616] px-2 py-0.5 rounded-[4px] border border-white/20 shadow-md mb-1.5 whitespace-nowrap">
          Launch to Top ✈️
        </span>

        <button
          type="button"
          onClick={handleAirplaneClick}
          onMouseEnter={() => airplaneState === "idle" && setAirplaneState("hover")}
          onMouseLeave={() => airplaneState === "hover" && setAirplaneState("idle")}
          aria-label="Launch paper plane to top of page"
          className={`relative p-1.5 flex items-center justify-center cursor-pointer transition-all duration-300 bg-transparent border-0 outline-none ${
            airplaneState === "hover"
              ? "scale-125 rotate-[-15deg] filter drop-shadow-[0_10px_22px_rgba(255,255,255,0.45)]"
              : airplaneState === "pressed"
              ? "scale-90"
              : airplaneState === "launch"
              ? "-translate-y-96 rotate-[-25deg] opacity-0 transition-all duration-700 ease-in-out"
              : "hover:scale-110 active:scale-95"
          }`}
        >
          {/* Pure 3D Folded Origami Paper Plane SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)]"
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

          {/* Curved Swirling Air Release Trails (Visible on hover or launch) */}
          {(airplaneState === "hover" || airplaneState === "launch") && (
            <svg
              className="absolute -bottom-6 w-16 h-8 text-white/80 animate-pulse pointer-events-none"
              viewBox="0 0 60 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {/* Left Swirl Curve */}
              <path d="M 15 2 Q 10 12, 5 22 Q 2 26, 0 30" strokeDasharray="3 3" />
              {/* Center Main Curve */}
              <path d="M 30 0 Q 32 15, 28 30" strokeDasharray="4 2" />
              {/* Right Swirl Curve */}
              <path d="M 45 2 Q 50 12, 55 22 Q 58 26, 60 30" strokeDasharray="3 3" />
            </svg>
          )}

        </button>

      </div>

    </div>
  );
}
