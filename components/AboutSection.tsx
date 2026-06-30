'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 100 }
    }
  };

  return (
    <section id="about" className="w-full bg-white text-zinc-950 px-4 md:px-8 py-20">
      {/* 3D Dynamic Border Color Rotation Engine */}
      <style jsx global>{`
        @keyframes border3DGlow {
          0% { border-color: #ff33a6; }
          33% { border-color: #591acc; }
          66% { border-color: #f20d26; }
          100% { border-color: #ff33a6; }
        }
        .glow-3d-boundary {
          border: 2px solid #ff33a6;
          animation: border3DGlow 6s linear infinite;
        }
        .text-gradient-3d {
          background: linear-gradient(90deg, #ff33a6, #591acc, #f20d26);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Grid wrapper aligned to center items vertically */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Short, Clear, and Well-Spaced Layout */}
        <div className="flex flex-col items-start space-y-6">
          <div>
            <span className="text-sm font-black tracking-[0.2em] uppercase block mb-2 text-gradient-3d">
              About Me
            </span>
            {/* Forced 2-row desktop heading */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 max-w-md leading-[1.1]">
              Engineering High-Converting Digital Systems.
            </h2>
          </div>

          {/* Sizing matches original base scale layout with clean black tracking styling */}
          <div className="text-black text-sm md:text-base font-normal leading-relaxed max-w-sm space-y-3">
            <p>
              I have helped scale <span className="text-gradient-3d font-black">60+ businesses</span>, 
              launching <span className="text-gradient-3d font-black">10 of them as successful new startups</span>, 
              and generating over <span className="text-gradient-3d font-black">$1.5 million in revenue</span>.
            </p>
            <p>
              Every strategy I develop is meticulously engineered to dramatically increase conversion rates, 
              drive qualified leads, and deliver sustainable business growth.
            </p>
          </div>

          {/* Symmetrical Action Button - Hard-locked white background & black text */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="glow-3d-boundary bg-white text-black px-8 py-3 rounded-full font-bold tracking-wide text-center text-sm shadow-sm select-none block transition-transform duration-200"
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            Let's work together
          </motion.a>
        </div>

        {/* RIGHT SIDE: Compact, small card grid vertically centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* CARD 1 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-4 rounded-xl glow-3d-boundary bg-white shadow-sm flex flex-col justify-center cursor-pointer"
          >
            <h3 className="text-sm font-black tracking-tight text-zinc-950 mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              AI Advertising &amp; UGC
            </h3>
            <ul className="space-y-0.5 text-xs md:text-sm text-zinc-600 list-disc pl-4 font-bold tracking-tight">
              <li>Synthetic Ads</li>
              <li>Algorithmic Pacing</li>
              <li>Hook Testing</li>
              <li>Low Costs</li>
            </ul>
          </motion.div>

          {/* CARD 2 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-4 rounded-xl glow-3d-boundary bg-white shadow-sm flex flex-col justify-center cursor-pointer"
          >
            <h3 className="text-sm font-black tracking-tight text-zinc-950 mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              Performance Marketing
            </h3>
            <ul className="space-y-0.5 text-xs md:text-sm text-zinc-600 list-disc pl-4 font-bold tracking-tight">
              <li>Paid Acquisition</li>
              <li>Attribution Setup</li>
              <li>Asset Scaling</li>
              <li>Lifetime Funnels</li>
            </ul>
          </motion.div>

          {/* CARD 3 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-4 rounded-xl glow-3d-boundary bg-white shadow-sm flex flex-col justify-center cursor-pointer"
          >
            <h3 className="text-sm font-black tracking-tight text-zinc-950 mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              Web Dev &amp; Branding
            </h3>
            <ul className="space-y-0.5 text-xs md:text-sm text-zinc-600 list-disc pl-4 font-bold tracking-tight">
              <li>3D/WebGL Layouts</li>
              <li>Checkout Flows</li>
              <li>Vector Identities</li>
              <li>Core Vitals</li>
            </ul>
          </motion.div>

          {/* CARD 4 */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-4 rounded-xl glow-3d-boundary bg-white shadow-sm flex flex-col justify-center cursor-pointer"
          >
            <h3 className="text-sm font-black tracking-tight text-zinc-950 mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              SMM &amp; Prompting
            </h3>
            <ul className="space-y-0.5 text-xs md:text-sm text-zinc-600 list-disc pl-4 font-bold tracking-tight">
              <li>Organic Visibility</li>
              <li>Prompt Pipelines</li>
              <li>Lead Generation</li>
              <li>Premium Voice</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};