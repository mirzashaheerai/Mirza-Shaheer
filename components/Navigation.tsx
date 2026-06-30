'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6 flex items-center justify-between">
        {/* Logo - Matches your liquid theme gradient colors perfectly */}
        <Link href="/" className="text-2xl md:text-3xl font-black text-liquid-gradient select-none">
          MS
        </Link>

        {/* Desktop Menu - Erased old blue/aqua. Updates instantly to the 3D liquid theme gradient on hover */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-sm font-semibold text-zinc-900 hover-text-liquid-gradient transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-0.5 bg-zinc-900 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-zinc-900 transition-all duration-300 ${
              isOpen ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-zinc-900 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-zinc-900 hover-text-liquid-gradient transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};