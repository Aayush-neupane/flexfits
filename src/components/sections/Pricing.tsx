'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/common/SectionHeader';
import { useTrial } from '@/components/forms/TrialModal';
import { fadeUp, staggerParent } from '@/components/common/motion';
import { cn } from '@/lib/utils';

type Billing = 'monthly' | 'yearly';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    monthly: 2500,
    yearly: 2000,
    blurb: 'Floor access for self-driven lifters.',
    features: ['Full floor access', 'Cardio + strength zones', 'Locker & shower', 'App programming', '1 guest pass / mo'],
    excluded: ['Group classes', 'Sauna & steam', 'Nutrition consult'],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 3500,
    yearly: 2800,
    blurb: 'Classes, coaching touchpoints, recovery.',
    features: ['Everything in Basic', 'Unlimited classes', '2 PT sessions / mo', 'Sauna, steam, recovery', 'Monthly nutrition consult', 'Body-composition scans'],
    excluded: ['Unlimited PT', 'Custom meal plans'],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    monthly: 5000,
    yearly: 4000,
    blurb: 'Fully coached transformation.',
    features: ['Everything in Pro', 'Unlimited PT sessions', 'Custom meal planning', 'Dedicated coach', 'Recovery therapy', '24/7 access', 'Unlimited guests'],
    excluded: [],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const { openTrial } = useTrial();

  return (
    <section id="pricing" className="section overflow-x-clip">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Membership"
          title={
            <>
              Pay for iron, <span className="display-accent">not frills.</span>
            </>
          }
          lede="No joining fee. No lock-in. Every plan starts with the same free first class — upgrade, downgrade or walk away anytime."
        />

        {/* Billing pill (sliding selector) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 flex justify-center"
        >
          <div className="relative grid grid-cols-2 rounded-full border border-[#2c2c2c] bg-card p-1" role="radiogroup" aria-label="Billing period">
            {(['monthly', 'yearly'] as Billing[]).map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
                className={cn(
                  'relative z-10 rounded-full px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors',
                  billing === b ? 'text-[#080808]' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {billing === b && (
                  <motion.span
                    layoutId="billing-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {b === 'monthly' ? 'Monthly' : 'Yearly −20%'}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid items-stretch gap-4 lg:grid-cols-3"
        >
          {PLANS.map((plan, i) => {
            const price = billing === 'monthly' ? plan.monthly : plan.yearly;
            return (
              <motion.article
                key={plan.id}
                variants={fadeUp}
                custom={i}
                className={cn(
                  'relative flex flex-col overflow-hidden rounded-[10px] border bg-card p-8 transition-colors',
                  plan.popular ? 'border-primary/70 shadow-[0_0_50px_rgba(236,102,54,0.12)]' : 'border-[#222] hover:border-[#3a3a3a]',
                )}
              >
                {plan.popular && (
                  <span className="absolute -right-10 top-5 rotate-45 bg-primary px-10 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#080808]">
                    Most forged
                  </span>
                )}
                <p className="eyebrow">{plan.name}</p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="tabular text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Rs. {price.toLocaleString('en-IN')}</span>
                  <span className="font-mono text-xs text-muted-foreground">/ MO</span>
                </div>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-muted-foreground">
                  {billing === 'yearly' ? `Billed annually · save Rs. ${((plan.monthly - plan.yearly) * 12).toLocaleString('en-IN')}/yr` : 'Billed monthly · cancel anytime'}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{plan.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-[#1e1e1e] pt-6" role="list">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#d4d4d4]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                  {plan.excluded.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground/50">
                      <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  className="mt-8 w-full"
                  onClick={() => openTrial(plan.id, billing)}
                >
                  Start with free class
                </Button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}