import React from 'react';
import { GraduationCap, Building2, Calendar, Zap, Award, MapPin } from 'lucide-react';

interface EngineerSpotlightBannerProps {
  compact?: boolean;
}

export const EngineerSpotlightBanner: React.FC<EngineerSpotlightBannerProps> = ({ compact = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0C101A]/95 via-[#111728]/95 to-[#0C101A]/95 border border-blue-500/30 shadow-2xl gemini-border-glow backdrop-blur-xl group transition-all duration-300 hover:border-blue-400/50 ${
      compact ? 'p-3 sm:p-3.5' : 'p-4 sm:p-5 lg:p-6'
    }`}>
      {/* 1. Dynamic Continuous Left-to-Right Sweeping Gemini Laser Light */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 h-full w-[450px] bg-gradient-to-r from-transparent via-cyan-400 via-blue-500 via-rose-500 to-transparent blur-[0.5px] animate-gemini-sweep" />
        <div className="absolute top-0 h-[8px] w-[350px] bg-gradient-to-r from-transparent via-blue-500 via-rose-500 to-transparent blur-xs -mt-[2px] animate-gemini-sweep" />
      </div>

      {/* 2. Living Ambient Radial Plasma Glow Underlay */}
      <div className="gemini-ambient-glow opacity-30 pointer-events-none" />

      {/* 3. Main Content Container */}
      <div className="relative z-10 flex flex-col gap-2.5">
        {/* Top Meta Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2">
            {/* Pulsing Gemini Live Spotlight Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-rose-500/20 border border-blue-400/40 shadow-xs animate-gemini-pulse flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 animate-gemini-orb" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">
                Spotlight • Gemini Flash
              </span>
            </div>

            {/* Official Student Developer Pill */}
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-semibold text-emerald-400">
              <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400 animate-pulse" />
              <span>Student Developer</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              Kolkata, WB
            </span>
            <span className="text-slate-600">•</span>
            <span>Batch 2026–30</span>
          </div>
        </div>

        {/* Structured 3-Column Executive Content Layout (Fills Center & Width Evenly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2.5 items-stretch">
          
          {/* Card 1: Identity & Role (4 Cols) */}
          <div className="lg:col-span-4 flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 shadow-md shadow-purple-600/30 flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400/90">
                Featured Engineer
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap truncate">
                RANJAN KR YADAV
              </h2>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-300 whitespace-nowrap flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="tracking-wide">Aspiring Software Engineer</span>
              </p>
            </div>
          </div>

          {/* Card 2: Institution & Campus (4 Cols - Fills Middle Space) */}
          <div className="lg:col-span-4 flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400/90">
                Institution
              </div>
              <div className="text-xs sm:text-sm font-bold text-white whitespace-nowrap truncate">
                Narula Institute of Technology
              </div>
              <div className="text-[11px] text-slate-400 whitespace-nowrap mt-0.5 flex items-center gap-1">
                <span>Autonomous • JIS Group</span>
              </div>
            </div>
          </div>

          {/* Card 3: Academic Program & Session (4 Cols - Right Side) */}
          <div className="lg:col-span-4 flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400/90">
                Program & Year
              </div>
              <div className="text-xs sm:text-sm font-bold text-white whitespace-nowrap truncate">
                B.TECH 1st Year (IT)
              </div>
              <div className="text-[11px] text-amber-300 font-mono whitespace-nowrap mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Session: 2026–2030</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
