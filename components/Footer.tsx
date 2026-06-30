'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Your predefined core service listings matching the main architecture section
  const servicesList = [
    { name: "Conversion Architecture", href: "#services" },
    { name: "UI/UX Visual Engineering", href: "#services" },
    { name: "High-Performance Development", href: "#services" },
    { name: "Direct-Response Growth Funnels", href: "#services" }
  ];

  // Global Navigation Links
  const companyLinks = [
    { name: "About Profile", href: "#about" },
    { name: "Case Studies", href: "#projects" },
    { name: "Client Testimonials", href: "#testimonials" },
    { name: "Work Process", href: "#process" }
  ];

  // Social Connect Directory (Pre-wired to your actual profile configurations)
  const connectLinks = [
    { 
      name: "Email Directory", 
      href: "mailto:mirzashaheer05@gmail.com",
      detail: "mirzashaheer05@gmail.com"
    },
    { 
      name: "LinkedIn Network", 
      href: "https://www.linkedin.com/in/mirza-shaheer",
      detail: "mirza-shaheer"
    },
    { 
      name: "WhatsApp Direct", 
      href: "https://wa.me/923054178556",
      detail: "+92 305 4178556"
    }
  ];

  return (
    <footer className="w-full relative overflow-hidden z-20 backdrop-blur-xl bg-white/40 border-t border-zinc-200/50 text-zinc-900 py-16 px-4 md:px-8">
      {/* Structural Color Utility Class Injector */}
      <style jsx global>{`
        .footer-gradient-text {
          background: linear-gradient(135deg, #ff33a6 0%, #591acc 50%, #f20d26 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .footer-interactive-link:hover {
          color: #ff33a6;
          text-shadow: 0 0 8px rgba(255, 51, 166, 0.2);
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12">
        
        {/* BRAND IDENTITY CELL BRANDING COLUMN */}
        <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
          <motion.h3 
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-black tracking-tighter cursor-default footer-gradient-text"
          >
            MS
          </motion.h3>
          <p className="text-sm font-medium text-zinc-600 leading-relaxed max-w-sm">
            Engineering high-converting digital storefronts by blending raw creative visual presence with metrics-driven sales psychology. By rebuilding foundational conversion structures, I dismantle barriers between cold web scrollers and dedicated, long-term brand buyers.
          </p>
        </div>

        {/* CORE CONVERSION SERVICES COLUMN */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] footer-gradient-text">
            Expertise Focus
          </h4>
          <ul className="space-y-2">
            {servicesList.map((service, index) => (
              <li key={index}>
                <a 
                  href={service.href}
                  className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors duration-200 block py-0.5 footer-interactive-link"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CORPORATE PLATFORM LINK DIRECTORY */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] footer-gradient-text">
            Navigation
          </h4>
          <ul className="space-y-2">
            {companyLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors duration-200 block py-0.5 footer-interactive-link"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SECURE HUB CHANNELS DIRECTORY */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] footer-gradient-text">
            Connect Hub
          </h4>
          <ul className="space-y-3">
            {connectLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  target={link.name !== "Email Directory" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="text-sm font-bold text-zinc-800 group-hover:text-zinc-950 block footer-interactive-link transition-colors duration-200">
                    {link.name}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 block pt-0.5 break-all">
                    {link.detail}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* FOOTER SYSTEM COPYRIGHT STRIP */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-200/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-400">
        <div>
          &copy; {currentYear} <span className="font-bold text-zinc-600">Mirza Shaheer Architecture</span>. All Rights Reserved.
        </div>
        <div className="flex gap-6">
          <span className="cursor-default select-none tracking-wider footer-gradient-text font-bold">SCROLLERS TO BUYERS</span>
        </div>
      </div>
    </footer>
  );
};