'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroWaves — animated layered waves for the homepage hero.
 *
 * Design spec (design-refresh, 2026-07-10):
 * - 4 layers, all moving in the SAME direction (traveling wave, left to right)
 * - Amplitude increases from top layer to bottom layer (small -> large)
 * - Colors: light orange -> pink orange -> warm gray -> brand orange tint
 * - Respects prefers-reduced-motion (renders a static frame)
 * - Pauses when the tab is hidden (visibilitychange)
 *
 * Usage: place at the bottom of the Hero section, full width.
 *   <HeroWaves className="w-full" height={200} />
 */

interface WaveLayer {
  /** Baseline y position in viewBox units (0-200) */
  base: number;
  /** Wave amplitude in viewBox units */
  amp: number;
  /** Fill color */
  fill: string;
}

interface HeroWavesProps {
  className?: string;
  /** Rendered height hint; viewBox is 900x200, preserveAspectRatio="none" stretches to fit */
  height?: number;
  /** Horizontal wave frequency (radians per viewBox px) */
  freq?: number;
  /** Travel speed (radians per second) */
  speed?: number;
  layers?: WaveLayer[];
}

const DEFAULT_LAYERS: WaveLayer[] = [
  { base: 60, amp: 7, fill: '#FBEDE4' },
  { base: 95, amp: 12, fill: '#F7D9C4' },
  { base: 130, amp: 18, fill: '#E8DAD0' },
  { base: 162, amp: 24, fill: '#EFB388' },
];

const VIEW_W = 900;
const VIEW_H = 200;
const STEP = 30; // px between sample points; smaller = smoother, more CPU

function buildPath(layer: WaveLayer, t: number, freq: number, speed: number): string {
  let d = `M0 ${VIEW_H}`;
  for (let x = 0; x <= VIEW_W; x += STEP) {
    const y = layer.base + Math.sin(x * freq - t * speed) * layer.amp;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  d += ` L${VIEW_W} ${VIEW_H} Z`;
  return d;
}

export default function HeroWaves({
  className,
  height = 200,
  freq = 0.009,
  speed = 0.9,
  layers = DEFAULT_LAYERS,
}: HeroWavesProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const drawFrame = (t: number) => {
      layers.forEach((layer, i) => {
        const el = pathRefs.current[i];
        if (el) el.setAttribute('d', buildPath(layer, t, freq, speed));
      });
    };

    // Static frame for reduced motion — draw once and stop.
    if (reduceMotion) {
      drawFrame(0);
      return;
    }

    let start: number | null = null;
    let pausedAt = 0; // accumulated animation time when hidden
    let hiddenSince: number | null = null;

    const loop = (ts: number) => {
      if (start === null) start = ts;
      drawFrame((ts - start) / 1000 - pausedAt);
      rafRef.current = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
        hiddenSince = performance.now();
      } else {
        if (hiddenSince !== null) {
          pausedAt += 0; // time offset handled by restarting relative clock
          // Shift the start reference so animation resumes where it left off
          const hiddenDuration = (performance.now() - hiddenSince) / 1000;
          pausedAt += hiddenDuration;
          hiddenSince = null;
        }
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [freq, speed, layers]);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', width: '100%', height }}
    >
      {layers.map((layer, i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          fill={layer.fill}
        />
      ))}
    </svg>
  );
}
