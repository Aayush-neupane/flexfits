'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { scaleIn } from '@/components/common/motion';

interface TrialContextValue {
  openTrial: (plan?: string, billing?: Billing) => void;
}

const TrialContext = createContext<TrialContextValue>({ openTrial: () => {} });

export const useTrial = () => useContext(TrialContext);

type Billing = 'monthly' | 'yearly';

const PLANS = [
  { id: 'basic', name: 'Basic', monthly: 2500, yearly: 2000 },
  { id: 'pro', name: 'Pro', monthly: 3500, yearly: 2800 },
  { id: 'elite', name: 'Elite', monthly: 5000, yearly: 4000 },
];

const GOALS = ['Build muscle', 'Lose fat', 'Get stronger', 'Move pain-free', 'Train for sport'];

/* Free-class booking modal:
   blurred scrim, hairline panel, plan pills, staged success state. */
export function TrialProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState('pro');
  const [billing, setBilling] = useState<Billing>('monthly');
  const [goal, setGoal] = useState(GOALS[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const openTrial = useCallback((planId?: string, billingPeriod?: Billing) => {
    if (planId) setPlan(planId);
    if (billingPeriod) setBilling(billingPeriod);
    setReference(null);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    if (sending) return;
    setOpen(false);
  }, [sending]);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !phone.trim()) return;
      setSending(true);
      window.setTimeout(() => {
        setReference(`FF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
        setSending(false);
      }, 1100);
    },
    [name, phone],
  );

  const value = useMemo(() => ({ openTrial }), [openTrial]);

  return (
    <TrialContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-4 sm:items-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Claim your free first class"
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[#2c2c2c] bg-[#141414] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            >
              <div aria-hidden="true" className="h-[3px] w-full bg-primary" />
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              {reference ? (
                <div className="p-8 text-center sm:p-10">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-primary/40 bg-primary/10"
                  >
                    <Check className="h-8 w-8 text-primary" aria-hidden="true" />
                  </motion.div>
                  <p className="eyebrow mt-6">Request received</p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                    See you on the <span className="display-accent">floor.</span>
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {name.split(' ')[0] || 'Friend'}, your free class is reserved. A coach calls{' '}
                    <span className="text-foreground">{phone}</span> within 24 hours to schedule
                    it.
                  </p>
                  <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-md border border-dashed border-primary/40 bg-primary/5 px-4 py-2 font-mono text-sm tracking-[0.2em] text-primary">
                    {reference}
                  </p>
                  <div className="mt-8">
                    <Button onClick={close} className="w-full" size="lg">
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="p-8 sm:p-10">
                  <p className="eyebrow">Free first class</p>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                    Claim your <span className="display-accent">free class.</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    One full coached class, floor tour + assessment. No card required.
                  </p>

                  <div className="mt-7 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="trial-name">Full name</Label>
                        <Input
                          id="trial-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          disabled={sending}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="trial-phone">Phone</Label>
                        <Input
                          id="trial-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+977 …"
                          inputMode="tel"
                          required
                          disabled={sending}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Primary goal</Label>
                      <Select value={goal} onValueChange={setGoal} disabled={sending}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GOALS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Plan you&apos;re eyeing</Label>
                      <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-card p-1" role="radiogroup" aria-label="Billing period">
                        {(['monthly', 'yearly'] as Billing[]).map((b) => (
                          <button
                            key={b}
                            type="button"
                            role="radio"
                            aria-checked={billing === b}
                            onClick={() => setBilling(b)}
                            disabled={sending}
                            className={`rounded-md px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                              billing === b ? 'bg-primary text-[#080808]' : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {b === 'monthly' ? 'Monthly' : 'Yearly −20%'}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Plan">
                        {PLANS.map((p) => {
                          const price = billing === 'monthly' ? p.monthly : p.yearly;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              role="radio"
                              aria-checked={plan === p.id}
                              onClick={() => setPlan(p.id)}
                              className={`pressable rounded-lg border p-3 text-left transition-colors ${
                                plan === p.id
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border bg-card hover:border-muted-foreground/40'
                              }`}
                            >
                              <span className={`block text-xs font-semibold ${plan === p.id ? 'text-primary' : 'text-foreground'}`}>
                                {p.name}
                              </span>
                              <span className="tabular mt-0.5 block font-mono text-sm text-muted-foreground">
                                Rs. {price.toLocaleString('en-IN')}/mo
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="font-mono text-[11px] tracking-wider text-muted-foreground">
                        {billing === 'yearly'
                          ? 'Billed annually · yearly −20% vs monthly'
                          : 'Billed monthly · switch to yearly to save 20%'}
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full" loading={sending}>
                      {sending ? 'Reserving…' : 'Reserve my free class'}
                    </Button>
                    <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      No card · No commitment · Cancel anytime
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TrialContext.Provider>
  );
}