'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrls?: string[];
  videoUrls?: string[];
  imageUrl?: string;
  videoUrl?: string;
  description?: string;
}

// PREMIUM HARDCODED FALLBACKS: Showcases work instantly to public users if localStorage is empty
const STATIC_FALLBACK_PROJECTS: Project[] = [
  {
    id: 901,
    title: "Premium Fashion Campaign",
    category: "AI Brand Content Production",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    description: "High-end visual asset execution and narrative strategy matching immersive digital aesthetics for an elite couture collection."
  },
  {
    id: 902,
    title: "Luxury Perfume Label",
    category: "Visual Identity & Strategy",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
    description: "Minimalist composition and narrative architecture designed to capture high-intent digital audiences."
  },
  {
    id: 903,
    title: "Elite Clothing Ecosystem",
    category: "Content Strategy",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
    description: "High-retention digital assets configured for cross-platform visual synchronization and optimized performance."
  }
];

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(STATIC_FALLBACK_PROJECTS);

  useEffect(() => {
    const loadProjects = () => {
      const stored = localStorage.getItem('adminProjects');
      if (stored) {
        try {
          let parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(parsed);
          } else {
            setProjects(STATIC_FALLBACK_PROJECTS);
          }
        } catch (e) {
          console.error("Error parsing projects:", e);
          setProjects(STATIC_FALLBACK_PROJECTS);
        }
      } else {
        setProjects(STATIC_FALLBACK_PROJECTS);
      }
    };

    loadProjects();
    const interval = setInterval(loadProjects, 2000);
    return () => clearInterval(interval);
  }, []);

  const openProject = (project: Project) => {
    const detailPage = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${project.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #0c0c0e; color: #f4f4f5; padding: 24px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          img, video { max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; border: 1px solid #27272a; }
          .back { color: #ff33a6; text-decoration: none; font-size: 14px; font-weight: bold; text-transform: uppercase; tracking: 0.1em; display: inline-block; margin-bottom: 20px; }
          h1 { font-size: 2rem; margin-bottom: 8px; color: #fff; font-weight: 900; letter-spacing: -0.02em; }
          .cat { color: #a1a1aa; text-transform: uppercase; font-size: 11px; tracking: 0.2em; font-weight: 700; }
          p { color: #d4d4d8; font-size: 15px; }
        </style>
      </head>
      <body>
        <a href="#" onclick="window.close(); return false;" class="back">← Close Preview</a>
        <div class="cat">${project.category}</div>
        <h1>${project.title}</h1>
        ${(project.imageUrls || [project.imageUrl]).filter(Boolean).map(url => `<img src="${url}" alt="${project.title}">`).join('')}
        ${(project.videoUrls || [project.videoUrl]).filter(Boolean).map(url => `<video controls autoplay loop muted playsinline><source src="${url}" type="video/mp4"></video>`).join('')}
        <p>${project.description || 'No description added yet.'}</p>
      </body>
      </html>
    `;

    const newTab = window.open();
    if (newTab) {
      newTab.document.open();
      newTab.document.write(detailPage);
      newTab.document.close();
    } else {
      alert("Popup blocked! Please allow popups to view project case details.");
    }
  };

  return (
    <section id="projects" className="w-full bg-white text-zinc-950 px-6 md:px-8 py-20 md:py-28 overflow-hidden">
      <style jsx global>{`
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
      `}</style>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <div className="lg:col-span-4 z-10 space-y-4 text-center lg:text-left">
          <span className="text-xs font-black tracking-[0.2em] uppercase block theme-3d-text">
            02 // Portfolio Exhibit
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950 leading-[1.1]">
            Featured Cases.
          </h2>
          <p className="text-zinc-600 text-xs md:text-sm font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
            From high-retention UGC and premium fashion campaigns to minimalist branding and high-converting content for elite restaurant, clothing, and perfume labels—I engineer visual ecosystems that turn scrollers into revenue.
          </p>
        </div>

        <motion.div 
          className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 lg:pt-0"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ 
                scale: 1.03,
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              onClick={() => openProject(project)}
              className="wireframe-3d-glow bg-zinc-900/5 rounded-2xl p-4 h-44 flex flex-col justify-end cursor-pointer select-none relative overflow-hidden group transition-all duration-300 min-w-0"
            >
              {/* Media Content Injection */}
              {((project.videoUrls && project.videoUrls[0]) || project.videoUrl) ? (
                <video 
                  src={project.videoUrls?.[0] || project.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" 
                />
              ) : ((project.imageUrls && project.imageUrls[0]) || project.imageUrl) ? (
                <img 
                  src={project.imageUrls?.[0] || project.imageUrl} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" 
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 z-0" />
              )}

              {/* High-Contrast Dynamic Overlay Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              <div className="z-20 relative">
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-0.5">
                  {project.category}
                </span>
                <h3 className="text-xs font-black tracking-[0.05em] text-white uppercase truncate">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
