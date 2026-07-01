'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
}

export const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    { id: 1, name: "Marcus Vance", role: "Founder", company: "Aura Fragrances", content: "The perfume visual campaigns completely redefined our brand identity. Our direct checkout conversion rate skyrocketed by 42% in under thirty days." },
    { id: 2, name: "Sarah Lin", role: "Marketing Director", company: "Velo Apparel", content: "Unbelievable results with the UGC ad pipelines. Customer acquisition costs dropped significantly while keeping high hook-retention scores." },
    { id: 3, name: "Chef Julian", role: "Owner", company: "Mesa Hospitality", content: "The restaurant social systems brought high-intent local traffic straight through our doors. Absolute game changer for our weekend reservations." },
    { id: 4, name: "Elena Rostova", role: "Creative Head", company: "Maison Fashion", content: "Pure aesthetic perfection combined with brutal performance backend metrics. The synthetic fashion video assets are beautifully executed." },
    { id: 5, name: "David K.", role: "Growth Lead", company: "Nexus DTC", content: "Eliminated layout friction entirely across our digital storefront. Web optimization vitals are flawless, and average order value is way up." },
    { id: 6, name: "Amir G.", role: "Managing Director", company: "Scent & Co", content: "Exceptional branding infrastructure. Brought an unmatched luxury premium tone to our latest product drops. Highly recommend." },
    { id: 7, name: "Chloe Dupont", role: "VP of E-commerce", company: "Atelier Streetwear", content: "The automated video hooks system systematically beat our creative fatigue issues. Our scaling targets were met weeks ahead of schedule." }
  ];

  const doubleTestimonials = [...testimonials, ...testimonials];

  return (
    /* FIXED: Decreased main section padding from py-24 to py-8 md:py-12 */
    <section id="testimonials" className="w-full bg-white text-zinc-950 py-8 md:py-12 overflow-hidden">
      {/* Interactive 3D Theme Colors & Animation Matrix */}
      <style jsx global>{`
        @keyframes dynamicGlow {
          0% { border-color: #ff33a6; box-shadow: 0 0 20px rgba(255, 51, 166, 0.15); }
          33% { border-color: #591acc; box-shadow: 0 0 20px rgba(89, 26, 204, 0.15); }
          66% { border-color: #f20d26; box-shadow: 0 0 20px rgba(242, 13, 38, 0.15); }
          100% { border-color: #ff33a6; box-shadow: 0 0 20px rgba(255, 51, 166, 0.15); }
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
        .theme-3d-gradient {
          background: linear-gradient(90deg, #ff33a6, #591acc, #f20d26);
        }
        .marquee-track:hover .marquee-mover {
          animation-play-state: paused;
        }
      `}</style>

      {/* FIXED: Tightened margin under header block down to mb-8 */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-8">
        <span className="text-sm font-black tracking-[0.2em] uppercase block mb-3 theme-3d-text">
          03 // Verified Growth
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 leading-[1.1] max-w-md">
          Client Endorsements.
        </h2>
      </div>

      {/* INFINITE MARQUEE STRIP */}
      <div className="w-full marquee-track relative flex overflow-x-hidden py-4">
        <motion.div 
          className="flex space-x-6 shrink-0 marquee-mover"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity
          }}
        >
          {doubleTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              /* FIXED: Responsive width (w-[270px] on mobile, w-[380px] on desktop) and responsive padding (p-4 to p-6) */
              className="w-[270px] md:w-[380px] bg-zinc-50/90 rounded-2xl p-4 md:p-6 flex flex-col justify-between cursor-pointer select-none relative transition-all duration-300 ease-out hover:bg-white hover:scale-[1.05] hover:-translate-y-3 hover:z-20 wireframe-3d-glow"
            >
              {/* Giant 3D Object Theme Quote Accent */}
              <span className="absolute -top-2 left-4 text-5xl md:text-6xl font-serif select-none pointer-events-none opacity-20 theme-3d-text">
                “
              </span>

              {/* Quote Content - FIXED: Responsive shrunken text on mobile (text-xs) */}
              <p className="text-zinc-700 text-xs md:text-base font-semibold leading-relaxed mb-4 md:mb-6 pt-4 relative z-10">
                “{item.content}”
              </p>

              {/* Footer Divider (3D Color Themed) */}
              <div className="w-full h-[1px] theme-3d-gradient opacity-20 mb-4" />

              {/* Meta Data */}
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h4 className="text-xs md:text-sm font-black tracking-tight text-zinc-950">
                    {item.name}
                  </h4>
                  <p className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                    {item.role}
                  </p>
                </div>
                <span className="text-[10px] md:text-xs font-black font-mono theme-3d-text bg-zinc-100 px-2.5 py-1 rounded-full">
                  {item.company}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
