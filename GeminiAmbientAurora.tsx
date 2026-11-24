import React, { useEffect, useState } from 'react';

export const GeminiAmbientAurora: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized viewport percentage
      const x = Math.round((e.clientX / window.innerWidth) * 100);
      const y = Math.round((e.clientY / window.innerHeight) * 100);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* =========================================================================
          1. TOP EDGE: DYNAMIC LEFT-TO-RIGHT SWEEPING GEMINI LASER BEAM
          ========================================================================= */}
      {/* Subtle static ambient base line */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[1.5px] bg-gradient-to-r from-blue-600/30 via-rose-500/30 to-blue-600/30" />

      {/* Dynamic Left-to-Right Continuous Sweeping Laser */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[6px] overflow-hidden pointer-events-none">
        {/* Core Laser Beam */}
        <div 
          className="absolute top-0 h-[2.5px] w-[500px] bg-gradient-to-r from-transparent via-cyan-400 via-blue-500 via-rose-500 to-transparent blur-[0.5px] animate-gemini-sweep" 
        />
        {/* Glowing Aura Beam */}
        <div 
          className="absolute top-0 h-[12px] w-[440px] bg-gradient-to-r from-transparent via-blue-500/90 via-rose-500/90 to-transparent blur-xs -mt-[2px] animate-gemini-sweep" 
        />
        {/* Ambient Wide Glow */}
        <div 
          className="absolute top-0 h-[24px] w-[380px] bg-gradient-to-r from-transparent via-rose-500/50 via-purple-500/40 to-transparent blur-sm -mt-[6px] animate-gemini-sweep" 
        />
      </div>

      {/* =========================================================================
          2. PERIMETER STREAMING EDGES (BOTTOM, LEFT, RIGHT)
          ========================================================================= */}
      {/* Bottom Edge */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-600 via-rose-500 to-blue-600 bg-[length:300%_300%] animate-gemini-stream opacity-80" />
      <div className="fixed bottom-0 left-0 right-0 z-40 h-[8px] bg-gradient-to-r from-cyan-400/40 via-rose-500/40 to-blue-500/40 bg-[length:300%_300%] animate-gemini-stream blur-xs opacity-60" />

      {/* Left Edge */}
      <div className="fixed top-0 bottom-0 left-0 z-50 w-[2px] bg-gradient-to-b from-blue-600 via-rose-500 to-cyan-400 bg-[length:300%_300%] animate-gemini-stream opacity-80" />
      <div className="fixed top-0 bottom-0 left-0 z-40 w-[8px] bg-gradient-to-b from-blue-500/40 via-rose-500/40 to-cyan-400/40 bg-[length:300%_300%] animate-gemini-stream blur-xs opacity-60" />

      {/* Right Edge */}
      <div className="fixed top-0 bottom-0 right-0 z-50 w-[2px] bg-gradient-to-b from-cyan-400 via-rose-500 to-blue-600 bg-[length:300%_300%] animate-gemini-stream opacity-80" />
      <div className="fixed top-0 bottom-0 right-0 z-40 w-[8px] bg-gradient-to-b from-cyan-400/40 via-rose-500/40 to-blue-500/40 bg-[length:300%_300%] animate-gemini-stream blur-xs opacity-60" />

      {/* =========================================================================
          3. FULL-SCREEN DYNAMIC MOVING PLASMA & AURORA ORBS (ENTIRE INTERFACE)
          ========================================================================= */}
      
      {/* Orb 1: Dynamic Electric Blue Plasma (Floats top-left to center-right) */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] animate-gemini-orbit-blue opacity-30 mix-blend-screen"
        style={{
          top: '5%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.9) 0%, rgba(59, 130, 246, 0.6) 45%, rgba(14, 165, 233, 0.3) 70%, transparent 85%)',
        }}
      />

      {/* Orb 2: Dynamic Glowing Crimson/Coral Red Plasma (Floats bottom-right to top-center) */}
      <div 
        className="absolute w-[560px] h-[560px] rounded-full blur-[140px] animate-gemini-orbit-red opacity-28 mix-blend-screen"
        style={{
          bottom: '10%',
          right: '8%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.95) 0%, rgba(244, 63, 94, 0.65) 45%, rgba(225, 29, 72, 0.3) 70%, transparent 85%)',
        }}
      />

      {/* Orb 3: Dynamic Violet & Indigo Fusion Plasma (Swirls in viewport center) */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-gemini-orbit-purple opacity-35 mix-blend-screen"
        style={{
          top: '35%',
          left: '35%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.9) 0%, rgba(168, 85, 247, 0.6) 45%, rgba(99, 102, 241, 0.3) 70%, transparent 85%)',
        }}
      />

      {/* Orb 4: Interactive Cursor Neural Trail (Softly tracks mouse position across the screen) */}
      <div 
        className="absolute w-[360px] h-[360px] rounded-full blur-[100px] opacity-25 transition-all duration-700 ease-out mix-blend-screen"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, rgba(37, 99, 235, 0.7) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};
