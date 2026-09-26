'use client';

import { Toaster } from 'react-hot-toast';
import { Hero, Stats, Services, Exercises, About, Trainers, Pricing, Reviews, Contact } from '@/components/sections';
import { Layout } from '@/components/layout';
import { TrialProvider } from '@/components/forms/TrialModal';
import { useLenis } from '@/hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <TrialProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#141414',
            color: '#f5f5f5',
            border: '1px solid #2c2c2c',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#ec6636', secondary: '#080808' },
          },
          error: {
            iconTheme: { primary: '#d64545', secondary: '#f5f5f5' },
          },
        }}
      />
      <Layout>
        <Hero />
        <Stats />
        <Services />
        <Exercises />
        <About />
        <Trainers />
        <Pricing />
        <Reviews />
        <Contact />
      </Layout>
    </TrialProvider>
  );
}