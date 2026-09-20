'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from './motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: 'left' | 'center';
}

/* Editorial section header: mono numbered eyebrow + tight headline with a
   serif-italic molten accent word. */
export default function SectionHeader({ index, eyebrow, title, lede, align = 'center' }: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('mb-12 max-w-3xl sm:mb-16', centered && 'mx-auto text-center')}
    >
      <p className={cn('eyebrow flex items-center gap-3', centered && 'justify-center')}>
        <span className="text-muted-foreground">{index}</span>
        <span aria-hidden="true" className="inline-block h-px w-8 bg-primary/60" />
        <span>{eyebrow}</span>
      </p>
      <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className={cn('mt-5 max-w-xl text-base leading-relaxed text-muted-foreground', centered && 'mx-auto')}>
          {lede}
        </p>
      )}
    </motion.div>
  );
}