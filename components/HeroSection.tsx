'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = (e.clientY + window.scrollY) - (rect.top + window.scrollY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.touches[0].clientX - rect.left;
      mouse.targetY = (e.touches[0].clientY + window.scrollY) - (rect.top + window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 85; 
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
    }> = [];

    const palette = ['#ff33a6', '#591acc', '#f20d26', '#ff8000'];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 320 + 80;
      const angle = Math.random() * Math.PI * 2;
      const baseX = width / 2 + Math.cos(angle) * radius;
      const baseY = height / 2 + Math.sin(angle) * radius;

      particles.push({
        x: baseX,
        y: baseY,
        baseX: baseX,
        baseY: baseY,
        angle: angle,
        radius: radius,
        speed: Math.random() * 0.008 + 0.003,
        size: Math.random() * 5 + 3.5,
        color: palette[i % palette.length],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      particles.forEach((p, index) => {
        p.angle += p.speed;
        
        const centerX = width / 2 + (mouse.x - width / 2) * 0.12;
        const centerY = height / 2 + (mouse.y - height / 2) * 0.12;
        
        p.x = centerX + Math.cos(p.angle) * p.radius;
        p.y = centerY + Math.sin(p.angle) * p.radius;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          const force = (260 - dist) / 260;
          p.x -= dx * force * 0.1;
          p.y -= dy * force * 0.1;
        }

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = ((180 - ldist) / 180) * 0.2;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.35;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="w-full bg-white text-zinc-950 px-4 py-12 md:py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap" rel="stylesheet" />

      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ff33a6 0%, #591acc 100__);
          border-radius: 9999px;
          border: 2px solid #ffffff;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #f20d26;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #591acc #ffffff;
        }

        @keyframes dynamicGlow {
          0% { border-color: #ff33a6; box-shadow: 0 0 15px rgba(255, 51, 166, 0.12); }
          33% { border-color: #591acc; box-shadow: 0 0 15px rgba(89, 26, 204, 0.12); }
          66% { border-color: #f20d26; box-shadow: 0 0 15px rgba(242, 13, 38, 0.12); }
          100% { border-color: #ff33a6; box-shadow: 0 0 15px rgba(255, 51, 166, 0.12); }
        }
        .wireframe-3d-glow {
          border: 2px solid #ff33a6;
          animation: dynamicGlow 6s linear infinite;
        }
        .syne-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }
        .syne-title-gradient {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #ff33a6 10%, #591acc 50%, #f20d26 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Container sizing matches text boundary width limits */}
      <div className="w-full max-w-[90vw] md:max-w-4xl mx-auto text-center space-y-4 z-10 flex flex-col items-center relative">
        
        {/* INCREASED TITLE SIZING: Set to text-4xl on base mobile profiles, completely unchanged on desktop layout profiles */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -12, 0]
          }}
          transition={{
            opacity: { delay: 0.5, duration: 0.6, ease: "easeOut" },
            scale: { delay: 0.5, duration: 0.6, ease: "easeOut" },
            y: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="text-4xl sm:text-5xl md:text-8xl tracking-tight uppercase leading-[0.95] select-none cursor-default pb-2 syne-title-gradient flex flex-col -space-y-0.5 sm:-space-y-2 md:-space-y-3"
        >
          <span>Mirza</span>
          <span>Shaheer</span>
        </motion.h1>

        {/* SINGLE ROW HARDLOCK: Set to text-[9px] and forced to whitespace-nowrap to prevent breaks */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[9px] sm:text-base md:text-xl tracking-[0.05em] uppercase text-black pt-1 pb-4 max-w-full px-2 syne-text whitespace-nowrap"
        >
          Turning Scrollers Into Buyers
        </motion.h2>

        {/* COMPACT BUTTON ROW */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-1 max-w-[180px] sm:max-w-md px-2 sm:px-0"
        >
          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="flex-1 bg-white rounded-lg py-2.5 font-black tracking-wide text-[9px] sm:text-sm select-none text-center cursor-pointer block text-black wireframe-3d-glow transition-transform duration-200"
          >
            Initiate Project
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="flex-1 bg-white rounded-lg py-2.5 font-black tracking-wide text-[9px] sm:text-sm select-none text-center cursor-pointer block text-black wireframe-3d-glow transition-transform duration-200"
          >
            Review Case Studies
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
