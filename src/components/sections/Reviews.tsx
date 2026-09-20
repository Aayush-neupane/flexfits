'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { fadeUp } from '@/components/common/motion';
import { cn } from '@/lib/utils';

const REVIEWS = [
  {
    id: 'ayush',
    quote: 'Lost 30 pounds in 3 months. The coaches rebuilt how I eat, sleep and lift — the assessment alone was worth joining for.',
    author: 'Ayush G.',
    meta: 'Member since 2023 · −30 lb',
    initials: 'AG',
  },
  {
    id: 'chudel',
    quote: 'Three gyms before this one. None of them knew my name or my numbers. Here the whole floor knows both.',
    author: 'Chudel',
    meta: 'Member since 2022 · +40kg deadlift',
    initials: 'CH',
  },
  {
    id: 'sarah',
    quote: 'Came for yoga, stayed for everything. My back pain is gone and I out-lift friends half my age.',
    author: 'Sarah M.',
    meta: 'Member since 2022 · Mobility program',
    initials: 'SM',
  },
  {
    id: 'mike',
    quote: 'Calibrated plates, three racks, chalk allowed. As a powerlifter I stopped compromising the day I walked in.',
    author: 'Mike C.',
    meta: 'Member since 2021 · 200kg squat',
    initials: 'MC',
  },
  {
    id: 'emma',
    quote: 'Intimidated on day one, coached by day seven. My trainer built a plan around my schedule, not the other way round.',
    author: 'Emma R.',
    meta: 'Member since 2024 · First pull-up',
    initials: 'ER',
  },
  {
    id: 'david',
    quote: 'Sauna, programming, people who notice when you miss a week. Three years in and still progressing.',
    author: 'David P.',
    meta: 'Member since 2021 · Elite plan',
    initials: 'DP',
  },
];

const SUMMARY = [
  { value: '4.9', label: 'Google rating' },
  { value: '500+', label: 'Written reviews' },
  { value: '98%', label: 'Would rejoin' },
  { value: '1000+', label: 'Transformations' },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const perView = 3;
  const max = REVIEWS.length - perView;
  const next = useCallback(() => setIndex((p) => (p >= max ? 0 : p + 1)), [max]);
  const prev = useCallback(() => setIndex((p) => (p <= 0 ? max : p - 1)), [max]);
  const visible = REVIEWS.slice(index, index + perView);

  return (
    <section id="proof" className="section overflow-x-clip border-t border-[#1c1c1c] bg-[#0a0a0a]">
      <div className="container">
        <SectionHeader
          index="07"
          eyebrow="Proof of work"
          title={
            <>
              Receipts, <span className="display-accent">not promises.</span>
            </>
          }
          lede="Unscripted words from the floor — every reviewer is a current or former member you can ask about on your tour."
        />

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 md:grid-cols-3"
            >
              {visible.map((r) => (
                <figure key={r.id} className="flex flex-col rounded-[10px] border border-[#222] bg-card p-7">
                  <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                    ))}
                  </div>
                  <span aria-hidden="true" className="display-accent mt-4 text-5xl leading-none">
                    &ldquo;
                  </span>
                  <blockquote className="-mt-2 flex-1 text-[15px] leading-relaxed text-[#d4d4d4]">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-[#1e1e1e] pt-5">
                    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/5 font-mono text-sm font-semibold text-primary">
                      {r.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{r.author}</span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{r.meta}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous stories"
            className="pressable grid h-11 w-11 place-items-center rounded-md border border-[#2c2c2c] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Story pages">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to stories ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn('h-1.5 rounded-full transition-all duration-300', i === index ? 'w-8 bg-primary' : 'w-1.5 bg-[#333] hover:bg-[#555]')}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next stories"
            className="pressable grid h-11 w-11 place-items-center rounded-md border border-[#2c2c2c] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[#222] bg-[#222] md:grid-cols-4"
        >
          {SUMMARY.map((s) => (
            <div key={s.label} className="bg-[#0a0a0a] p-6 text-center">
              <dt className="order-2 mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</dt>
              <dd className="tabular font-mono text-3xl font-semibold text-primary">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}