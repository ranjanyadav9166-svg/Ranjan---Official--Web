import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewMode } from '../../types';
import { SharkLogo } from '../common/SharkLogo';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Sparkles, 
  Settings, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  Globe
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { 
    currentView, 
    setCurrentView, 
    userSettings, 
    setIsCreateTaskOpen
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: { id: ViewMode; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks & Board', icon: CheckSquare },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai', label: 'Nexora AI', icon: Sparkles, badge: 'Copilot' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out border-r
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#0B0E17]/95 backdrop-blur-xl border-[#1E2538] text-slate-200 shadow-sm`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1E2538]">
          <button 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 overflow-hidden text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F5FF] via-[#0077B6] to-[#FF007A] p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-pink-500/30 transition-all flex-shrink-0">
              <div className="w-full h-full bg-[#0B0E17] rounded-[10px] flex items-center justify-center p-0.5">
                <SharkLogo className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-wider text-white">
                  NEXORA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500 bg-clip-text text-transparent -mt-0.5">
                  Workspace AI
                </span>
              </div>
            )}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Single Primary Action Button (Google-Style Clean Pill) */}
        <div className="p-3">
          <button
            onClick={() => setIsCreateTaskOpen(true)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] ${
              isCollapsed ? 'px-0' : ''
            }`}
            title="Create new task"
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span>New Task</span>}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-purple-950/40 text-purple-300 font-semibold border-l-4 border-purple-500 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'
                }`} />
                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Landing Page Button */}
        <div className="px-3 py-2 border-t border-[#1E2538]">
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title="View Landing Page"
          >
            <Globe className="w-4 h-4 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Landing Page</span>}
          </button>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-[#1E2538] bg-[#0A0D14]/80 flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('settings')}
            className="flex items-center gap-3 flex-1 text-left group overflow-hidden focus:outline-none"
          >
            <div className="relative flex-shrink-0">
              <img
                src={userSettings.avatar}
                alt={userSettings.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/30 group-hover:ring-purple-500 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0A0D14] rounded-full" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                  {userSettings.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {userSettings.title}
                </span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
