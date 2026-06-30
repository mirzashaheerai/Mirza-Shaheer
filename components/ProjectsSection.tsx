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

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = () => {
      const stored = localStorage.getItem('adminProjects');
      if (stored) {
        try {
          let parsed = JSON.parse(stored);
          setProjects(parsed);
        } catch (e) {
          console.error("Error parsing projects:", e);
        }
      }
    };

    loadProjects();
    const interval = setInterval(loadProjects, 1000);
    return () => clearInterval(interval);
  }, []);

  const openProject = (project: Project) => {
    const detailPage = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${project.title}</title>
        <style>
          body { font-family: system-ui; background: #111; color: white; padding: 40px; max-width: 900px; margin: 0 auto; line-height: 1.6; }
          img, video { max-width: 100%; border-radius: 12px; margin: 20px 0; }
          .back { color: #00f5ff; text-decoration: none; font-size: 18px; }
        </style>
      </head>
      <body>
        <a href="#" onclick="window.close()" class="back">← Back to Portfolio</a>
        <h1>${project.title}</h1>
        <p><strong>${project.category}</strong></p>
        ${(project.imageUrls || [project.imageUrl]).filter(Boolean).map(url => `<img src="${url}" alt="${project.title}">`).join('')}
        ${(project.videoUrls || [project.videoUrl]).filter(Boolean).map(url => `<video controls autoplay loop><source src="${url}" type="video/mp4"></video>`).join('')}
        <p>${project.description || 'No description added yet.'}</p>
      </body>
      </html>
    `;

    const newTab = window.open();
    if (newTab) newTab.document.write(detailPage);
  };

  return (
    <section id="projects" className="w-full bg-white text-zinc-950 px-4 md:px-8 py-28 overflow-hidden">
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

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-4 z-10 space-y-4">
          <span className="text-sm font-black tracking-[0.2em] uppercase block theme-3d-text">
            02 // Portfolio Exhibit
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 leading-[1.1]">
            Featured Cases.
          </h2>
          <p className="text-zinc-600 text-sm md:text-base font-medium leading-relaxed max-w-xs">
            This is just a small glimpse of my work. From high-retention UGC and premium fashion campaigns to minimalist branding and high-converting content for elite restaurant, clothing, and perfume labels—I engineer visual ecosystems that turn scrollers into revenue.
          </p>
        </div>

        <motion.div 
          className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-12 pt-12 md:pt-0 perspective-[1000px] transform-style-3d"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.25, ease: "easeInOut" }
              }}
              onClick={() => openProject(project)}
              className="wireframe-3d-glow bg-zinc-50/55 rounded-2xl p-5 h-48 flex flex-col justify-end cursor-pointer select-none relative backdrop-blur-sm overflow-hidden group transition-shadow duration-300"
            >
              {/* Media Background */}
              {(project.videoUrls && project.videoUrls[0]) || project.videoUrl ? (
                <video 
                  src={project.videoUrls?.[0] || project.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" 
                />
              ) : (project.imageUrls && project.imageUrls[0]) || project.imageUrl ? (
                <img 
                  src={project.imageUrls?.[0] || project.imageUrl} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" 
                />
              ) : null}

              {/* Title at Bottom Left - Small, White, Uppercase, Single Line */}
              <div className="z-10">
                <h3 className="text-xs font-black tracking-[0.1em] text-white uppercase leading-tight">
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