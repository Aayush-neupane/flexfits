'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import Gauge from '@/components/common/Gauge';
import { useTrial } from '@/components/forms/TrialModal';
import { fadeUp, staggerParent } from '@/components/common/motion';

const CHECKS = [
  '15,000 sq ft — strength, cardio, functional, yoga, recovery zones',
  '50+ certified coaches across strength, mobility and nutrition',
  'Assessment-first: tested, programmed, re-tested every 12 weeks',
  'Open 6AM–10PM weekdays, 8AM–8PM weekends',
];

const GAUGES = [
  { label: 'Strength', value: 92, sub: 'Barbell-first programming' },
  { label: 'Engine', value: 84, sub: 'Conditioning & work capacity' },
  { label: 'Mobility', value: 76, sub: 'Joints that last decades' },
];

interface Slot {
  time: string;
  start: number; // hour, 24h local
  name: string;
  coach: string;
  spots: number;
}

const SCHEDULE: Slot[] = [
  { time: '06:00', start: 6, name: 'Iron Hour', coach: 'AK', spots: 12 },
  { time: '07:30', start: 7.5, name: 'Engine Room', coach: 'RT', spots: 8 },
  { time: '12:15', start: 12.25, name: 'Midday Mobility', coach: 'SS', spots: 15 },
  { time: '17:30', start: 17.5, name: 'After-Work Strength', coach: 'AK', spots: 6 },
  { time: '19:00', start: 19, name: 'Candlelight Yoga', coach: 'SS', spots: 10 },
];

/* One schedule row with a live state derived from the actual clock:
   the running class glows molten-orange, past classes dim out. Display only —
   booking happens through the free-class flow. */
function ScheduleRow({ slot, first }: { slot: Slot; first: boolean }) {
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  const live = now >= slot.start && now < slot.start + 1;
  const done = now >= slot.start + 1;

  return (
    <li
      aria-current={live ? 'time' : undefined}
      className={`flex items-center gap-4 bg-card px-6 py-4 ${first ? '' : 'border-t border-[#1e1e1e]'} ${
        done && !live ? 'opacity-45' : ''
      }`}
    >
      <span className="tabular w-12 shrink-0 font-mono text-sm font-semibold text-foreground">
        {slot.time}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground">{slot.name}</span>
        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Coach {slot.coach} · {slot.spots} spots
        </span>
      </span>
      {live ? (
        <span className="hud-pill !border-success/40 !py-1.5 !text-success">
          <span className="live-dot" aria-hidden="true" />
          Live
        </span>
      ) : (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          {done ? 'Ended' : 'Upcoming'}
        </span>
      )}
    </li>
  );
}

export default function About() {
  const { openTrial } = useTrial();

  return (
    <section id="forge" className="section overflow-x-clip">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="The forge"
          title={
            <>
              More than a gym —<br />a <span className="display-accent">standard.</span>
            </>
          }
          align="left"
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="max-w-xl text-base leading-relaxed text-[#d4d4d4]">
              Since 2014 we&apos;ve run one playbook: assess honestly, program precisely,
              coach loudly. Over a thousand members from ShivaSatakshi and beyond have
              rebuilt their bodies here — beginners finding their first pull-up,
              competitors finding podiums.
            </motion.p>
            <motion.ul variants={fadeUp} className="mt-7 space-y-3.5" role="list">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                onClick={() => openTrial()}
                className="pressable inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:text-[#f07f4e]"
              >
                Start with a free class
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="overflow-hidden rounded-[10px] border border-[#222]"
          >
            <div className="flex items-center justify-between border-b border-[#1e1e1e] bg-card px-6 py-4">
              <span className="eyebrow">Today on the floor</span>
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase()}
              </span>
            </div>
            <ul role="list">
              {SCHEDULE.map((s, i) => (
                <ScheduleRow key={s.time} slot={s} first={i === 0} />
              ))}
            </ul>
            <p className="border-t border-[#1e1e1e] bg-[#0d0d0d] px-6 py-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
              Drop-ins welcome · All levels · Coach on deck all day
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {GAUGES.map((g, i) => (
            <motion.div key={g.label} variants={fadeUp} custom={i}>
              <Gauge label={g.label} value={g.value} sub={g.sub} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}