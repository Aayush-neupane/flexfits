/* Central smooth-scroll helper. Uses the Lenis instance when active,
   falls back to native smooth scrolling otherwise. */

interface LenisLike {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

function getLenis(): LenisLike | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

export function scrollToId(id: string) {
  const clean = id.replace(/^#/, '');
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(`#${clean}`, { offset: -72, duration: 1.4 });
    return;
  }
  const el = document.getElementById(clean);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0 as unknown as string, { duration: 1.4 });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}