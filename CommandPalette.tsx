import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Plus, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Sparkles, 
  Settings, 
  Moon, 
  Sun, 
  RotateCcw,
  ArrowRight,
  Layers,
  Globe
} from 'lucide-react';
import { ViewMode } from '../../types';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    projects, 
    tasks, 
    teamMembers,
    setCurrentView,
    setIsCreateTaskOpen,
    setIsCreateProjectOpen,
    setSelectedTaskForDetail,
    setSelectedProjectForDetail,
    userSettings,
    updateUserSettings,
    resetToDemoData,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  const actions = [
    {
      id: 'create_task',
      title: 'Create New Task',
      category: 'Actions',
      icon: Plus,
      color: 'text-purple-600 dark:text-purple-400',
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsCreateTaskOpen(true);
      }
    },
    {
      id: 'create_project',
      title: 'Create New Project',
      category: 'Actions',
      icon: Layers,
      color: 'text-indigo-600 dark:text-indigo-400',
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsCreateProjectOpen(true);
      }
    },
    {
      id: 'open_ai',
      title: 'Ask Nexora Copilot AI',
      category: 'AI Assistant',
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('ai');
      }
    },
    {
      id: 'nav_landing',
      title: 'View Public Landing Page',
      category: 'Navigation',
      icon: Globe,
      color: 'text-purple-400',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('landing');
      }
    },
    {
      id: 'nav_dash',
      title: 'Navigate to Overview Dashboard',
      category: 'Navigation',
      icon: BarChart3,
      color: 'text-blue-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('dashboard');
      }
    },
    {
      id: 'nav_tasks',
      title: 'Navigate to Sprint Tasks & Board',
      category: 'Navigation',
      icon: CheckSquare,
      color: 'text-emerald-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('tasks');
      }
    },
    {
      id: 'nav_projects',
      title: 'Navigate to Project Portfolio',
      category: 'Navigation',
      icon: FolderKanban,
      color: 'text-indigo-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('projects');
      }
    },
    {
      id: 'nav_team',
      title: 'Navigate to Team Directory',
      category: 'Navigation',
      icon: Users,
      color: 'text-cyan-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('team');
      }
    },
    {
      id: 'nav_settings',
      title: 'Navigate to Settings & Profile',
      category: 'Navigation',
      icon: Settings,
      color: 'text-slate-400',
      action: () => {
        setIsCommandPaletteOpen(false);
        setCurrentView('settings');
      }
    },
    {
      id: 'reset_demo',
      title: 'Reset Workspace to Default Demo Data',
      category: 'Danger Zone',
      icon: RotateCcw,
      color: 'text-rose-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        if (window.confirm('Reset all workspace data to default demo state?')) {
          resetToDemoData();
        }
      }
    }
  ];

  const matchingProjects = projects
    .filter(p => p.name.toLowerCase().includes(q) || p.key.toLowerCase().includes(q))
    .map(p => ({
      id: `proj_${p.id}`,
      title: `Project: ${p.name}`,
      subtitle: `${p.key} • ${p.category} • ${p.progress}% Completed`,
      category: 'Projects',
      icon: FolderKanban,
      color: 'text-purple-600 dark:text-purple-400',
      action: () => {
        setIsCommandPaletteOpen(false);
        setSelectedProjectForDetail(p);
      }
    }));

  const matchingTasks = tasks
    .filter(t => t.title.toLowerCase().includes(q))
    .slice(0, 6)
    .map(t => ({
      id: `task_${t.id}`,
      title: `Task: ${t.title}`,
      subtitle: `Due: ${t.dueDate} • Priority: ${t.priority}`,
      category: 'Tasks',
      icon: CheckSquare,
      color: 'text-blue-500',
      action: () => {
        setIsCommandPaletteOpen(false);
        setSelectedTaskForDetail(t);
      }
    }));

  const matchingActions = actions.filter(a => a.title.toLowerCase().includes(q));
  const allItems = [...matchingActions, ...matchingProjects, ...matchingTasks];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % allItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-[#1E2538] bg-slate-50 dark:bg-[#0D101A]">
          <Search className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search workspace..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-[#1E2538]/40">
          {allItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching commands or workspace records found for "{query}".
            </div>
          ) : (
            allItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer text-xs transition-colors ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-600/20 text-purple-700 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className={`p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold truncate text-slate-900 dark:text-white">{item.title}</div>
                      {(item as any).subtitle && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {(item as any).subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#0D101A] border-t border-slate-200 dark:border-[#1E2538] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>esc Dismiss</span>
          </div>
          <span>Nexora Command System</span>
        </div>
      </div>
    </div>
  );
};
