import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EngineerSpotlightBanner } from '../layout/EngineerSpotlightBanner';
import { 
  FolderKanban, 
  CheckSquare, 
  CheckCircle2, 
  Users, 
  Plus, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Activity as ActivityIcon, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { analyticsData } from '../../data/mockData';

export const MainDashboard: React.FC = () => {
  const { 
    projects, 
    tasks, 
    teamMembers, 
    activities, 
    setCurrentView,
    setIsCreateTaskOpen,
    setSelectedTaskForDetail,
    setSelectedProjectForDetail,
    moveTask
  } = useApp();

  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Stats
  const totalProjects = projects.length;
  const activeTasks = tasks.filter(t => t.status !== 'completed').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTeam = teamMembers.length;

  // Upcoming deadlines (next 7 days, sorted by dueDate)
  const upcomingTasks = [...tasks]
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Custom Dark Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-[#10141E] border border-[#1E2538] shadow-2xl text-xs">
          <p className="font-bold text-white mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
              <span className="font-mono font-bold text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 0. STYLISH ENGINEER SPOTLIGHT BANNER (RANJAN KR YADAV • GEMINI FLASH) */}
      <EngineerSpotlightBanner compact={true} />

      {/* 1. GOOGLE-STYLE AIRY HEADER GREETING */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Alex 👋
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            You have <strong className="text-purple-400 font-semibold">{activeTasks} tasks in progress</strong> across {totalProjects} active projects today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateTaskOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* 2. 4 ESSENTIAL METRIC CARDS (Google-style clean, spacious, uncluttered) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div 
          onClick={() => setCurrentView('projects')}
          className="p-5 rounded-2xl bg-[#10141E] border border-[#1E2538] hover:border-purple-500/40 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Projects</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalProjects}</div>
          <div className="text-[11px] text-purple-400 mt-1.5 font-medium flex items-center gap-1">
            <span>{projects.filter(p => p.status === 'in_progress').length} In Progress</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Active Tasks */}
        <div 
          onClick={() => setCurrentView('tasks')}
          className="p-5 rounded-2xl bg-[#10141E] border border-[#1E2538] hover:border-blue-500/40 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tasks in Flight</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{activeTasks}</div>
          <div className="text-[11px] text-blue-400 mt-1.5 font-medium flex items-center gap-1">
            <span>To Do & In Progress</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Completed Tasks */}
        <div 
          onClick={() => setCurrentView('tasks')}
          className="p-5 rounded-2xl bg-[#10141E] border border-[#1E2538] hover:border-emerald-500/40 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Sprint</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{completedTasks}</div>
          <div className="text-[11px] text-emerald-400 mt-1.5 font-medium flex items-center gap-1">
            <span>+12 delivered this month</span>
          </div>
        </div>

        {/* Team Members */}
        <div 
          onClick={() => setCurrentView('team')}
          className="p-5 rounded-2xl bg-[#10141E] border border-[#1E2538] hover:border-indigo-500/40 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Team Members</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalTeam}</div>
          <div className="text-[11px] text-indigo-400 mt-1.5 font-medium flex items-center gap-1">
            <span>All members active</span>
          </div>
        </div>
      </div>

      {/* 3. CHARTS ROW (Sprint Velocity & Category Allocation) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sprint Velocity Area Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#10141E] border border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Sprint Velocity & Task Throughput
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Target: 95%+
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time burndown velocity vs planned capacity
              </p>
            </div>

            {/* Segmented Time Toggle */}
            <div className="flex items-center bg-[#0A0D14] p-1 rounded-xl border border-[#1E2538]">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === '7d' 
                    ? 'bg-purple-600 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === '30d' 
                    ? 'bg-purple-600 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Trend
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.weeklyVelocity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#1E2538' }} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#1E2538' }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  name="Completed Tasks" 
                  stroke="#8B5CF6" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorCompleted)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  name="Planned Target" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                  fillOpacity={1} 
                  fill="url(#colorPlanned)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#1E2538] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="text-slate-300 font-medium">Completed Work</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-dashed border-white/40" />
              <span className="text-slate-300 font-medium">Planned Capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">Avg Efficiency: 95.8%</span>
            </div>
          </div>
        </div>

        {/* Effort by Department Donut Chart (1 Col) */}
        <div className="p-6 rounded-3xl bg-[#10141E] border border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-0.5">
              Effort by Department
            </h3>
            <p className="text-xs text-slate-400">
              Workload distribution across teams
            </p>
          </div>

          <div className="h-48 w-full my-2 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {analyticsData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#10141E" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-2xl font-black text-white">{activeTasks + completedTasks}</span>
              <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">Total Tasks</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1E2538]">
            {analyticsData.categoryDistribution.slice(0, 4).map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-300 font-medium">{c.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-400">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. UPCOMING DEADLINES & PROJECT ROADMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Milestones & Deadlines */}
        <div className="p-6 rounded-3xl bg-[#10141E] border border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Upcoming Milestones & Deadlines</span>
              </h3>
              <p className="text-xs text-slate-400">
                Critical tasks scheduled for completion
              </p>
            </div>
            <button
              onClick={() => setCurrentView('tasks')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-80 pr-1">
            {upcomingTasks.map(task => {
              const proj = projects.find(p => p.id === task.projectId);
              const assignee = teamMembers.find(m => m.id === task.assigneeId);
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskForDetail(task)}
                  className="p-3.5 rounded-2xl bg-[#0A0D14] border border-[#1E2538] hover:border-purple-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        moveTask(task.id, 'completed');
                      }}
                      className="w-5 h-5 rounded-lg border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 transition-colors"
                      title="Mark complete"
                    >
                      <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity" />
                    </button>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-purple-400 font-semibold">{proj?.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      task.priority === 'urgent' ? 'bg-rose-950/40 text-rose-300 border border-rose-800/40' :
                      task.priority === 'high' ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40' :
                      'bg-blue-950/40 text-blue-300 border border-blue-800/40'
                    }`}>
                      {task.priority}
                    </span>
                    {assignee && (
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        title={assignee.name}
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Progress Overview */}
        <div className="p-6 rounded-3xl bg-[#10141E] border border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-indigo-400" />
                <span>Project Progress & Roadmaps</span>
              </h3>
              <p className="text-xs text-slate-400">
                Active initiative delivery targets
              </p>
            </div>
            <button
              onClick={() => setCurrentView('projects')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-80 pr-1">
            {projects.slice(0, 4).map(p => {
              const projectTasks = tasks.filter(t => t.projectId === p.id);
              const completedCount = projectTasks.filter(t => t.status === 'completed').length;
              const calcProgress = projectTasks.length > 0 
                ? Math.round((completedCount / projectTasks.length) * 100) 
                : p.progress;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectForDetail(p)}
                  className="p-4 rounded-2xl bg-[#0A0D14] border border-[#1E2538] hover:border-purple-500/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                        {p.name}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {calcProgress}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${calcProgress}%`,
                        backgroundColor: p.color 
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{completedCount} of {projectTasks.length} tasks completed</span>
                    <span className="font-mono font-medium">Due: {p.dueDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. LIVE WORKSPACE ACTIVITY FEED */}
      <div className="p-6 rounded-3xl bg-[#10141E] border border-[#1E2538] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
              <ActivityIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Live Workspace Activity</h3>
              <p className="text-xs text-slate-400">Real-time team updates, commits, and sprint events</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#1E2538]/60">
          {activities.slice(0, 5).map(act => (
            <div key={act.id} className="py-3 flex items-start gap-3.5">
              <img
                src={act.userAvatar}
                alt={act.userName}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-800 flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white">
                    {act.userName}{' '}
                    <span className="font-normal text-slate-400">{act.action}</span>{' '}
                    <span className="font-bold text-purple-300">"{act.targetName}"</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium flex-shrink-0">{act.timestamp}</span>
                </div>
                {act.details && (
                  <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">
                    {act.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
