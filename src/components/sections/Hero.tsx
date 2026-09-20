'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { useTrial } from '@/components/forms/TrialModal';
import { scrollToId } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const TRUST = [
  { value: '1000+', label: 'Members forged' },
  { value: '50+', label: 'Expert coaches' },
  { value: '4.9', label: 'Member rating' },
];

/* Scroll-expansion hero (Crystal Cabin DNA), composed as two perfectly
   centered layers that crossfade — so the opening and ending compositions
   are each exact, with no reserved-space drift and nothing clipped:
   - LAYER A (start): the motto + three stars, centered over the card.
   - LAYER B (end): compact eyebrow (the quote, kept alive) + static stars +
     headline + sub + CTAs + trust readouts. Sized to fit a 667px phone.
   The frame itself grows via CLIP-PATH (composited, zero layout thrash),
   scrub:true couples the timeline exactly to Lenis-smoothed scroll, and
   trigger positions refresh once fonts and the photo land. */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const miniRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { openTrial } = useTrial();

  // Layout effect: initial states land before first paint — no flash of the
  // end state, no snap-back.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    // Explicit dimensions (not clip-path strings): grid centering keeps growth
    // perfectly symmetric, immune to CSS value normalization.
    // Closed frame is a balanced landscape rectangle (clearly wider than
    // tall, not square) that expands to fullscreen on scroll.
    const closedW = mobile ? '88vw' : '46vw';
    const closedH = mobile ? '42vh' : '56vh';

    if (reduced) {
      gsap.set(frameRef.current, { width: '100vw', height: '100vh', borderRadius: 0 });
      gsap.set(scrimRef.current, { opacity: 0.68 });
      gsap.set(layerARef.current, { opacity: 0 });
      gsap.set(starRefs.current, { color: '#ff5a1f' });
      gsap.set(miniRef.current, { opacity: 1, y: 0 });
      gsap.set(line1Ref.current, { opacity: 1, y: 0 });
      gsap.set(line2Ref.current, { opacity: 1 });
      gsap.set([subRef.current, ctasRef.current, trustRef.current], { opacity: 1, y: 0 });
      gsap.set([cueRef.current, ticksRef.current, progressRef.current], { opacity: 0 });
      const st = ScrollTrigger.create({ trigger: root, start: 'top top', end: 'bottom bottom' });
      return () => {
        st.kill();
      };
    }

    const ctx = gsap.context(() => {
      gsap.set(frameRef.current, { width: closedW, height: closedH, borderRadius: 0 });
      gsap.set(photoRef.current, { scale: 1.12 });
      gsap.set(scrimRef.current, { opacity: 0.84 });
      gsap.set(starRefs.current, { color: '#3a3a3a', textShadow: 'none' });
      gsap.set(miniRef.current, { opacity: 0, y: 14 });
      gsap.set(line1Ref.current, { opacity: 0, y: 34 });
      gsap.set(line2Ref.current, { opacity: 0 });
      gsap.set([subRef.current, ctasRef.current, trustRef.current], { opacity: 0, y: 26 });
      gsap.set(progressRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      tl.to(cueRef.current, { opacity: 0, duration: 0.05 }, 0)
        .to(ticksRef.current, { opacity: 0, duration: 0.08 }, 0)
        .to(progressRef.current, { scaleX: 1, duration: 1 }, 0)
        .to(frameRef.current, { width: '100vw', height: '100vh', borderRadius: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
        .to(photoRef.current, { scale: 1, duration: 1 }, 0)
        .to(scrimRef.current, { opacity: 0.68, duration: 0.5 }, 0)
        .to(
          starRefs.current,
          {
            color: '#ff5a1f',
            textShadow: '0 0 18px rgba(255,90,31,0.65)',
            duration: 0.05,
            stagger: 0.055,
          },
          0.04,
        )
        .to(layerARef.current, { y: -30, opacity: 0, duration: 0.18, ease: 'power2.in' }, 0.14)
        .to(miniRef.current, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.42)
        .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.12, ease: 'power3.out' }, 0.48)
        .to(line2Ref.current, { opacity: 1, duration: 0.14, ease: 'power2.out' }, 0.55)
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.62)
        .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.68)
        .to(trustRef.current, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.74);
    }, root);

    // Fonts and the hero photo landing late shifts layout — re-measure after.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="top" aria-label="Forge" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div ref={progressRef} aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left bg-primary" />

        {/* Expanding frame — explicit dimensions inside a centering grid, so
            growth is symmetric from the center by construction */}
        <div className="absolute inset-0 grid place-items-center">
          {/* Outer frame (animated size) — overflow visible so the corner
              brackets can sit OUTSIDE the photo edges. The photo itself clips
              in the inner wrapper, which inherits the animated radius. */}
          <div ref={frameRef} className="relative ring-1 ring-white/10" style={{ width: '46vw', height: '56vh', borderRadius: 0 }}>
            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
              <img
                ref={photoRef}
                src="/assets/background.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                onLoad={() => ScrollTrigger.refresh()}
              />
              <div ref={scrimRef} className="absolute inset-0 bg-black" style={{ opacity: 0.84 }} aria-hidden="true" />
            </div>
            {/* Corner brackets — straddling the frame edges (half outside,
                half in) so they read locked to the corners, not floating */}
            <div ref={ticksRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-primary" />
              <span className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-primary" />
              <span className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-primary" />
              <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-primary" />
            </div>
          </div>
        </div>

        {/* Content — two centered layers, crossfaded by scroll */}
        <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 place-items-center px-5 sm:px-8">
          {/* LAYER A — opening: motto + igniting stars, sized to hold the frame */}
          <div ref={layerARef} className="col-start-1 row-start-1 w-full px-2 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary indent-[0.2em] [text-shadow:0_0_28px_rgba(255,90,31,0.4)] sm:text-base sm:tracking-[0.3em] sm:indent-[0.3em]">
              DISCIPLINE.&nbsp;&nbsp;STRENGTH.&nbsp;&nbsp;RESULTS.
            </p>
            <p aria-hidden="true" className="mt-5 flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[#3a3a3a] sm:w-24" />
              <span className="flex items-center gap-5 text-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      starRefs.current[i] = el;
                    }}
                  >
                    ★
                  </span>
                ))}
              </span>
              <span className="h-px w-16 bg-[#3a3a3a] sm:w-24" />
            </p>
          </div>

          {/* LAYER B — ending: quote kept alive, stars kept, full pitch */}
          <div className="col-start-1 row-start-1 w-full max-w-3xl px-2 text-center">
            <div ref={miniRef}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-primary indent-[0.3em] sm:text-[11px]">
                Discipline · Strength · Results
              </p>
              <p aria-hidden="true" className="mt-3 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#333]" />
                <span className="flex items-center gap-2 text-[11px] tracking-normal text-primary">★★★</span>
                <span className="h-px w-10 bg-[#333]" />
              </p>
            </div>

            <h1 className="mt-6 text-balance font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground text-[clamp(2.5rem,13vw,4.5rem)] sm:text-7xl">
              <span ref={line1Ref} className="block">Forged in</span>
              <span ref={line2Ref} className="block">
                <span className="display-accent font-normal">every rep.</span>
              </span>
            </h1>

            <p ref={subRef} className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#d4d4d4] sm:mt-5 sm:text-lg">
              Jhapa&apos;s iron house — expert coaching, real programming and a
              community that shows up. Your first class is on us.
            </p>

            <div ref={ctasRef} className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Button size="lg" onClick={() => openTrial()} className="w-full sm:w-auto">
                Claim free class
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId('programs')} className="w-full sm:w-auto">
                Explore programs
              </Button>
            </div>

            <div ref={trustRef} className="mt-7 sm:mt-9">
              <dl className="flex items-stretch justify-center gap-5 sm:gap-10">
                {TRUST.map((t, i) => (
                  <div key={t.label} className="flex items-stretch gap-5 sm:gap-10">
                    {i > 0 && <span aria-hidden="true" className="w-px bg-white/15" />}
                    <div>
                      <dt className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px]">
                        {t.label}
                      </dt>
                      <dd className="tabular font-mono text-xl font-semibold text-foreground sm:text-3xl">
                        {t.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div ref={cueRef} className="absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-3 sm:bottom-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll to enter
          </span>
          <span className="block h-10 w-px bg-[#333]" aria-hidden="true">
            <span className="block h-4 w-px animate-[cue-drop_1.6s_ease-in-out_infinite] bg-primary" />
          </span>
        </div>
      </div>
    </section>
  );
}