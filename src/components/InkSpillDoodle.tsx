export default function InkSpillDoodle() {
  return (
    <div aria-hidden="true" className="relative w-full overflow-visible my-12 pointer-events-none select-none">
      <div className="relative mx-auto max-w-2xl flex items-center justify-center">
        
        {/* Organic Ink Spill Stain & Droplets SVG */}
        <svg
          viewBox="0 0 400 180"
          className="w-full max-w-lg h-auto text-ink opacity-85 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          fill="currentColor"
        >
          {/* Main Organic Ink Pool */}
          <path d="M 120 70 C 140 40, 180 35, 210 50 C 240 65, 270 45, 290 75 C 310 105, 280 140, 240 145 C 200 150, 160 135, 130 120 C 100 105, 100 90, 120 70 Z" />
          <path d="M 170 55 C 195 45, 230 50, 250 70 C 270 90, 260 120, 230 130 C 200 140, 160 125, 150 100 C 140 75, 145 65, 170 55 Z" />

          {/* Splattered Ink Droplets */}
          <circle cx="85" cy="60" r="6" />
          <circle cx="70" cy="75" r="3.5" />
          <circle cx="98" cy="115" r="4.5" />
          <circle cx="110" cy="135" r="2.5" />

          <circle cx="315" cy="65" r="7" />
          <circle cx="330" cy="85" r="4" />
          <circle cx="305" cy="120" r="5.5" />
          <circle cx="340" cy="110" r="3" />

          <circle cx="210" cy="25" r="5" />
          <circle cx="235" cy="20" r="3" />
          <circle cx="180" cy="155" r="4" />

          {/* Ink Ring Rim Stains */}
          <circle cx="345" cy="135" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
          <circle cx="65" cy="125" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />

          {/* Vintage Fountain Pen lying across the ink spill */}
          <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-[#d9caa9] filter drop-shadow-md">
            {/* Pen Barrel */}
            <path d="M 60 140 L 220 50" strokeWidth="6" stroke="#201c16" />
            <path d="M 60 140 L 220 50" strokeWidth="3" stroke="#e6d5b8" />
            {/* Gold Ring Band */}
            <line x1="175" y1="75" x2="183" y2="70" stroke="#d4af37" strokeWidth="5" />
            {/* Nib Base */}
            <polygon points="60,140 45,148 52,155 60,140" fill="#201c16" strokeWidth="1.5" />
            {/* Nib Tip */}
            <path d="M 48 151 L 32 160 L 41 166 L 50 154 Z" fill="#d4af37" stroke="#201c16" strokeWidth="1.5" />
            <line x1="45" y1="152" x2="36" y2="162" stroke="#201c16" strokeWidth="1.2" />
            <circle cx="41" cy="157" r="1" fill="#201c16" stroke="none" />
            {/* Ink Drop from Nib */}
            <circle cx="26" cy="168" r="2.5" fill="#201c16" stroke="none" />
          </g>
        </svg>

        {/* Handwritten Annotation */}
        <p className="absolute bottom-1 right-8 sm:right-16 font-['Caveat',cursive] text-lg sm:text-xl text-ink/75 rotate-[-3deg]">
          ~ oops, spilled the ink! 🖋️
        </p>

      </div>
    </div>
  );
}
