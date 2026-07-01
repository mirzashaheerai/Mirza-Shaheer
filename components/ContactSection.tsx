'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  return (
    /* FIXED: Decreased vertical padding from py-24 to py-8 md:py-12 */
    <section id="contact" className="w-full bg-white text-zinc-950 px-4 md:px-8 py-8 md:py-12 relative overflow-hidden">
      
      {/* Dynamic 3D Theme Style Definitions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dynamicGlow {
          0% { border-color: #ff33a6; box-shadow: 0 0 15px rgba(255, 51, 166, 0.1); }
          33% { border-color: #591acc; box-shadow: 0 0 15px rgba(89, 26, 204, 0.1); }
          66% { border-color: #f20d26; box-shadow: 0 0 15px rgba(242, 13, 38, 0.1); }
          100% { border-color: #ff33a6; box-shadow: 0 0 15px rgba(255, 51, 166, 0.1); }
        }
        .wireframe-3d-glow {
          border: 2px solid #ff33a6;
          animation: dynamicGlow 6s linear infinite;
        }
        .theme-3d-text {
          background: linear-gradient(90deg, #ff33a6, #591acc, #f20d26);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .theme-3d-svg-fill {
          fill: url(#theme3DGradientMesh);
        }
      `}} />
      
      {/* Global Shared SVG Color Reference Block */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="theme3DGradientMesh" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff33a6" />
            <stop offset="50%" stopColor="#591acc" />
            <stop offset="100%" stopColor="#f20d26" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* HEADER - FIXED: Tightened bottom margin from mb-16 to mb-8 */}
      <div className="max-w-3xl mx-auto text-center mb-8 space-y-4">
        <span className="text-sm font-black tracking-[0.2em] uppercase block theme-3d-text">
          04 // Collaboration Hub
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
          Let's Initiate Growth.
        </h2>
        <p className="text-zinc-600 text-sm md:text-base font-semibold leading-relaxed max-w-xl mx-auto text-center">
          Ready to scale your digital presence? Reach out below to deploy high-retention video pipelines, minimalist branding frameworks, and conversion systems built directly for premium markets.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Channels */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-black tracking-tight text-zinc-950">
            Direct Comm Channels
          </h3>
          
          <div className="space-y-4">
            <a href="mailto:mirzashaheer.ai@gmail.com" className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100/50 transition-colors group">
              <svg className="w-6 h-6 theme-3d-svg-fill shrink-0" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <div>
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Email Mailbox</h4>
                <p className="text-sm font-bold text-zinc-950 mt-0.5">mirzashaheer.ai@gmail.com</p>
              </div>
            </a>
            
            <a href="https://wa.me/923319937307" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100/50 transition-colors group">
              <svg className="w-6 h-6 theme-3d-svg-fill shrink-0" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.817 9.817 0 0 0 12.04 2zm5.72 14.05c-.24.67-1.39 1.31-1.92 1.39-.53.08-1.2.14-3.44-.79-2.86-1.19-4.7-4.11-4.84-4.3-.14-.19-1.15-1.53-1.15-2.93 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .54.01.17.01.4.01.62.53.23.55.79 1.93.86 2.07.07.14.12.31.02.51-.1.2-.21.32-.36.49-.15.17-.3.35-.43.47-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01.11.1.2.15.31.2.31.14.5.12.69-.1.19-.23.79-.92.99-1.24.2-.31.4-.26.68-.16.28.1.1.79 1.15 1.32.74.37 1.23.61 1.38.7.15.1.23.15.17.31z"/>
              </svg>
              <div>
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">WhatsApp Direct</h4>
                <p className="text-sm font-bold text-zinc-950 mt-0.5">+92 331 9937307</p>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/muhammad-shaheer-0b800837a/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100/50 transition-colors group">
              <svg className="w-6 h-6 theme-3d-svg-fill shrink-0" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <div>
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">LinkedIn Connect</h4>
                <p className="text-sm font-bold text-zinc-950 mt-0.5">muhammad-shaheer</p>
              </div>
            </a>
          </div>
        </div>
        
        {/* RIGHT COLUMN: Form Container */}
        <div className="lg:col-span-7 bg-zinc-50 border border-zinc-100 p-8 rounded-2xl">
          <form 
            action="https://formspree.io/f/mkolqjyj" 
            method="POST" 
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="Portfolio Direct Pipeline Lead" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-white border border-zinc-200 focus:border-zinc-400 rounded-xl px-4 py-3 text-sm font-medium text-zinc-950 outline-none transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-white border border-zinc-200 focus:border-zinc-400 rounded-xl px-4 py-3 text-sm font-medium text-zinc-950 outline-none transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Message Brief</label>
              <textarea 
                name="message"
                required
                rows={6} 
                className="w-full bg-white border border-zinc-200 focus:border-zinc-400 rounded-xl px-4 py-3 text-sm font-medium text-zinc-950 outline-none transition-colors resize-none" 
                placeholder="Tell me about your scaling objectives..."
              ></textarea>
            </div>
            
            {/* OUTLINE SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full rounded-xl py-3.5 font-black tracking-wide text-sm bg-transparent border-2 select-none text-center cursor-pointer block wireframe-3d-glow transition-transform duration-200"
            >
              <span className="theme-3d-text block w-full text-center">
                Transmit Secure Message
              </span>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};
