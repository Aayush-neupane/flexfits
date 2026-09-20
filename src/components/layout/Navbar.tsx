'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTrial } from '@/components/forms/TrialModal';
import { scrollToId } from '@/lib/scroll';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { id: 'programs', label: 'Programs' },
  { id: 'index', label: 'Index' },
  { id: 'forge', label: 'Forge' },
  { id: 'coaches', label: 'Coaches' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'proof', label: 'Proof' },
  { id: 'contact', label: 'Contact' },
];

const NAV_IDS = new Set(NAV_LINKS.map((l) => l.id));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const { openTrial } = useTrial();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let current = 'top';
      if (window.scrollY >= 120) {
        sections.forEach((section) => {
          const el = section as HTMLElement;
          const id = section.getAttribute('id');
          if (!id || !NAV_IDS.has(id)) return;
          if (window.scrollY >= el.offsetTop - 160) {
            current = id;
          }
        });
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-[#1f1f1f] bg-[#080808]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <button
          type="button"
          onClick={() => go('top')}
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

        {/* Pinned to the nav's horizontal center axis — shares the vertical
            axis with the hero's centered layers regardless of logo/CTA width */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              aria-current={activeSection === link.id ? 'page' : undefined}
              className={cn(
                'relative py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-colors',
                activeSection === link.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => openTrial()} className="hidden sm:inline-flex">
            First class free
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            aria-label="Mobile"
            className="overflow-hidden border-t border-[#1f1f1f] bg-[#080808] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className={cn(
                    'flex items-baseline gap-3 rounded-md px-3 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] transition-colors',
                    activeSection === link.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                  )}
                >
                  <span className="text-[10px] text-muted-foreground/60">0{i + 1}</span>
                  {link.label}
                </button>
              ))}
              <div className="mt-3 border-t border-[#1f1f1f] pt-4">
                <Button className="w-full" onClick={() => { setOpen(false); openTrial(); }}>
                  Claim free class
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}