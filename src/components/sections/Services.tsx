'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Dumbbell, HeartPulse, Sparkles, Target, UserCheck } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { useTrial } from '@/components/forms/TrialModal';
import { fadeUp, staggerParent } from '@/components/common/motion';

const PROGRAMS = [
  {
    id: 'strength',
    icon: Dumbbell,
    title: 'Strength Training',
    description: 'Barbell-first programming with progressive overload, form coaching and strength assessments.',
    features: ['Free weights & machines', 'Overload programming', 'Form correction', 'Strength testing'],
  },
  {
    id: 'cardio',
    icon: HeartPulse,
    title: 'Cardio & Engine',
    description: 'Build an engine that lasts — intervals, steady-state and heart-rate guided conditioning.',
    features: ['HIIT & intervals', 'HR-zone training', 'Rowers, bikes, sled', 'Engine benchmarks'],
  },
  {
    id: 'yoga',
    icon: Sparkles,
    title: 'Yoga & Mobility',
    description: 'Vinyasa, breathwork and joint prep that keeps you training pain-free for decades.',
    features: ['Vinyasa & Yin', 'Breathwork', 'Joint prep', 'All levels'],
  },
  {
    id: 'personal',
    icon: UserCheck,
    title: 'Personal Coaching',
    description: 'One-on-one coaching with a custom plan, nutrition targets and weekly accountability.',
    features: ['1-on-1 coaching', 'Custom programming', 'Nutrition targets', 'Weekly check-ins'],
  },
  {
    id: 'functional',
    icon: Target,
    title: 'Functional Training',
    description: 'Kettlebells, sleds and carries for real-world strength, agility and athleticism.',
    features: ['Kettlebells & sled', 'Carries & crawls', 'Agility work', 'Sport prep'],
  },
  {
    id: 'wellness',
    icon: Brain,
    title: 'Recovery & Mind',
    description: 'Sauna, sleep and stress protocols — because adaptation happens between sessions.',
    features: ['Sauna & steam', 'Sleep protocols', 'Deload planning', 'Lifestyle coaching'],
  },
];

export default function Services() {
  const { openTrial } = useTrial();

  return (
    <section id="programs" className="section overflow-x-clip">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Programs"
          title={
            <>
              Train with <span className="display-accent">intent.</span>
            </>
          }
          lede="Six disciplines, one roof. Every program starts with an assessment and ends with numbers that move."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {PROGRAMS.map((p, i) => (
            <motion.article
              key={p.id}
              variants={fadeUp}
              custom={i % 3}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(236,102,54,0.12)' }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-[10px] border border-[#222] bg-card p-7 transition-colors hover:border-primary/60"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-md border border-[#2c2c2c] bg-[#161616] transition-colors group-hover:border-primary/50">
                  <p.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-5 space-y-2 border-t border-[#1e1e1e] pt-5" role="list">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[10px] border border-[#222] bg-card px-7 py-6 sm:flex-row"
        >
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            <span className="font-semibold text-foreground">Not sure where you start?</span>{' '}
            Take a free first class — we test, then we program.
          </p>
          <button
            type="button"
            onClick={() => openTrial()}
            className="pressable inline-flex shrink-0 items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:text-[#f07f4e]"
          >
            Book free class
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}