import { useState } from "react";

/** Interactive Tea Jug / Tea Pot Doodle */
function TeaJugDoodle() {
  const [showTeaMessage, setShowTeaMessage] = useState(false);

  return (
    <div className="relative group">
      {/* Interactive Tea Pot Button */}
      <button
        type="button"
        onClick={() => setShowTeaMessage((prev) => !prev)}
        onMouseEnter={() => setShowTeaMessage(true)}
        aria-label="Tea Pot - Click for message"
        className="pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 bg-transparent border-0 outline-none"
      >
        <svg viewBox="0 0 110 90" className="w-16 h-14 sm:w-20 sm:h-16 overflow-visible text-chalk/60 hover:text-chalk">
          <g
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            {/* Steam Curves */}
            <path d="M 35 20 Q 40 10 35 4" />
            <path d="M 50 18 Q 55 8 50 2" />
            <path d="M 65 20 Q 70 10 65 4" />
            {/* Pot Lid & Knob */}
            <circle cx="50" cy="24" r="3" fill="currentColor" />
            <path d="M 32 30 C 32 24, 68 24, 68 30 Z" />
            {/* Pot Body */}
            <path d="M 22 36 C 18 68, 82 68, 78 36 Z" />
            <line x1="20" y1="36" x2="80" y2="36" />
            {/* Pot Base */}
            <path d="M 35 66 L 35 72 L 65 72 L 65 66" />
            {/* Handle */}
            <path d="M 78 40 C 95 40, 95 60, 75 62" />
            {/* Spout */}
            <path d="M 22 42 C 8 36, 6 24, 14 22 L 18 34" />
          </g>
        </svg>
      </button>

      {/* Handwritten Popover Note for Tea Jug */}
      {showTeaMessage && (
        <div className="absolute top-0 right-full mr-3 whitespace-nowrap z-50 animate-scale-in pointer-events-none">
          <div className="bg-[#f4ead6] text-[#201c16] font-['Caveat',cursive] text-lg sm:text-xl font-bold px-3 py-1.5 rounded-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-black/15 rotate-[-3deg]">
            Yeah! Drink more tea! ☕️🫖
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarginDoodles() {
  return (
    <div className="fixed top-28 right-3 sm:right-6 md:right-8 z-40 pointer-events-none">
      <TeaJugDoodle />
    </div>
  );
}
