import { useState, useEffect } from "react";

type FlightDestination = {
  id: string;
  label: string;
  subtitle: string;
  anchorId: string | null;
};

const DESTINATIONS: FlightDestination[] = [
  { id: "top", label: "HOME / LAUNCHPAD", subtitle: "FLIGHT 01 • TOP OF PAGE", anchorId: null },
  { id: "work", label: "WORK & PROJECTS", subtitle: "FLIGHT 02 • PROJECT TERMINAL", anchorId: "work" },
  { id: "experience", label: "SAP & EXPERIENCE", subtitle: "FLIGHT 03 • CAREER TIMELINE", anchorId: "experience" },
  { id: "education", label: "EDUCATION & DEGREE", subtitle: "FLIGHT 04 • B.E. DATA SCIENCE", anchorId: "education" },
  { id: "certifications", label: "CERTIFICATIONS", subtitle: "FLIGHT 05 • SAP & AI BADGES", anchorId: "certifications" },
  { id: "memories", label: "TECH MEMORIES CONSOLE", subtitle: "FLIGHT 06 • RETRO LCD CONSOLE", anchorId: "memories" },
  { id: "guestbook", label: "STUDIO GUESTBOOK", subtitle: "FLIGHT 07 • REACTION STAMP BOARD", anchorId: "guestbook" },
  { id: "connect", label: "CONNECT & CONTACT", subtitle: "FLIGHT 08 • LET'S CHAT & EMAIL", anchorId: "connect" },
];

export default function LaunchToTopWidgets() {
  const [isVisible, setIsVisible] = useState(false);
  const [airplaneState, setAirplaneState] = useState<"idle" | "hover" | "pressed" | "launch">("idle");
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string>("top");
  const [boardingTicket, setBoardingTicket] = useState<string | null>(null);

  // 1. Monitor scroll visibility & active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsVisible(scrollPos > 250);

      if (scrollPos < 300) {
        setCurrentSectionId("top");
        return;
      }

      // Check section anchor scroll positions in reverse order
      for (let i = DESTINATIONS.length - 1; i >= 0; i--) {
        const dest = DESTINATIONS[i];
        if (!dest || !dest.anchorId) continue;
        const el = document.getElementById(dest.anchorId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top - 250) {
            setCurrentSectionId(dest.id);
            return;
          }
        }
      }
      setCurrentSectionId("top");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePlaneClick = () => {
    setAirplaneState("pressed");
    setTimeout(() => {
      setAirplaneState("idle");
      setShowPhoneModal((prev) => !prev);
    }, 150);
  };

  const handleSelectFlightTicket = (dest: FlightDestination, e: React.MouseEvent) => {
    e.stopPropagation();
    setBoardingTicket(dest.label);
    setAirplaneState("launch");

    setTimeout(() => {
      if (dest.anchorId) {
        const targetEl = document.getElementById(dest.anchorId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      setTimeout(() => {
        setShowPhoneModal(false);
        setBoardingTicket(null);
        setAirplaneState("idle");
      }, 500);
    }, 350);
  };

  const currentDest = DESTINATIONS.find((d) => d.id === currentSectionId) || DESTINATIONS[0]!;
  const availableDestinations = DESTINATIONS.filter((d) => d.id !== currentSectionId);

  if (!isVisible) return null;

  return (
    <>
      {/* RETRO PHONE FLIGHT BOARDING TERMINAL MODAL */}
      {showPhoneModal && (
        <div
          onClick={() => {
            window.dispatchEvent(new CustomEvent("maaz_cracked_phone_clicked"));
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none cursor-pointer"
        >
          {/* Subtle Micro-Glitch CSS (Screen Content Only, Phone Shell Stays Still) */}
          <style>{`
            @keyframes screenGlitchBurst {
              0%, 100% { transform: translate(0, 0); filter: none; }
              38% { transform: translate(0, 0); filter: none; }
              39% { transform: translate(-1.5px, 0.5px); filter: drop-shadow(2px 0 #ff2e88) drop-shadow(-2px 0 #21e6d6); }
              40% { transform: translate(1px, -1px); filter: none; }
              41% { transform: translate(0, 0); }
              75% { transform: translate(0, 0); filter: none; }
              76% { transform: translate(1.5px, -0.5px); filter: drop-shadow(-2px 0 #ff2e88); }
              77% { transform: translate(-1px, 0.5px); filter: none; }
            }
            .screen-glitch-active {
              animation: screenGlitchBurst 3.2s ease-in-out infinite;
            }
          `}</style>

          {/* Smartphone Outer Shell Container - Clicking inside triggers Maaz cracked phone funny message */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent("maaz_cracked_phone_clicked"));
            }}
            className="relative w-full max-w-[360px] sm:max-w-[390px] bg-[#1a1816] text-[#201c16] rounded-[42px] p-3.5 sm:p-4 border-[6px] border-[#2d2823] shadow-[0_30px_90px_rgba(0,0,0,0.95)] rotate-[-1deg] transition-none cursor-pointer overflow-hidden"
          >
            {/* Matching Phone Engraved Brand Name at Top Bezel */}
            <div className="flex items-center justify-between px-3 mb-1 text-[8px] font-['Silkscreen',monospace] text-zinc-500 tracking-widest uppercase">
              <span>TECHWAZZY</span>
              <span className="text-zinc-600 font-bold">P-1 PRO 5G</span>
            </div>

            {/* Phone Speaker Notch & Front Camera */}
            <div className="w-24 h-4 bg-[#0d0c0b] rounded-full mx-auto mb-2.5 flex items-center justify-center gap-2 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
              <span className="w-8 h-1 bg-zinc-700 rounded-full" />
            </div>

            {/* Clean Rounded Smartphone Glass Display */}
            <div className="relative bg-[#f4ead6] text-[#201c16] rounded-[28px] p-4 font-['Space_Mono',monospace] shadow-inner overflow-hidden border border-[#201c16]/25">
              
              {/* Glass Crack SVG Lines Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-20"
                viewBox="0 0 300 450"
                fill="none"
                stroke="#181616"
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                {/* Hairline Spiderweb Glass Cracks */}
                <path d="M 40 0 L 75 60 L 110 95 L 180 120 M 110 95 L 80 150 M 75 60 L 20 80 M 180 120 L 230 135" />
                <path d="M 75 60 L 130 50" strokeWidth="0.8" opacity="0.7" />
                <path d="M 300 380 L 240 350 L 190 370 L 140 450 M 190 370 L 220 420" strokeWidth="1" />
              </svg>

              {/* CRT Scanline Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-15 z-10"
                style={{
                  background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 4px)",
                }}
              />

              {/* Screen Content Wrapper with Controlled Glitches */}
              <div className="screen-glitch-active">
                
                {/* Screen Top Status Bar */}
                <div className="relative z-10 flex items-center justify-between text-[10px] text-[#201c16]/70 border-b border-[#201c16]/15 pb-2 mb-3">
                  <span className="font-bold tracking-widest font-['Silkscreen',monospace]">MAAZ TERMINAL</span>
                  <span className="text-[9px] bg-[#201c16]/10 px-2 py-0.5 rounded-[3px] font-bold">SYS v2.0</span>
                </div>

                {/* Current Location Badge */}
                <div className="relative z-10 bg-[#e8dec8] p-2.5 rounded-[10px] border border-[#201c16]/20 mb-3 text-center shadow-xs">
                  <div className="text-[9px] text-[#201c16]/70 font-bold uppercase tracking-widest">
                    CURRENT LOCATION
                  </div>
                  <div className="font-['Silkscreen',monospace] text-xs font-bold text-primary truncate mt-0.5">
                    {currentDest.label}
                  </div>
                </div>

                {/* Instructions Subtitle */}
                <div className="relative z-10 font-['Caveat',cursive] text-base font-bold text-center text-[#201c16] mb-2.5">
                  Where would you like to navigate? Select a ticket:
                </div>

                {/* Boarding Pass Ticket Stamp Animation when clicked */}
                {boardingTicket ? (
                  <div className="relative z-10 my-8 text-center p-5 bg-[#fff7d1] rounded-[12px] border-2 border-dashed border-[#201c16]/30 animate-pulse shadow-md">
                    <div className="font-['Silkscreen',monospace] text-xs font-bold text-emerald-800 uppercase tracking-widest">
                      CONFIRMED
                    </div>
                    <div className="font-['Caveat',cursive] text-lg font-extrabold text-[#201c16] mt-1">
                      Navigating to {boardingTicket}...
                    </div>
                  </div>
                ) : (
                  /* Available Destinations Ticket List */
                  <div className="relative z-10 max-h-[320px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {availableDestinations.map((dest) => (
                      <div
                        key={dest.id}
                        onClick={(e) => handleSelectFlightTicket(dest, e)}
                        className="group relative bg-[#fff7d1] hover:bg-white text-[#201c16] p-2.5 rounded-[10px] border-2 border-[#201c16]/25 hover:border-primary shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between hover:scale-[1.02] active:scale-95"
                      >
                        {/* Left Side Ticket Info */}
                        <div className="overflow-hidden">
                          <div className="font-['Silkscreen',monospace] text-[11px] font-bold text-[#201c16] group-hover:text-primary transition-colors truncate">
                            {dest.label}
                          </div>
                          <div className="font-['Space_Mono',monospace] text-[9px] text-[#201c16]/60 truncate">
                            {dest.subtitle}
                          </div>
                        </div>

                        {/* Board Ticket Arrow Action */}
                        <div className="shrink-0 font-['Silkscreen',monospace] text-[9px] bg-[#201c16] text-[#f4ead6] group-hover:bg-primary group-hover:text-white px-2 py-1 rounded-[4px] font-bold transition-colors shadow-xs">
                          GO ➔
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Phone Action Buttons */}
                <div className="relative z-10 mt-3.5 pt-2.5 border-t border-[#201c16]/15 flex items-center justify-between">
                  <span className="font-['Caveat',cursive] text-xs text-[#201c16]/70 italic">
                    Tap plane or close to dismiss
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPhoneModal(false);
                    }}
                    className="font-['Silkscreen',monospace] text-[10px] font-bold bg-[#e8dec8] text-[#201c16] px-3 py-1 rounded-[6px] border border-[#201c16]/30 hover:bg-white active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    CLOSE ✕
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Phone Home Indicator Bar & Brand Subtitle */}
            <div className="flex items-center justify-between px-3 mt-2">
              <span className="text-[7px] font-['Silkscreen',monospace] text-zinc-600">PROTOTYPE</span>
              <div className="w-16 h-1 bg-zinc-600 rounded-full" />
              <span className="text-[7px] font-['Silkscreen',monospace] text-zinc-600">STUDIO OS</span>
            </div>

          </div>

        </div>
      )}

      {/* FLOATING ORIGAMI PAPER AIRPLANE WIDGET */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-20 lg:right-24 z-50 flex items-end pointer-events-auto select-none animate-fade-in">
        
        <div className="flex flex-col items-center group relative">
          
          {/* Floating Tooltip Label */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-['Caveat',cursive] text-xs text-chalk bg-[#181616] px-2.5 py-0.5 rounded-[4px] border border-white/20 shadow-md mb-1.5 whitespace-nowrap pointer-events-none">
            Flight Terminal & Nav
          </span>

          <button
            type="button"
            onClick={handlePlaneClick}
            onMouseEnter={() => airplaneState === "idle" && setAirplaneState("hover")}
            onMouseLeave={() => airplaneState === "hover" && setAirplaneState("idle")}
            aria-label="Open flight terminal navigation phone modal"
            className={`relative p-1 flex items-center justify-center cursor-pointer transition-all duration-300 bg-transparent border-0 outline-none ${
              airplaneState === "hover"
                ? "scale-125 rotate-[-15deg] filter drop-shadow-[0_8px_18px_rgba(255,255,255,0.45)]"
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
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]"
            >
              {/* Main Fold Left Wing */}
              <polygon points="50,12 12,82 50,66" fill="#FFFFFF" stroke="#181616" strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Right Wing Shadow Facet */}
              <polygon points="50,12 88,82 50,66" fill="#F3F4F6" stroke="#181616" strokeWidth="3.5" strokeLinejoin="round" />
              
              {/* Center Fold Line */}
              <line x1="50" y1="12" x2="50" y2="88" stroke="#181616" strokeWidth="3.5" strokeLinecap="round" />
              
              {/* Bottom Left Keel Shadow */}
              <polygon points="50,66 12,82 50,88" fill="#E5E7EB" stroke="#181616" strokeWidth="2.5" />
            </svg>

            {/* Curved Swirling Air Release Trails */}
            {(airplaneState === "hover" || airplaneState === "launch") && (
              <svg
                className="absolute -bottom-5 w-12 h-6 text-white/80 animate-pulse pointer-events-none"
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
    </>
  );
}
