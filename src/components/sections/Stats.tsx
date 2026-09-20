'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getGymStatus } from '@/lib/gym-status';
import { fadeUp, staggerParent } from '@/components/common/motion';

const CELLS = [
  { value: 1000, suffix: '+', label: 'Members forged' },
  { value: 50, suffix: '+', label: 'Expert coaches' },
  { value: 100, suffix: '+', label: 'Weekly classes' },
  { value: 4.9, suffix: '', label: 'Member rating', decimals: 1 },
];

function CountUp({ end, suffix = '', decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(end);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setVal(Number((end * (1 - Math.pow(1 - p, 3))).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, decimals]);
  return (
    <span className="tabular">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Floor telemetry band (CarPanel HUD × Help-main hud-pills):
   live open status + tabular count-up readouts on a hairline frame. */
export default function Stats() {
  const [visible, setVisible] = useState(false);
  const status = getGymStatus();

  useEffect(() => {
    const el = document.getElementById('telemetry');
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="telemetry" aria-label="Floor telemetry" className="border-y border-[#1c1c1c] bg-[#0a0a0a]">
      <div className="container py-10 sm:py-12">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[#222] bg-[#222] lg:grid-cols-5"
        >
          <motion.div variants={fadeUp} className="flex flex-col justify-center gap-2 bg-[#0a0a0a] p-6">
            <span className="eyebrow">Floor status</span>
            <span className="hud-pill w-fit">
              <span className={status.open ? 'live-dot' : 'live-dot live-dot-gold'} aria-hidden="true" />
              {status.label}
            </span>
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">{status.detail}</span>
          </motion.div>
          {CELLS.map((c, i) => (
            <motion.div key={c.label} variants={fadeUp} custom={i} className="bg-[#0a0a0a] p-6">
              <p className="font-mono text-3xl font-semibold text-foreground sm:text-4xl">
                <CountUp end={c.value} suffix={c.suffix} decimals={c.decimals ?? 0} />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {c.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}