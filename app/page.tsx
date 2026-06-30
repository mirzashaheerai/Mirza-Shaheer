'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full bg-primary-bg">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
