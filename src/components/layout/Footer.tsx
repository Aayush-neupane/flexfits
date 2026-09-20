'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { getGymStatus } from '@/lib/gym-status';
import { scrollToId } from '@/lib/scroll';
import { fadeUp } from '@/components/common/motion';

const COLUMNS = [
  {
    title: 'Forge',
    links: [
      { label: 'Programs', id: 'programs' },
      { label: 'Movement index', id: 'index' },
      { label: 'Coaches', id: 'coaches' },
      { label: 'Pricing', id: 'pricing' },
    ],
  },
  {
    title: 'Proof',
    links: [
      { label: 'Member stories', id: 'proof' },
      { label: 'The forge', id: 'forge' },
      { label: 'Contact', id: 'contact' },
      { label: 'Back to top', id: 'top' },
    ],
  },
];

const DIRECT = [
  { icon: Phone, label: 'Call the front desk', href: 'tel:+9779862862023' },
  { icon: Mail, label: 'Email the front desk', href: 'mailto:hello@flexfits.com' },
  { icon: MapPin, label: 'Get directions', href: 'https://maps.google.com/?q=Shivasatakshi+Jhapa' },
];

export default function Footer() {
  const status = getGymStatus();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1f1f1f] bg-[#060606]">
      <div className="container py-14 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <button
              type="button"
              onClick={() => scrollToId('top')}
              aria-label="FlexFits — back to top"
              className="flex items-center"
            >
              <img
                src="/assets/logo-nav.png"
                alt="FlexFits"
                width={48}
                height={48}
                draggable={false}
                className="h-12 w-auto object-contain"
              />
            </button>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Jhapa&apos;s iron house. Coaching, programming and community for people who
              show up — since 2014.
            </p>
            <p className="hud-pill mt-6">
              <span className={status.open ? 'live-dot' : 'live-dot live-dot-gold'} aria-hidden="true" />
              {status.label} · {status.detail}
            </p>
            <div className="mt-6 flex gap-2">
              {DIRECT.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-[#2a2a2a] text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollToId(link.id)}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow">Floor hours</h3>
            <dl className="mt-5 space-y-3 font-mono text-xs tracking-wider text-muted-foreground">
              <div className="flex justify-between gap-4 border-b border-[#1c1c1c] pb-3">
                <dt>MON — FRI</dt>
                <dd className="tabular text-foreground">06:00 – 22:00</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#1c1c1c] pb-3">
                <dt>SAT — SUN</dt>
                <dd className="tabular text-foreground">08:00 – 20:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>LOCATION</dt>
                <dd className="text-right text-foreground">ShivaSatakshi-1, Jhapa</dd>
              </div>
            </dl>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#1c1c1c] pt-6 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            © {year} FlexFits · All rights reserved
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Discipline · Strength · <span className="text-primary">Results</span>
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-[#1c1c1c] pt-6">
          <a
            href="https://dynamic-aayush38.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aayush Neupane — portfolio"
            className="group flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <img
              src="/assets/logotrp.png"
              alt="Aayush Neupane"
              width={32}
              height={32}
              draggable={false}
              className="h-8 w-8 rounded-full border border-[#2a2a2a] object-cover transition-colors group-hover:border-primary"
            />
            <span>
              Developed by{' '}
              <span className="text-foreground underline-offset-4 group-hover:text-primary group-hover:underline">
                Aayush Neupane
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}