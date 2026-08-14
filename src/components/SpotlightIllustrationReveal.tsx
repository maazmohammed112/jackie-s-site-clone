import { useState, useRef, useEffect, useCallback } from "react";
import heroDoodleTeal from "@/assets/hero-doodle-teal.png";
import heroDoodleColor from "@/assets/hero-doodle-color.png";

interface SpotlightIllustrationRevealProps {
  className?: string;
}

export default function SpotlightIllustrationReveal({
  className = "",
}: SpotlightIllustrationRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Images refs
  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const colorImgRef = useRef<HTMLImageElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Permanent Full Paint Unlock State
  const [isFullyPainted, setIsFullyPainted] = useState(false);
  const isFullyPaintedRef = useRef(false);

  // Animation & coordinate state
  const targetPos = useRef({ x: 512, y: 512 });
  const currentPos = useRef({ x: 512, y: 512 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const targetOpacity = useRef(0);
  const currentOpacity = useRef(0);

  const [hasInteracted, setHasInteracted] = useState(false);
  const isHoveredRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Offscreen canvas for feathered alpha blending
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const CANVAS_SIZE = 1024;
  const SPOTLIGHT_RADIUS = 260; // Normal hover size
  const FULL_PAINT_RADIUS = 1550; // Covers entire 1024x1024 diagonally

  // Helper to draw handwritten quote directly onto the sign
  const drawSignText = (ctx: CanvasRenderingContext2D, isColorMode: boolean) => {
    ctx.save();
    // Perfectly centered and angled with the signboard's perspective slant
    ctx.translate(498, 642);
    ctx.rotate(-0.138); // ~ -7.9 degrees matching exact board direction

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (isColorMode) {
      // Warm watercolor coffee-brown ink
      ctx.font = "bold 35px 'Caveat', cursive, sans-serif";
      ctx.fillStyle = "#2c170b";
      ctx.fillText("Chai is important", 0, -22);
      ctx.fillText("while coding.", 0, 18);

      ctx.font = "bold 18px 'Caveat', cursive, sans-serif";
      ctx.fillStyle = "#9a3412";
      ctx.fillText("— strictly non-negotiable —", 0, 54);
    } else {
      // Soft teal monochrome line-art ink
      ctx.font = "bold 35px 'Caveat', cursive, sans-serif";
      ctx.fillStyle = "#163f49";
      ctx.fillText("Chai is important", 0, -22);
      ctx.fillText("while coding.", 0, 18);

      ctx.font = "bold 18px 'Caveat', cursive, sans-serif";
      ctx.fillStyle = "#205562";
      ctx.fillText("— strictly non-negotiable —", 0, 54);
    }

    ctx.restore();
  };

  // Preload both images and ensure fonts are ready
  useEffect(() => {
    let loadedCount = 0;
    const onImgLoad = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        setImagesLoaded(true);
      }
    };

    const img1 = new Image();
    img1.crossOrigin = "anonymous";
    img1.src = heroDoodleTeal;
    img1.onload = onImgLoad;
    baseImgRef.current = img1;

    const img2 = new Image();
    img2.crossOrigin = "anonymous";
    img2.src = heroDoodleColor;
    img2.onload = onImgLoad;
    colorImgRef.current = img2;

    // Create offscreen canvas
    const offCanvas = document.createElement("canvas");
    offCanvas.width = CANVAS_SIZE;
    offCanvas.height = CANVAS_SIZE;
    offscreenCanvasRef.current = offCanvas;

    // Redraw when web fonts load
    document.fonts.ready.then(() => {
      drawFrame();
    });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (touchTimer.current) clearTimeout(touchTimer.current);
    };
  }, []);

  // Main Render Frame
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const offCanvas = offscreenCanvasRef.current;
    const baseImg = baseImgRef.current;
    const colorImg = colorImgRef.current;

    if (!canvas || !offCanvas || !baseImg || !colorImg || !imagesLoaded) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const offCtx = offCanvas.getContext("2d", { alpha: true });
    if (!ctx || !offCtx) return;

    // 1. Draw base monochrome/teal image
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.drawImage(baseImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw sketchy teal text onto base monochrome sign
    drawSignText(ctx, false);

    const r = Math.max(0, currentRadius.current);
    const op = Math.max(0, Math.min(1, currentOpacity.current));
    const x = currentPos.current.x;
    const y = currentPos.current.y;

    // 2. Draw feathered color reveal if active
    if (r > 1 && op > 0.01) {
      // Clear offscreen canvas
      offCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw full color image to offscreen buffer
      offCtx.globalCompositeOperation = "source-over";
      offCtx.drawImage(colorImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw rich warm color text onto the color sign
      drawSignText(offCtx, true);

      // Create smooth, feathered radial alpha mask
      offCtx.globalCompositeOperation = "destination-in";
      const radGrad = offCtx.createRadialGradient(x, y, 0, x, y, r);
      radGrad.addColorStop(0, "rgba(0, 0, 0, 1.0)");
      radGrad.addColorStop(0.4, "rgba(0, 0, 0, 0.98)");
      radGrad.addColorStop(0.75, "rgba(0, 0, 0, 0.65)");
      radGrad.addColorStop(0.9, "rgba(0, 0, 0, 0.25)");
      radGrad.addColorStop(1, "rgba(0, 0, 0, 0.0)");

      offCtx.fillStyle = radGrad;
      offCtx.beginPath();
      offCtx.arc(x, y, r, 0, Math.PI * 2);
      offCtx.fill();

      // Reset offscreen composite
      offCtx.globalCompositeOperation = "source-over";

      // Blit masked color image onto main canvas with animated opacity
      ctx.save();
      ctx.globalAlpha = op;
      ctx.drawImage(offCanvas, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // 3. Draw soft magical highlight aura ring around spotlight edge (only when not fully bloomed)
      if (r < FULL_PAINT_RADIUS * 0.7) {
        const auraGrad = ctx.createRadialGradient(x, y, r * 0.7, x, y, r * 1.05);
        auraGrad.addColorStop(0, "rgba(255, 240, 200, 0.0)");
        auraGrad.addColorStop(0.5, `rgba(255, 235, 180, ${(0.18 * op).toFixed(3)})`);
        auraGrad.addColorStop(1, "rgba(255, 240, 200, 0.0)");

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(x, y, r * 1.05, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }, [imagesLoaded]);

  // 60fps RAF Lerping Loop
  const animate = useCallback(() => {
    // Slower, more majestic bloom when fully unlocking
    const lerp = isFullyPaintedRef.current ? 0.065 : 0.18;

    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
    currentRadius.current += (targetRadius.current - currentRadius.current) * lerp;
    currentOpacity.current += (targetOpacity.current - currentOpacity.current) * lerp;

    drawFrame();

    const isSettled =
      Math.abs(targetRadius.current - currentRadius.current) < 0.2 &&
      Math.abs(targetOpacity.current - currentOpacity.current) < 0.01 &&
      Math.abs(targetPos.current.x - currentPos.current.x) < 0.3 &&
      Math.abs(targetPos.current.y - currentPos.current.y) < 0.3;

    if (!isSettled || targetRadius.current > 0 || currentRadius.current > 0.5) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      rafId.current = null;
    }
  }, [drawFrame]);

  const ensureAnimation = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // Initial draw when images load
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame();
    }
  }, [imagesLoaded, drawFrame]);

  // Coordinate mapper from client coordinates to canvas coordinates (0..1024)
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 512, y: 512 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Full Paint Unlock Trigger on Click / Tap
  const handleFullPaintUnlock = (clientX?: number, clientY?: number) => {
    if (isFullyPaintedRef.current) return;
    isFullyPaintedRef.current = true;
    setIsFullyPainted(true);
    setHasInteracted(true);

    if (clientX !== undefined && clientY !== undefined) {
      const coords = getCanvasCoords(clientX, clientY);
      targetPos.current = coords;
    } else {
      targetPos.current = { x: 512, y: 512 };
    }

    targetRadius.current = FULL_PAINT_RADIUS;
    targetOpacity.current = 1.0;
    ensureAnimation();
  };

  // Pointer Handlers (Unified for Mouse, Touch, and Pen)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setHasInteracted(true);
    if (touchTimer.current) clearTimeout(touchTimer.current);

    // If not yet unlocked, trigger full watercolor unlock transition on tap/click!
    if (!isFullyPaintedRef.current) {
      handleFullPaintUnlock(e.clientX, e.clientY);
      return;
    }

    isHoveredRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // If already fully painted, no need to shrink
    if (isFullyPaintedRef.current) return;

    if (!isHoveredRef.current && e.pointerType === "mouse") {
      isHoveredRef.current = true;
      setHasInteracted(true);
      targetRadius.current = SPOTLIGHT_RADIUS;
      targetOpacity.current = 1;
    }

    if (isHoveredRef.current) {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      targetPos.current = coords;
      ensureAnimation();
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    // Once fully painted, keep the full color artwork forever until page reload!
    if (isFullyPaintedRef.current) return;

    if (e.pointerType === "mouse") {
      isHoveredRef.current = false;
      targetRadius.current = 0;
      targetOpacity.current = 0;
      ensureAnimation();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isFullyPaintedRef.current) return;

    if (e.pointerType !== "mouse") {
      // For touch preview: linger spotlight gracefully, then fade out
      if (touchTimer.current) clearTimeout(touchTimer.current);
      touchTimer.current = setTimeout(() => {
        if (!isFullyPaintedRef.current) {
          isHoveredRef.current = false;
          targetRadius.current = 0;
          targetOpacity.current = 0;
          ensureAnimation();
        }
      }, 1500);
    }
  };

  // Welcome preview animation (demonstrates the effect on initial load)
  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setTimeout(() => {
      if (!hasInteracted && !isHoveredRef.current && !isFullyPaintedRef.current) {
        currentPos.current = { x: 500, y: 380 };
        targetPos.current = { x: 500, y: 380 };
        targetRadius.current = 200;
        targetOpacity.current = 0.95;
        ensureAnimation();

        setTimeout(() => {
          if (!isHoveredRef.current && !isFullyPaintedRef.current) {
            targetRadius.current = 0;
            targetOpacity.current = 0;
            ensureAnimation();
          }
        }, 1400);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [imagesLoaded, hasInteracted, ensureAnimation]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`group relative mx-auto w-full max-w-sm select-none touch-none cursor-pointer overflow-hidden rounded-[20px] shadow-sm transition-transform duration-300 active:scale-[0.99] ${className}`}
      style={{
        aspectRatio: "1 / 1",
      }}
      aria-label="Interactive illustration of Maaz holding 'Chai is important while coding' sign. Click or tap to paint fully in watercolor."
      role="img"
    >
      {/* High Performance 2D Canvas for Spotlight Color Reveal & Drawn Quote */}
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="pointer-events-none block h-full w-full object-contain"
      />

      {/* Playful Interactive Hint (Fades out once user clicks or taps) */}
      {!hasInteracted && !isFullyPainted && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce rounded-full bg-paper/95 px-3.5 py-1 text-center font-['Caveat',cursive] text-xs sm:text-sm font-bold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.25)] border border-primary/20 backdrop-blur-xs whitespace-nowrap">
          ✨ click or tap to paint completely
        </div>
      )}
    </div>
  );
}
