'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { fadeUp } from '@/components/common/motion';
import { cn } from '@/lib/utils';

const MOVEMENTS = [
  {
    id: 'push',
    name: 'Push-Up',
    difficulty: 'Foundation',
    tone: 'text-success',
    prescription: '3–4 × 8–15',
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    tips: ['Body in one straight line — squeeze glutes', 'Elbows ~45° from the torso', 'Chest to a fist above the floor', 'Push the floor away, don’t shrug'],
  },
  {
    id: 'squat',
    name: 'Back Squat',
    difficulty: 'Intermediate',
    tone: 'text-warning',
    prescription: '4–5 × 6–12',
    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Core'],
    tips: ['Chest proud, knees track over toes', 'Hips back like sitting down', 'Drive through the whole foot', 'Brace hard before every rep'],
  },
  {
    id: 'hinge',
    name: 'Deadlift',
    difficulty: 'Intermediate',
    tone: 'text-warning',
    prescription: '3–5 × 3–6',
    muscles: ['Posterior chain', 'Back', 'Grip', 'Core'],
    tips: ['Bar over mid-foot, lats packed', 'Push the floor away to break ground', 'Hips and chest rise together', 'Lock out tall — no lean-back'],
  },
  {
    id: 'press',
    name: 'Overhead Press',
    difficulty: 'Intermediate',
    tone: 'text-warning',
    prescription: '3–4 × 6–10',
    muscles: ['Shoulders', 'Triceps', 'Upper chest', 'Core'],
    tips: ['Glutes tight, ribs stacked over hips', 'Bar path straight up, head through', 'Full lockout without shrugging', 'Control the descent'],
  },
  {
    id: 'plank',
    name: 'Plank',
    difficulty: 'Foundation',
    tone: 'text-success',
    prescription: '3–4 × 30–60s',
    muscles: ['Core', 'Shoulders', 'Glutes'],
    tips: ['Straight line head to heels', 'Elbows stacked under shoulders', 'Breathe behind the brace', 'Stop the set when hips sag'],
  },
  {
    id: 'pullup',
    name: 'Pull-Up',
    difficulty: 'Advanced',
    tone: 'text-destructive',
    prescription: '4 × max − 2',
    muscles: ['Lats', 'Biceps', 'Upper back', 'Core'],
    tips: ['Dead hang start, chest to bar', 'Pull elbows to ribs', 'No kipping until strict × 8', 'Lower over a full 2 seconds'],
  },
];

/* Movement index (editorial ledger, no stock-photo filler): numbered mono
   rows that expand into coach's tips. Fully vertical — zero sideways drift. */
export default function Exercises() {
  const [openId, setOpenId] = useState<string | null>('push');

  return (
    <section id="index" className="section overflow-x-clip border-t border-[#1c1c1c] bg-[#0a0a0a]">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Movement index"
          title={
            <>
              Master the <span className="display-accent">fundamentals.</span>
            </>
          }
          lede="Six lifts run every program in this building. Open any row for the exact cues our coaches use on the floor."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="overflow-hidden rounded-[10px] border border-[#222]"
        >
          {MOVEMENTS.map((m, i) => {
            const open = openId === m.id;
            return (
              <div key={m.id} className={cn(i > 0 && 'border-t border-[#1e1e1e]', open && 'bg-[#101010]')}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : m.id)}
                  aria-expanded={open}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.02] sm:grid-cols-[64px_1fr_auto_auto_40px] sm:gap-6 sm:px-7"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                      {m.name}
                    </span>
                    <span className="mt-1 block sm:hidden font-mono text-[11px] tracking-wider text-muted-foreground">
                      {m.prescription}
                    </span>
                  </span>
                  <span className={cn('hidden font-mono text-[11px] font-semibold uppercase tracking-[0.16em] sm:block', m.tone)}>
                    ● {m.difficulty}
                  </span>
                  <span className="tabular hidden font-mono text-xs tracking-wider text-muted-foreground sm:block">
                    {m.prescription}
                  </span>
                  <span
                    className={cn(
                      'grid h-9 w-9 place-items-center rounded-md border transition-all duration-300',
                      open ? 'rotate-45 border-primary bg-primary/10 text-primary' : 'border-[#2c2c2c] text-muted-foreground',
                    )}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 px-5 pb-7 sm:grid-cols-[64px_1fr] sm:gap-6 sm:px-7">
                        <span aria-hidden="true" />
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <p className="eyebrow">Coach&apos;s cues</p>
                            <ol className="mt-3 space-y-2.5">
                              {m.tips.map((tip, t) => (
                                <li key={tip} className="flex gap-3 text-sm leading-relaxed text-[#d4d4d4]">
                                  <span className="font-mono text-[11px] text-primary">0{t + 1}</span>
                                  {tip}
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div>
                            <p className="eyebrow">Target systems</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {m.muscles.map((muscle) => (
                                <span key={muscle} className="hud-pill !py-1.5">
                                  {muscle}
                                </span>
                              ))}
                            </div>
                            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                              Difficulty <span className={cn('font-semibold', m.tone)}>{m.difficulty}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}