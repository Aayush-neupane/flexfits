'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface GaugeProps {
  label: string;
  value: number; // 0–100
  sub: string;
}

/* Cockpit instrument (CarPanel DNA): 180° sweep, tick ring, redline zone,
   needle + tabular digital readout. Animates once when scrolled into view. */
export default function Gauge({ label, value, sub }: GaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const angle = -90 + (display / 100) * 180;
  const ticks = Array.from({ length: 19 }, (_, i) => -90 + i * 10);

  const polar = (deg: number, r: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: 100 + r * Math.cos(rad), y: 100 + r * Math.sin(rad) };
  };

  const arc = (from: number, to: number, r: number) => {
    const a = polar(from, r);
    const b = polar(to, r);
    return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
  };

  return (
    <div ref={ref} className="rounded-[10px] border border-border bg-card p-6 text-center">
      <svg viewBox="0 0 200 118" className="mx-auto w-full max-w-[220px]" role="img" aria-label={`${label}: ${value} out of 100`}>
        {/* track */}
        <path d={arc(-90, 90, 78)} fill="none" stroke="#262626" strokeWidth="7" strokeLinecap="round" />
        {/* redline zone (top 12%) */}
        <path d={arc(68.4, 90, 78)} fill="none" stroke="#d64545" strokeWidth="7" strokeLinecap="round" />
        {/* value */}
        <path
          d={arc(-90, -90 + (display / 100) * 180, 78)}
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* ticks */}
        {ticks.map((t) => {
          const p1 = polar(t, 64);
          const p2 = polar(t, t % 30 === 0 ? 54 : 58);
          const hot = t >= 60;
          return (
            <line
              key={t}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={hot ? '#d64545' : '#3a3a3a'}
              strokeWidth={t % 30 === 0 ? 2 : 1}
            />
          );
        })}
        {/* needle */}
        <line
          x1="100"
          y1="100"
          x2={polar(angle, 66).x}
          y2={polar(angle, 66).y}
          stroke="#f5f5f5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="5" fill="#ff5a1f" />
      </svg>
      <p className="tabular mt-2 font-mono text-4xl font-semibold text-foreground">
        {display}
        <span className="text-base text-muted-foreground">/100</span>
      </p>
      <p className="eyebrow mt-2">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}