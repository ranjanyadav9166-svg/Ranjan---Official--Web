import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EngineerSpotlightBanner } from '../layout/EngineerSpotlightBanner';
import { SharkLogo } from '../common/SharkLogo';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  Layers, 
  Check, 
  ChevronDown, 
  Star, 
  Terminal, 
  Flame, 
  Play, 
  Workflow, 
  Globe2,
  X,
  Lock,
  Mail,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { setCurrentView, userSettings, updateUserSettings, showToast, openPaymentGateway } = useApp();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeSolutionTab, setActiveSolutionTab] = useState<'engineering' | 'product' | 'design' | 'marketing'>('engineering');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleStartApp = () => {
    setCurrentView('dashboard');
    showToast({
      title: 'Welcome to NEXORA!',
      description: 'You are now inside the live interactive workspace.',
      type: 'success',
    });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(false);
    handleStartApp();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'How does Nexora AI differentiate from conventional project management tools?',
      a: 'Unlike static trackers, Nexora incorporates an intelligent autonomous orchestration agent that actively decomposes complex requirements into sprint tasks, evaluates velocity bottlenecks, and drafts documentation natively.'
    },
    {
      q: 'Can our engineering team integrate custom AI models or API keys?',
      a: 'Yes. Nexora supports bringing your own Google Gemini or OpenAI API keys directly in workspace settings, or running on our pre-tuned high-speed simulated demo models out-of-the-box.'
    },
    {
      q: 'Does Nexora persist data between sessions?',
      a: 'Absolutely. All projects, tasks, Kanban columns, custom checklists, and team settings are persisted in local persistent storage, allowing seamless work continuity without data loss on refresh.'
    },
    {
      q: 'Is there support for enterprise compliance and SSO?',
      a: 'Yes. Enterprise tiers include SAML 2.0 / OIDC single sign-on, immutable audit trail logging, and granular role-based access control (RBAC).'
    }
  ];

  const solutions = {
    engineering: {
      title: 'Architected for High-Velocity Engineering Squads',
      desc: 'Connect Git commits, automated CI/CD milestones, and sprint retrospectives in one unified command center.',
      metrics: ['99.98% CI Pass Rate', '4.2x Faster Sprint Cycles', 'Zero Manual Status Reports'],
      preview: {
        badge: 'ENGINEERING PIPELINE',
        title: 'Microservices Mesh v2.4 Release',
        tasks: ['Deploy Canary to EU-Central', 'Run distributed latency benchmark', 'Validate zero-downtime DB migrations']
      }
    },
    product: {
      title: 'Roadmapping & Requirement Decomposition',
      desc: 'Transform raw customer signals into structured user stories, acceptance criteria, and prioritized backlogs in seconds.',
      metrics: ['100% Traceability', '3x Faster Spec Drafting', 'Unified Customer Feedback Loop'],
      preview: {
        badge: 'PRODUCT SPECIFICATION',
        title: 'AI Multi-Agent Workflow Engine',
        tasks: ['Customer discovery synthesis (24 calls)', 'Figma design tokens sign-off', 'GTM launch readiness checklist']
      }
    },
    design: {
      title: 'Design System Governance & Asset Sync',
      desc: 'Seamless Figma Code Connect tokens, interactive prototype reviews, and micro-interaction sign-offs.',
      metrics: ['Pixel-Perfect Handoff', 'WCAG AAA Automated Contrast', 'Shared Component Library'],
      preview: {
        badge: 'DESIGN SYSTEM 2.0',
        title: 'Spectra Glassmorphism Tokens',
        tasks: ['Figma to React token transformer', 'Dark / Light contrast audit', 'Motion curve choreography specs']
      }
    },
    marketing: {
      title: 'Growth Campaigns & Viral Product Loops',
      desc: 'Coordinate product launches, content calendars, and lifecycle growth experiments with measurable ROI attribution.',
      metrics: ['+34% Trial Conversions', '14d Faster Campaign Launch', 'Full Attribution Tracking'],
      preview: {
        badge: 'GROWTH INITIATIVE',
        title: 'Q4 Product Led Growth Flywheel',
        tasks: ['In-app referral rewards rollout', 'Interactive interactive onboarding demo', 'Lifecycle nurture email triggers']
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white selection:bg-purple-600/30 selection:text-purple-200 relative overflow-hidden">
      {/* Background Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] left-[-200px] w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0D14]/80 border-b border-[#1E2538]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F5FF] via-[#0077B6] to-[#FF007A] p-0.5 shadow-lg shadow-cyan-500/25 group-hover:shadow-pink-500/35 transition-all">
              <div className="w-full h-full bg-[#0B0E17] rounded-[10px] flex items-center justify-center p-0.5">
                <SharkLogo className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white">
                NEXORA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500 bg-clip-text text-transparent -mt-1">
                Intelligent Workspace
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors">
              Solutions
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">
              FAQ
            </button>
          </nav>

          {/* Auth & CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Gemini Neural Live Aura (matching Dashboard Header) */}
            <div 
              onClick={handleStartApp}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-rose-500/10 hover:from-blue-500/20 hover:to-rose-500/20 border border-blue-400/30 hover:border-rose-400/50 shadow-xs cursor-pointer transition-all duration-300 animate-gemini-pulse group"
              title="Gemini Neural Engine • Active Ambient Red & Blue Pulse"
            >
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 animate-gemini-orb"></span>
              </div>
              <span className="text-[11px] font-black tracking-wide bg-gradient-to-r from-blue-400 via-purple-300 to-rose-400 bg-clip-text text-transparent">
                Gemini Neural Aura
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/20">
                LIVE
              </span>
            </div>

            {/* Direct Open Workspace Button */}
            <button
              onClick={handleStartApp}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5 border border-[#1E2538]"
              title="Enter Workspace Dashboard"
            >
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:block px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              Login
            </button>
            <button
              onClick={handleStartApp}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 sm:gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="pt-8 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        {/* TOP AD BANNER: RANJAN KR YADAV (SPOTLIGHT) */}
        <div className="mb-10 text-left">
          <EngineerSpotlightBanner />
        </div>

        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-8 animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Announcing Nexora AI 2.0 Engine with Live Task Decomposition</span>
          <span className="w-1 h-1 rounded-full bg-purple-400" />
          <span className="text-white hover:underline cursor-pointer flex items-center gap-0.5" onClick={handleStartApp}>
            Try Live Demo &rarr;
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
          <span className="block text-white">Work Smarter. Build Faster.</span>
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
            Achieve More.
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          One intelligent workspace to manage projects, organize teams, track progress, and turn your ideas into meaningful results.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleStartApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-[#1E2538] text-slate-200 font-semibold text-base transition-all hover:border-purple-500/40 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span>Explore Features</span>
          </button>
        </div>

        {/* Social Proof Logos */}
        <div className="mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
            Trusted by forward-thinking teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-lg tracking-wider text-slate-400">VERTEX</span>
            <span className="font-extrabold text-lg tracking-wider text-slate-400">HYPERFLOW</span>
            <span className="font-extrabold text-lg tracking-wider text-slate-400">CHRONOS</span>
            <span className="font-extrabold text-lg tracking-wider text-slate-400">LUMEN AI</span>
            <span className="font-extrabold text-lg tracking-wider text-slate-400">SYNAPSE</span>
          </div>
        </div>

        {/* HERO VISUAL: ANIMATED DASHBOARD PREVIEW WITH FLOATING WIDGETS */}
        <div 
          onClick={handleStartApp}
          className="relative max-w-6xl mx-auto rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-purple-500/20 via-indigo-500/10 to-transparent border border-purple-500/30 shadow-2xl backdrop-blur-xl cursor-pointer group"
          title="Click to launch live interactive workspace"
        >
          {/* Main Dashboard Mockup Canvas */}
          <div className="rounded-2xl bg-[#0A0D14] border border-[#1E2538] overflow-hidden shadow-2xl text-left relative">
            {/* Top Mock Window Bar */}
            <div className="h-11 bg-[#0D111A] border-b border-[#1E2538] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-[11px] font-mono text-slate-400">app.nexora.io/workspace/overview</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-[10px] text-blue-300 font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span>GEMINI AURORA LIVE</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE SYNCED
                </div>
              </div>
            </div>

            {/* Inner Dashboard Preview: Exact Replica of Current Main Dashboard */}
            <div className="p-4 sm:p-6 space-y-5 bg-[#0A0D14]/95">
              {/* Header Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[#1E2538]/60">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 animate-gemini-orb"></span>
                    </span>
                    <span className="text-[11px] font-bold tracking-wide uppercase text-slate-400">
                      Sprint 14 Active • 98.4% Efficiency
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Welcome back, Alex 👋
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    You have <strong className="text-purple-400 font-semibold">10 tasks in progress</strong> across 6 active projects today.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-1.5">
                    <span>+ New Task</span>
                  </span>
                </div>
              </div>

              {/* 4 KPI Metric Cards (Matching Dashboard Exactly) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1E2538]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Projects</span>
                    <FolderKanban className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white">6</div>
                  <div className="text-[10px] text-purple-400 mt-1 font-medium">3 In Progress ↗</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1E2538]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks in Flight</span>
                    <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white">10</div>
                  <div className="text-[10px] text-blue-400 mt-1 font-medium">To Do & In Progress ↗</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1E2538]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Sprint</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">3</div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-medium">+12 delivered this month</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1E2538]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team Members</span>
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">6</div>
                  <div className="text-[10px] text-indigo-400 mt-1 font-medium">All members active</div>
                </div>
              </div>

              {/* Charts Row: Sprint Velocity & Effort Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sprint Velocity Area Chart Preview */}
                <div className="md:col-span-2 p-4 rounded-2xl bg-[#10141E] border border-[#1E2538]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">Sprint Velocity & Task Throughput</h4>
                      <p className="text-[10px] text-slate-400">Target: 95%+ efficiency</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#0A0D14] p-1 rounded-lg border border-[#1E2538] text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold">Last 7 Days</span>
                      <span className="px-2 py-0.5 text-slate-400">Monthly</span>
                    </div>
                  </div>
                  {/* SVG Area Chart */}
                  <div className="h-32 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,70 Q60,50 120,40 T240,25 T340,80 T400,85 L400,100 L0,100 Z" fill="url(#heroGradient)" />
                      <path d="M0,70 Q60,50 120,40 T240,25 T340,80 T400,85" fill="none" stroke="#8B5CF6" strokeWidth="2.5" />
                      <path d="M0,75 Q60,60 120,50 T240,40 T340,75 T400,80" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-[#1E2538] mt-2">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Completed</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> Planned Target</span>
                    <span className="text-emerald-400 font-bold">95.8% Efficiency</span>
                  </div>
                </div>

                {/* Effort by Department Preview */}
                <div className="p-4 rounded-2xl bg-[#10141E] border border-[#1E2538] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-white">Effort by Department</h4>
                    <span className="text-[10px] text-slate-400">13 Tasks</span>
                  </div>
                  {/* Donut representation */}
                  <div className="h-28 flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full border-4 border-purple-500 border-t-blue-500 border-r-cyan-400 border-b-rose-500 animate-spin-slow flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-sm font-extrabold text-white block">13</span>
                        <span className="text-[8px] uppercase tracking-wider text-slate-400 block -mt-1">Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300 pt-1 border-t border-[#1E2538]">
                    <span>🟣 Eng 42%</span>
                    <span>🔵 Design 25%</span>
                    <span>🔷 Product 16%</span>
                    <span>🔴 Mkt 9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING WIDGET 1: Top-Left AI Task Generator */}
          <div className="hidden lg:flex absolute -top-8 -left-8 p-4 rounded-2xl bg-[#10141E]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl max-w-xs items-center gap-3 animate-float">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">AI Decompose Task</div>
              <div className="text-[11px] text-slate-300">Generated 4 subtasks with estimations</div>
            </div>
          </div>

          {/* FLOATING WIDGET 2: Bottom-Right Team Velocity Score */}
          <div className="hidden lg:flex absolute -bottom-8 -right-8 p-4 rounded-2xl bg-[#10141E]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl max-w-xs items-center gap-3 animate-float" style={{ animationDelay: '3s' }}>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Productivity Score: 98%</div>
              <div className="text-[11px] text-emerald-300">Top 5% among engineering teams</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2538]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 mb-3 block">
            Tailored For Fast Teams
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            One Platform. Every Workflow.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Whether you engineer distributed software, design design tokens, or run growth campaigns, Nexora adapts to your exact rhythm.
          </p>
        </div>

        {/* Solution Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['engineering', 'product', 'design', 'marketing'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSolutionTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeSolutionTab === tab
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#10141E] text-slate-400 hover:text-white border border-[#1E2538]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Selected Solution Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#10141E]/80 border border-[#1E2538] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center backdrop-blur-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {solutions[activeSolutionTab].title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {solutions[activeSolutionTab].desc}
            </p>

            <div className="space-y-3 mb-8">
              {solutions[activeSolutionTab].metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-200">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{m}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartApp}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-purple-600/25"
            >
              <span>Explore {activeSolutionTab} Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Preview for Tab */}
          <div className="p-6 rounded-2xl bg-[#0A0D14] border border-[#1E2538] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2538] mb-4">
              <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {solutions[activeSolutionTab].preview.badge}
              </span>
              <span className="text-xs font-mono text-emerald-400">92% COMPLETE</span>
            </div>
            <h4 className="text-base font-bold text-white mb-4">
              {solutions[activeSolutionTab].preview.title}
            </h4>
            <div className="space-y-2.5">
              {solutions[activeSolutionTab].preview.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#10141E] border border-[#1E2538]">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs text-slate-200">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2538]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 mb-3 block">
            Engineered For Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            The Complete Productivity Engine
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything your team needs to sprint with extreme velocity, clarity, and architectural rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
              title: 'AI Task Decomposition',
              desc: 'Transform ambiguous product briefs into granular, estimated sprint tasks with acceptance criteria.'
            },
            {
              icon: Layers,
              color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
              title: 'Interactive Kanban Boards',
              desc: 'Fluid drag-and-drop state transitions, custom filters, subtask checklists, and priority tags.'
            },
            {
              icon: BarChart3,
              color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
              title: 'Velocity & Burndown Analytics',
              desc: 'Interactive Recharts visualizations to track sprint accuracy, contributor throughput, and delivery trends.'
            },
            {
              icon: Users,
              color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
              title: 'Team Workload Intelligence',
              desc: 'Balance assignees evenly, monitor burnout metrics, and celebrate sprint milestones with team confetti.'
            },
            {
              icon: ShieldCheck,
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
              title: 'Enterprise Security & SOC2',
              desc: 'Zero-trust architecture, encrypted local persistence, role permissions, and immutable audit trails.'
            },
            {
              icon: Terminal,
              color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
              title: 'Command Palette (⌘K)',
              desc: 'Lightning-fast keyboard shortcuts to find any project, dispatch tasks, or execute actions in milliseconds.'
            }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#10141E]/70 border border-[#1E2538] hover:border-purple-500/40 transition-all hover:bg-[#131826] group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${f.color}`}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">{f.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1E2538]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 mb-3 block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Simple, Scalable Investment
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">
            Start free, scale with your team, and unlock unlimited AI copilot superpowers.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#10141E] border border-[#1E2538]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Free */}
          <div className="p-8 rounded-3xl bg-[#10141E]/80 border border-[#1E2538] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Starter</h3>
              <p className="text-xs text-slate-400 mb-6">For individuals and exploratory agile projects.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever free</span>
              </div>
              <ul className="space-y-3 mb-8 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Up to 3 Active Projects
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Full Kanban Board & Subtasks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> 50 AI Copilot Queries / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Local Persistence Storage
                </li>
              </ul>
            </div>
            <button
              onClick={handleStartApp}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              Get Started Free
            </button>
          </div>

          {/* Tier 2: Pro (Highlighted) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#141926] to-[#10141E] border-2 border-purple-500 shadow-2xl shadow-purple-600/20 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Professional</h3>
              <p className="text-xs text-slate-400 mb-6">For fast-growing teams shipping complex products.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  ${billingCycle === 'yearly' ? '24' : '29'}
                </span>
                <span className="text-xs text-slate-400">/ user / month</span>
              </div>
              <ul className="space-y-3 mb-8 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Unlimited Projects & Tasks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Unlimited AI Task Decomposition
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Velocity & Burndown Recharts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Bring Your Own AI API Keys
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Priority Support & Webhooks
                </li>
              </ul>
            </div>
            <button
              onClick={() => openPaymentGateway('pro')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span>Subscribe to Pro Plan</span>
            </button>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="p-8 rounded-3xl bg-[#10141E]/80 border border-[#1E2538] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Enterprise</h3>
              <p className="text-xs text-slate-400 mb-6">For organizations demanding governance & security.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  ${billingCycle === 'yearly' ? '79' : '99'}
                </span>
                <span className="text-xs text-slate-400">/ user / month</span>
              </div>
              <ul className="space-y-3 mb-8 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> SAML 2.0 & OIDC SSO (Okta/Azure)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> Dedicated Private Vector Store
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> SOC2 Type II Certified Vault
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400" /> 99.99% Uptime SLA Agreement
                </li>
              </ul>
            </div>
            <button
              onClick={() => openPaymentGateway('enterprise')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Checkout Enterprise Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1E2538]">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 mb-3 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about Nexora's architecture and AI features.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#10141E] border border-[#1E2538] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1E2538]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-purple-900/50 via-indigo-900/40 to-blue-900/50 border border-purple-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
              Ready to Accelerate Your Workspace?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Join thousands of high-velocity engineers, designers, and product leaders who build faster with NEXORA.
            </p>
            <button
              onClick={handleStartApp}
              className="px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-base shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>Launch Live Workspace Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#1E2538] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#00F5FF] to-[#FF007A] p-0.5">
              <div className="w-full h-full bg-[#0B0E17] rounded-[6px] flex items-center justify-center p-0.5">
                <SharkLogo className="w-5 h-5" />
              </div>
            </div>
            <span className="font-extrabold text-white tracking-wider">NEXORA</span>
            <span>© 2026 NEXORA Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={handleStartApp} className="hover:text-purple-400 transition-colors">
              Workspace
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-purple-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-purple-400 transition-colors">
              Pricing
            </button>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>

      {/* LOGIN / SIGNUP MODAL */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-[#10141E] border border-[#1E2538] shadow-2xl p-6 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {authMode === 'login' ? 'Welcome Back to Nexora' : 'Create Your Workspace'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login' ? 'Sign in to access your projects & sprint boards' : 'Start managing projects with AI copilot capabilities'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    placeholder="alex.vance@nexora.io"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0A0D14] border border-[#1E2538] text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0A0D14] border border-[#1E2538] text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
              >
                {authMode === 'login' ? 'Sign In to Workspace' : 'Create Account & Enter Workspace'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {authMode === 'login'
                  ? "Don't have an account? Sign up free"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
