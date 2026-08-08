import { useState, useEffect, type ReactNode } from "react";

interface DoodleItem {
  id: string;
  message: string;
  renderSvg: () => ReactNode;
}

const LEFT_DOODLES: DoodleItem[] = [
  {
    id: "juice",
    message: "Keep the creative energy flowing.",
    renderSvg: () => (
      <svg viewBox="0 0 100 130" className="w-14 h-18 sm:w-18 sm:h-22 overflow-visible">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 45 30 L 35 8 L 22 14 L 28 32" />
          <polygon points="30,32 70,32 80,45 20,45" />
          <line x1="50" y1="32" x2="50" y2="45" />
          <polygon points="20,45 80,45 80,110 20,110" />
          <polygon points="80,45 92,38 92,100 80,110" />
          <line x1="70" y1="32" x2="92" y2="38" />
          <circle cx="50" cy="78" r="14" />
          <path d="M 50 64 C 52 58, 58 58, 60 62" />
          <circle cx="45" cy="74" r="1.5" fill="currentColor" />
          <circle cx="55" cy="74" r="1.5" fill="currentColor" />
          <path d="M 45 84 Q 50 88 55 84" />
        </g>
      </svg>
    ),
  },
  {
    id: "coffee",
    message: "Coffee into clean automation.",
    renderSvg: () => (
      <svg viewBox="0 0 110 100" className="w-14 h-14 sm:w-18 sm:h-18 overflow-visible">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="25" y="35" width="45" height="50" rx="8" />
          <path d="M 70 45 C 85 45, 85 70, 70 75" />
          <path d="M 35 25 Q 40 15 35 8" />
          <path d="M 50 25 Q 55 15 50 8" />
          <path d="M 60 25 Q 65 15 60 8" />
          <path d="M 36 55 L 42 60 L 36 65" />
          <path d="M 58 55 L 52 60 L 58 65" />
          <line x1="48" y1="54" x2="46" y2="66" />
        </g>
      </svg>
    ),
  },
  {
    id: "fish",
    message: "Smooth workflows in motion.",
    renderSvg: () => (
      <svg viewBox="0 0 140 90" className="w-18 h-12 sm:w-22 sm:h-14 overflow-visible">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 40 45 C 50 20, 100 20, 120 45 C 100 70, 50 70, 40 45 Z" />
          <path d="M 40 45 L 15 25 L 25 45 L 15 65 Z" />
          <path d="M 75 24 C 80 12, 95 15, 95 24" />
          <path d="M 75 66 C 80 78, 92 75, 90 66" />
          <circle cx="102" cy="40" r="5" />
          <circle cx="103" cy="39" r="2" fill="currentColor" />
          <path d="M 112 48 Q 108 53 104 50" />
          <path d="M 85 36 C 80 42, 80 48, 85 54" />
          <circle cx="128" cy="30" r="3.5" />
          <circle cx="134" cy="20" r="2.5" />
          <circle cx="137" cy="12" r="1.5" />
        </g>
      </svg>
    ),
  },
];

const RIGHT_DOODLES: DoodleItem[] = [
  {
    id: "tea",
    message: "Tea fuels focus and problem solving.",
    renderSvg: () => (
      <svg viewBox="0 0 110 90" className="w-16 h-14 sm:w-18 sm:h-16 overflow-visible">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 35 20 Q 40 10 35 4" />
          <path d="M 50 18 Q 55 8 50 2" />
          <path d="M 65 20 Q 70 10 65 4" />
          <circle cx="50" cy="24" r="3" fill="currentColor" />
          <path d="M 32 30 C 32 24, 68 24, 68 30 Z" />
          <path d="M 22 36 C 18 68, 82 68, 78 36 Z" />
          <line x1="20" y1="36" x2="80" y2="36" />
          <path d="M 35 66 L 35 72 L 65 72 L 65 66" />
          <path d="M 78 40 C 95 40, 95 60, 75 62" />
          <path d="M 22 42 C 8 36, 6 24, 14 22 L 18 34" />
        </g>
      </svg>
    ),
  },
  {
    id: "noodle",
    message: "Fresh ideas served hot.",
    renderSvg: () => (
      <svg viewBox="0 0 110 90" className="w-14 h-12 sm:w-18 sm:h-14 overflow-visible">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1="15" y1="28" x2="95" y2="18" />
          <line x1="12" y1="36" x2="92" y2="24" />
          <path d="M 35 22 Q 40 12 35 5" />
          <path d="M 50 20 Q 55 10 50 3" />
          <path d="M 65 22 Q 70 12 65 5" />
          <ellipse cx="50" cy="36" rx="40" ry="10" />
          <path d="M 10 36 C 10 70, 30 80, 50 80 C 70 80, 90 70, 90 36" />
          <path d="M 35 80 L 35 86 L 65 86 L 65 80" />
          <path d="M 25 36 Q 35 44 45 36 Q 55 44 65 36 Q 75 44 80 36" />
        </g>
      </svg>
    ),
  },
  {
    id: "dino",
    message: "Conquer complex technical challenges.",
    renderSvg: () => (
      <svg viewBox="0 0 110 110" className="w-14 h-14 sm:w-18 sm:h-18 overflow-visible">
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 50 30 C 50 15, 80 15, 85 30 L 90 40 L 70 40 L 70 45 L 85 45 L 80 55 C 70 60, 55 55, 50 45 Z" />
          <circle cx="70" cy="26" r="3" fill="currentColor" />
          <path d="M 48 30 L 40 22 L 44 36 L 36 30 L 40 44 L 30 40 L 36 52" />
          <path d="M 92 38 Q 100 32 105 38 Q 98 44 92 42" />
          <path d="M 94 44 Q 102 42 106 48 Q 98 52 94 48" />
          <path d="M 50 45 C 40 50, 35 65, 45 80 L 40 95 L 55 95 L 60 82 C 70 82, 75 75, 75 60 Z" />
          <path d="M 60 52 L 68 56 L 65 60" />
        </g>
      </svg>
    ),
  },
];

export default function MarginDoodles() {
  const [activeDoodle, setActiveDoodle] = useState<string | null>(null);

  // Auto-close doodle popups whenever user scrolls
  useEffect(() => {
    const onScroll = () => setActiveDoodle(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* LEFT MARGIN DOODLES (Placed clear of 70px left stamp rail at left-[85px] lg:left-[110px]) */}
      <div className="fixed top-28 left-[85px] lg:left-[110px] xl:left-[140px] z-30 flex flex-col gap-24 lg:gap-32 pointer-events-none hidden md:flex">
        {LEFT_DOODLES.map((d) => {
          const isOpen = activeDoodle === d.id;
          return (
            <div key={d.id} className="relative group pointer-events-auto">
              <button
                type="button"
                onClick={() => setActiveDoodle(isOpen ? null : d.id)}
                onMouseEnter={() => setActiveDoodle(d.id)}
                onMouseLeave={() => setActiveDoodle(null)}
                className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 text-chalk/50 hover:text-chalk bg-transparent border-0 outline-none"
              >
                {d.renderSvg()}
              </button>

              {/* Pure White Handwritten Text Message - NO Background Box */}
              {isOpen && (
                <div className="absolute top-1/2 left-full ml-3 -translate-y-1/2 whitespace-nowrap z-50 animate-fade-in pointer-events-none">
                  <p className="font-['Caveat',cursive] text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
                    ~ {d.message}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT MARGIN DOODLES (Placed clear of 70px right stamp rail at right-[85px] lg:right-[110px]) */}
      <div className="fixed top-32 right-[85px] lg:right-[110px] xl:right-[140px] z-30 flex flex-col gap-24 lg:gap-32 pointer-events-none hidden md:flex">
        {RIGHT_DOODLES.map((d) => {
          const isOpen = activeDoodle === d.id;
          return (
            <div key={d.id} className="relative group pointer-events-auto">
              <button
                type="button"
                onClick={() => setActiveDoodle(isOpen ? null : d.id)}
                onMouseEnter={() => setActiveDoodle(d.id)}
                onMouseLeave={() => setActiveDoodle(null)}
                className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 text-chalk/50 hover:text-chalk bg-transparent border-0 outline-none"
              >
                {d.renderSvg()}
              </button>

              {/* Pure White Handwritten Text Message - NO Background Box */}
              {isOpen && (
                <div className="absolute top-1/2 right-full mr-3 -translate-y-1/2 whitespace-nowrap z-50 animate-fade-in pointer-events-none">
                  <p className="font-['Caveat',cursive] text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
                    {d.message} ~
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
