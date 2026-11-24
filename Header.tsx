import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Menu, 
  Plus, 
  CheckCheck, 
  CheckCircle, 
  Clock, 
  Layers,
  Globe,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    currentView, 
    setCurrentView,
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    setIsCommandPaletteOpen,
    setIsCreateTaskOpen,
    setIsCreateProjectOpen,
    openPaymentGateway,
    userSubscription
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        setIsCreateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Workspace Overview';
      case 'projects': return 'Project Portfolio';
      case 'tasks': return 'Task & Sprint Board';
      case 'team': return 'Team Directory & Workload';
      case 'analytics': return 'Productivity & Velocity Intelligence';
      case 'ai': return 'Nexora Copilot AI';
      case 'settings': return 'Workspace & Profile Preferences';
      default: return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0A0D14]/90 backdrop-blur-xl border-b border-[#1E2538] px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base lg:text-lg font-extrabold text-white flex items-center gap-2">
            <span>{getPageTitle()}</span>
            {currentView === 'ai' && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Live Copilot
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Right: Search trigger, Quick Create, Notifications */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Global Search Bar (opens Cmd+K palette) */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-[#1E2538] text-slate-400 hover:text-slate-200 text-xs transition-all shadow-sm group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" />
          <span className="text-slate-400">Search projects, tasks, commands...</span>
          <kbd className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 shadow-xs">
            ⌘K
          </kbd>
        </button>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Gemini Neural Live Aura (Red & Blue Ambient Pulse) */}
        <div 
          onClick={() => setCurrentView('ai')}
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

        {/* Landing Page Button */}
        <button
          onClick={() => setCurrentView('landing')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-[#1E2538] text-slate-300 hover:text-white text-xs font-semibold transition-all group"
          title="Return to Landing Page"
        >
          <Globe className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>Landing Page</span>
        </button>

        {/* Upgrade / Payment Gateway Trigger */}
        <button
          onClick={() => openPaymentGateway('pro')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 hover:from-amber-500/25 hover:to-rose-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-200 text-xs font-bold transition-all shadow-sm group"
          title="Upgrade Workspace Plan via Secure Payment Gateway"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">
            {userSubscription.plan === 'free' ? 'Upgrade Plan' : 'Pro Active'}
          </span>
          <span className="sm:hidden">Upgrade</span>
        </button>

        {/* Quick Add Dropdown */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </button>

          {isCreateMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#10141E] border border-[#1E2538] shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setIsCreateTaskOpen(true);
                  setIsCreateMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-purple-600/20 hover:text-purple-200 transition-colors text-left"
              >
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="font-bold">New Task</div>
                  <div className="text-[10px] text-slate-400">Add task to sprint board</div>
                </div>
              </button>
              <button
                onClick={() => {
                  setIsCreateProjectOpen(true);
                  setIsCreateMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-200 transition-colors text-left"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <div>
                  <div className="font-bold">New Project</div>
                  <div className="text-[10px] text-slate-400">Initialize a new initiative</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#10141E] border border-[#1E2538] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2538]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#1E2538] max-h-80 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No notifications yet. You're all caught up!
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`py-3 px-2 rounded-xl cursor-pointer transition-colors ${
                        !n.read 
                          ? 'bg-purple-950/20 hover:bg-purple-950/30' 
                          : 'hover:bg-slate-800/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-xs font-bold ${!n.read ? 'text-white' : 'text-slate-300'}`}>
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
