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
  // Starts empty and populates directly from your live Vercel cloud database
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCloudProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProjects(data);
          }
        }
      } catch (error) {
        console.error("Error fetching live database projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCloudProjects();
    // Keeps both desktop and mobile views perfectly synchronized every 3 seconds
    const interval = setInterval(fetchCloudProjects, 3000);
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
          -webkit-text
