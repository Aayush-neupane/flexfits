'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SectionHeader from '@/components/common/SectionHeader';
import { useTrial } from '@/components/forms/TrialModal';
import { getGymStatus } from '@/lib/gym-status';
import { scrollToId } from '@/lib/scroll';
import { fadeUp, staggerParent } from '@/components/common/motion';
import { toast } from 'react-hot-toast';
import { contactSchema, sendLead } from '@/lib/leads';

const ROWS = [
  { k: 'Visit', v: 'ShivaSatakshi-1, Jhapa', href: 'https://maps.google.com/?q=Shivasatakshi+Jhapa', external: true },
  { k: 'Call', v: '(+977) 9862862023', href: 'tel:+9779862862023', external: false },
  { k: 'Write', v: 'hello@flexfits.com', href: 'mailto:hello@flexfits.com', external: false },
  { k: 'Hours', v: 'Mon–Fri 6–22 · Sat–Sun 8–20', href: '#forge', external: false },
];

export default function Contact() {
  const { openTrial } = useTrial();
  const status = getGymStatus();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Please check the form.');
      return;
    }
    setSending(true);
    const res = await sendLead(`Website message from ${parsed.data.name}`, parsed.data);
    setSending(false);
    if (!res.ok) {
      toast.error(res.error, { duration: 6000 });
      return;
    }
    setForm({ name: '', email: '', message: '' });
    toast.success('Message received — we reply within a day.');
  };

  return (
    <section id="contact" className="section overflow-x-clip">
      <div className="container">
        <SectionHeader
          index="08"
          eyebrow="Contact"
          title={
            <>
              Walk in. <span className="display-accent">We&apos;ll talk iron.</span>
            </>
          }
          lede="Questions, tours, challanges to our coaches — use the form or just show up during floor hours."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="overflow-hidden rounded-[10px] border border-[#222]"
          >
            <div className="flex items-center justify-between border-b border-[#1e1e1e] bg-card px-6 py-4">
              <span className="eyebrow">Front desk</span>
              <span className="hud-pill !py-1.5">
                <span className={status.open ? 'live-dot' : 'live-dot live-dot-gold'} aria-hidden="true" />
                {status.label}
              </span>
            </div>
            {ROWS.map((r, i) => (
              <a
                key={r.k}
                href={r.href}
                target={r.external ? '_blank' : undefined}
                rel={r.external ? 'noopener noreferrer' : undefined}
                onClick={r.external ? undefined : (e) => { if (r.href.startsWith('#')) { e.preventDefault(); scrollToId(r.href); } }}
                className={`group flex items-center justify-between gap-4 bg-card px-6 py-5 transition-colors hover:bg-white/[0.02] ${i > 0 ? 'border-t border-[#1e1e1e]' : ''}`}
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{r.k}</span>
                  <span className="mt-1 block text-[15px] font-medium text-foreground">{r.v}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
              </a>
            ))}
            <div className="border-t border-[#1e1e1e] bg-[#0d0d0d] px-6 py-5">
              <Button className="w-full" size="lg" onClick={() => openTrial()}>
                Claim free class instead
              </Button>
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onSubmit={submit}
            className="rounded-[10px] border border-[#222] bg-card p-6 sm:p-8"
          >
            <p className="eyebrow">Send a message</p>
            <div className="mt-6 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    disabled={sending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@mail.com"
                    required
                    disabled={sending}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Goal, schedule, injuries we should know about…"
                  rows={5}
                  required
                  disabled={sending}
                />
              </div>
              <Button type="submit" size="lg" className="w-full" loading={sending}>
                {sending ? (
                  <>Sending…</>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
              {sending && <Loader2 className="sr-only animate-spin" aria-hidden="true" />}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}