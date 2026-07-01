'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  description: string;
  vector: React.ReactNode;
}

const servicesList: Service[] = [
  {
    id: 1,
    title: 'Prompting & AI Image Generation',
    description: 'Hyper-realistic visual production, advanced prompt engineering, and custom model generation specialized for high-fidelity brand imagery and asset scaling.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'AI Commercial Ads',
    description: 'Data-optimized dynamic visual campaigns engineered across AI video platforms to lower production costs while maximizing click-through rates and high-intent engagement.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-4.5 3v-6l4.5 3z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'AI UGC Ads',
    description: 'Generating highly relatable, localized User Generated Content assets built through specialized AI face, voice synthesis, and pacing logic tailored for social channels.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Web Development',
    description: 'Immersive, hyper-performant front-end environments rendering complex interactive layout logic, 3D Canvas rendering, and modern micro-interactions.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'Social Media Management',
    description: 'Algorithmic positioning schedules combined with highly stylized premium graphics pipelines to continuously build, retain, and capture brand equity organic growth.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    )
  },
  {
    id: 6,
    title: 'Performance Marketing',
    description: 'ROI-focused media buying, precision tracking architecture setup, analytical funnel building, and scale strategies focused intensely on profitable acquisition metrics.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    )
  },
  {
    id: 7,
    title: 'Identity Branding',
    description: 'Engineering foundational brand core assets, minimalistic vector logomarks, typography rules, and strategic identity design layouts that communicate luxury value.',
    vector: (
      <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-3.388 1.62a15.947 15.947 0 01-1.618-3.388m4.52-4.475a3 3 0 00-1.128-5.78 2.25 2.25 0 01-2.245-2.4 4.5 4.5 0 002.245 8.4c.399 0 .78-.078 1.128-.22zm0 0a15.998 15.998 0 001.62-3.388m-1.62 3.388a15.947 15.947 0 013.388-1.618zm4.475 4.52a3 3 0 005.78-1.128 2.25 2.25 0 012.4-2.245 4.5 4.5 0 00-8.4 2.245c0 .399.078.78.22 1.128zm0 0a15.998 15.998 0 00-3.388 1.62m3.388-1.62a15.947 15.947 0 011.618 3.388m-4.524-4.52a15.98 15.98 0 00-1.618-3.388m1.618 3.388a15.98 15.98 0 01-3.388 1.618zm-4.475-4.52a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-3.388 1.62a15.947 15.947 0 011.618 3.388z" />
      </svg>
    )
  }
];

export const ServicesSection = () => {
  return (
    /* FIXED: Tightened layout container tracking boundary down to clean vertical blocks */
    <div className="w-full bg-white text-zinc-950 px-4 md:px-8 py-8 md:py-12">
      
      {/* Glow Boundaries CSS Injection */}
      <style jsx global>{`
        @keyframes borderGlowShift {
          0% { border-color: #ff33a6; }
          33% { border-color: #591acc; }
          66% { border-color: #f20d26; }
          100% { border-color: #ff33a6; }
        }
        .shiny-glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          animation: borderGlowShift 6s linear infinite;
        }
      `}</style>

      {/* FIXED: Compressed spacing under the header block to look closely anchored */}
      <div className="max-w-4xl mx-auto mb-10">
        <span className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase block mb-2">
          Expertise Matrix
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950">
          Core Capabilities.
        </h2>
      </div>

      {/* Stacked Compact Deck Grid Layout */}
      <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-14">
        {servicesList.map((service, idx) => {
          // Compact top sticky spacing calculation
          const topOffset = 120 + idx * 30; 
          
          return (
            <div
              key={service.id}
              style={{
                position: 'sticky',
                top: `${topOffset}px`,
              }}
              className="w-full pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ type: 'spring', damping: 22, stiffness: 90 }}
                className="w-full min-h-[220px] md:min-h-[250px] shiny-glass-card border-2 rounded-[24px] p-6 md:p-10 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] group transition-transform duration-300"
              >
                {/* Upper Structural row */}
                <div className="flex items-start justify-between w-full">
                  <div className="text-zinc-900 group-hover:scale-105 transition-transform duration-300">
                    {service.vector}
                  </div>
                  <span className="text-xs font-mono tracking-widest text-zinc-400">
                    // 0{service.id}
                  </span>
                </div>

                {/* Content Details: High contrast pitch black text */}
                <div className="max-w-2xl mt-6">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-zinc-900 text-xs md:text-sm font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
