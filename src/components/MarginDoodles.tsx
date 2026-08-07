import { type ReactNode } from "react";

/** Juice Carton Doodle */
function JuiceBoxDoodle() {
  return (
    <svg viewBox="0 0 100 130" className="w-16 h-20 sm:w-20 sm:h-24 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Straw */}
        <path d="M 45 30 L 35 8 L 22 14 L 28 32" />
        {/* Top Fold */}
        <polygon points="30,32 70,32 80,45 20,45" />
        <line x1="50" y1="32" x2="50" y2="45" />
        {/* Box Body */}
        <polygon points="20,45 80,45 80,110 20,110" />
        {/* 3D Side Fold */}
        <polygon points="80,45 92,38 92,100 80,110" />
        <line x1="70" y1="32" x2="92" y2="38" />
        {/* Fruit / Apple Icon */}
        <circle cx="50" cy="78" r="14" />
        <path d="M 50 64 C 52 58, 58 58, 60 62" />
        <circle cx="45" cy="74" r="1.5" fill="currentColor" />
        <circle cx="55" cy="74" r="1.5" fill="currentColor" />
        <path d="M 45 84 Q 50 88 55 84" />
      </g>
    </svg>
  );
}

/** Fish with Bubbles Doodle */
function FishDoodle() {
  return (
    <svg viewBox="0 0 140 90" className="w-20 h-14 sm:w-24 sm:h-16 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Fish Body */}
        <path d="M 40 45 C 50 20, 100 20, 120 45 C 100 70, 50 70, 40 45 Z" />
        {/* Tail Fin */}
        <path d="M 40 45 L 15 25 L 25 45 L 15 65 Z" />
        {/* Dorsal Fin */}
        <path d="M 75 24 C 80 12, 95 15, 95 24" />
        {/* Ventral Fin */}
        <path d="M 75 66 C 80 78, 92 75, 90 66" />
        {/* Eye */}
        <circle cx="102" cy="40" r="5" />
        <circle cx="103" cy="39" r="2" fill="currentColor" />
        {/* Smile */}
        <path d="M 112 48 Q 108 53 104 50" />
        {/* Gills */}
        <path d="M 85 36 C 80 42, 80 48, 85 54" />
        {/* Bubbles */}
        <circle cx="128" cy="30" r="3.5" />
        <circle cx="134" cy="20" r="2.5" />
        <circle cx="137" cy="12" r="1.5" />
      </g>
    </svg>
  );
}

/** Noodle Bowl / Tea Bowl with Chopsticks */
function NoodleBowlDoodle() {
  return (
    <svg viewBox="0 0 110 90" className="w-16 h-14 sm:w-20 sm:h-16 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Chopsticks */}
        <line x1="15" y1="28" x2="95" y2="18" />
        <line x1="12" y1="36" x2="92" y2="24" />
        {/* Steam */}
        <path d="M 35 22 Q 40 12 35 5" />
        <path d="M 50 20 Q 55 10 50 3" />
        <path d="M 65 22 Q 70 12 65 5" />
        {/* Bowl Rim */}
        <ellipse cx="50" cy="36" rx="40" ry="10" />
        {/* Bowl Body */}
        <path d="M 10 36 C 10 70, 30 80, 50 80 C 70 80, 90 70, 90 36" />
        {/* Bowl Base Foot */}
        <path d="M 35 80 L 35 86 L 65 86 L 65 80" />
        {/* Noodles inside */}
        <path d="M 25 36 Q 35 44 45 36 Q 55 44 65 36 Q 75 44 80 36" />
      </g>
    </svg>
  );
}

/** Little Dinosaur / Godzilla breathing fire */
function DinoDoodle() {
  return (
    <svg viewBox="0 0 110 110" className="w-16 h-16 sm:w-20 sm:h-20 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Dino Head & Spikes */}
        <path d="M 50 30 C 50 15, 80 15, 85 30 L 90 40 L 70 40 L 70 45 L 85 45 L 80 55 C 70 60, 55 55, 50 45 Z" />
        {/* Eye */}
        <circle cx="70" cy="26" r="3" fill="currentColor" />
        {/* Spikes on back */}
        <path d="M 48 30 L 40 22 L 44 36 L 36 30 L 40 44 L 30 40 L 36 52" />
        {/* Fire Puffs */}
        <path d="M 92 38 Q 100 32 105 38 Q 98 44 92 42" />
        <path d="M 94 44 Q 102 42 106 48 Q 98 52 94 48" />
        {/* Body */}
        <path d="M 50 45 C 40 50, 35 65, 45 80 L 40 95 L 55 95 L 60 82 C 70 82, 75 75, 75 60 Z" />
        {/* Arm */}
        <path d="M 60 52 L 68 56 L 65 60" />
      </g>
    </svg>
  );
}

/** Botanical Leaf & Branch Doodle */
function LeafDoodle() {
  return (
    <svg viewBox="0 0 90 130" className="w-14 h-20 sm:w-16 sm:h-24 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Main Stem */}
        <path d="M 45 120 C 40 80, 50 40, 45 10" />
        {/* Leaves */}
        <path d="M 45 100 C 20 90, 20 70, 45 75" />
        <path d="M 45 90 C 70 80, 70 60, 45 65" />
        <path d="M 45 65 C 25 55, 25 35, 45 40" />
        <path d="M 45 50 C 65 40, 65 20, 45 25" />
        <path d="M 45 25 C 35 15, 40 5, 45 10 C 50 5, 55 15, 45 25" />
      </g>
    </svg>
  );
}

/** Flower Doodle */
function FlowerDoodle() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Center */}
        <circle cx="50" cy="50" r="10" />
        <circle cx="47" cy="47" r="2" fill="currentColor" />
        <circle cx="53" cy="52" r="2" fill="currentColor" />
        {/* Petals */}
        <path d="M 50 40 C 40 20, 60 20, 50 40" />
        <path d="M 60 50 C 80 40, 80 60, 60 50" />
        <path d="M 50 60 C 60 80, 40 80, 50 60" />
        <path d="M 40 50 C 20 60, 20 40, 40 50" />
        <path d="M 43 43 C 28 28, 42 14, 43 43" />
        <path d="M 57 43 C 72 28, 86 42, 57 43" />
        <path d="M 57 57 C 72 72, 58 86, 57 57" />
        <path d="M 43 57 C 28 72, 14 58, 43 57" />
      </g>
    </svg>
  );
}

/** Code / Coffee Mug Doodle */
function CodeCoffeeDoodle() {
  return (
    <svg viewBox="0 0 110 100" className="w-16 h-16 sm:w-20 sm:h-20 overflow-visible">
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Mug */}
        <rect x="25" y="35" width="45" height="50" rx="8" />
        {/* Handle */}
        <path d="M 70 45 C 85 45, 85 70, 70 75" />
        {/* Steam */}
        <path d="M 35 25 Q 40 15 35 8" />
        <path d="M 50 25 Q 55 15 50 8" />
        <path d="M 60 25 Q 65 15 60 8" />
        {/* Code Tag on Mug */}
        <path d="M 36 55 L 42 60 L 36 65" />
        <path d="M 58 55 L 52 60 L 58 65" />
        <line x1="48" y1="54" x2="46" y2="66" />
      </g>
    </svg>
  );
}

function DoodleWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none text-chalk/45 transition-transform duration-500 hover:scale-110 hover:text-chalk/80 ${className}`}
    >
      {children}
    </div>
  );
}

export default function MarginDoodles() {
  return (
    <>
      {/* LEFT SIDE MARGIN DOODLES (Placed behind content with z-0, visible only on wide screens where margins exist) */}
      <div className="hidden xl:flex fixed top-48 left-[80px] 2xl:left-[120px] z-0 flex-col gap-36 pointer-events-none">
        {/* Juice Carton Top Left */}
        <DoodleWrapper className="rotate-[-6deg] animate-float [--tilt:-6deg]">
          <JuiceBoxDoodle />
        </DoodleWrapper>

        {/* Code Coffee Mid Left */}
        <DoodleWrapper className="rotate-[5deg]">
          <CodeCoffeeDoodle />
        </DoodleWrapper>

        {/* Cute Fish Bottom Left */}
        <DoodleWrapper className="rotate-[-4deg] animate-float [--tilt:-4deg] [animation-delay:1.2s]">
          <FishDoodle />
        </DoodleWrapper>
      </div>

      {/* RIGHT SIDE MARGIN DOODLES (Placed behind content with z-0, visible only on wide screens where margins exist) */}
      <div className="hidden xl:flex fixed top-52 right-[80px] 2xl:right-[120px] z-0 flex-col gap-32 pointer-events-none">
        {/* Noodle Bowl Top Right */}
        <DoodleWrapper className="rotate-[8deg]">
          <NoodleBowlDoodle />
        </DoodleWrapper>

        {/* Godzilla Dino Mid Right */}
        <DoodleWrapper className="rotate-[-5deg] animate-float [--tilt:-5deg] [animation-delay:0.8s]">
          <DinoDoodle />
        </DoodleWrapper>

        {/* Leaf Branch Mid-Bottom Right */}
        <DoodleWrapper className="rotate-[4deg]">
          <LeafDoodle />
        </DoodleWrapper>

        {/* Flower Bottom Right */}
        <DoodleWrapper className="rotate-[-8deg]">
          <FlowerDoodle />
        </DoodleWrapper>
      </div>
    </>
  );
}
