'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/common/SectionHeader';
import { fadeUp, staggerParent } from '@/components/common/motion';

const COACHES = [
  {
    id: 'khadka',
    name: 'A. Khadka',
    role: 'Strength & Conditioning',
    bio: '12 years forging athletes. Barbell-first, technique-obsessed, allergic to ego lifting.',
    specialties: ['Powerlifting', 'Hypertrophy', 'Athletic prep'],
    certs: ['NSCA-CSCS', 'USAW L2'],
    experience: '12 YRS',
    initials: 'AK',
  },
  {
    id: 'sharma',
    name: 'S. Sharma',
    role: 'Yoga & Mobility',
    bio: 'RYT-500 teacher turning stiff lifters into supple movers. Breathwork included, incense optional.',
    specialties: ['Vinyasa', 'Mobility', 'Breathwork'],
    certs: ['RYT-500', 'FRCms'],
    experience: '8 YRS',
    initials: 'SS',
  },
  {
    id: 'thapa',
    name: 'R. Thapa',
    role: 'Conditioning & HIIT',
    bio: 'Ex-competitor who programs suffering with a smile. Sleds, intervals, measurable engines.',
    specialties: ['HIIT', 'Sled & engine', 'Fat loss'],
    certs: ['CF-L3', 'PN1'],
    experience: '10 YRS',
    initials: 'RT',
  },
];

export default function Trainers() {
  return (
    <section id="coaches" className="section overflow-x-clip border-t border-[#1c1c1c] bg-[#0a0a0a]">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Coaches"
          title={
            <>
              Coached by people who <span className="display-accent">lift.</span>
            </>
          }
          lede="Fifty-plus certified coaches on the roster. These three run the flagship programs — every one of them still trains."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 md:grid-cols-3"
        >
          {COACHES.map((c, i) => (
            <motion.article
              key={c.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group rounded-[10px] border border-[#222] bg-card p-7 transition-colors hover:border-primary/60 hover:shadow-[0_16px_40px_rgba(236,102,54,0.1)]"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="grid h-16 w-16 place-items-center rounded-full border border-primary/40 bg-primary/5 font-mono text-xl font-semibold text-primary"
                >
                  {c.initials}
                </span>
                <span className="hud-pill !px-3 !py-1.5 !text-[10px]">{c.experience}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{c.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{c.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-[#1e1e1e] pt-5">
                {c.specialties.map((s) => (
                  <span key={s} className="hud-pill !py-1.5">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground/70">
                {c.certs.join(' · ')}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}