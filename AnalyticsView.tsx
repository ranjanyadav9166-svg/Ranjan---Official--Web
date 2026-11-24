import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  Download, 
  CheckCircle2, 
  Clock, 
  Trophy,
  Target
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { analyticsData } from '../../data/mockData';

export const AnalyticsView: React.FC = () => {
  const { tasks, showToast, teamMembers } = useApp();

  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'quarter' | 'year'>('30d');

  const handleExport = () => {
    showToast({
      title: 'Report Generated',
      description: 'Analytics summary and KPI audit ledger exported as PDF.',
      type: 'success',
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 84;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] shadow-xl text-xs">
          <p className="font-bold text-slate-900 dark:text-white mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & Date Range Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Productivity & Velocity Intelligence</span>
          </h2>
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time delivery burndown, department allocation, and contributor throughput.
          </p>
        </div>

        {/* Filter and Export Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-slate-100 dark:bg-[#10141E] p-1 rounded-xl border border-slate-200 dark:border-[#1E2538]">
            {(['7d', '30d', 'quarter', 'year'] as const).map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  dateRange === range
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === 'quarter' ? 'Quarter' : 'All Year'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI STAT SUMMARY STRIP (4 CARDS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Productivity Score</span>
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">96.8%</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% from last cycle</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Task Completion</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{completionRate}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            <span>{completedTasks} completed of {totalTasks} total</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cycle Time</span>
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">2.4 days</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-bold">
            <span>18h faster than baseline</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">High-Priority Win</span>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">92.5%</div>
          <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-bold">
            <span>0 overdue blockers</span>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1: SPRINT VELOCITY & MONTHLY THROUGHPUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Burndown & Velocity Area Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Velocity & Task Burndown</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                  Target: 95%+
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Completed items vs planned daily sprint targets</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.weeklyVelocity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaColorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="completed" name="Completed Tasks" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#areaColorComp)" />
                <Area type="monotone" dataKey="planned" name="Planned Target" stroke="#3B82F6" strokeWidth={2} strokeDasharray="3 3" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 dark:border-[#1E2538] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Completed Velocity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Sprint Target</span>
            </div>
          </div>
        </div>

        {/* Monthly Performance Trend Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Monthly Output & Accuracy Index</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total delivered points and sprint prediction accuracy</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="velocity" name="Delivered Points" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="accuracy" name="Accuracy %" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 dark:border-[#1E2538] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-600" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Delivered Points</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Accuracy %</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: DEPARTMENT EFFORT DONUT & STATUS FUNNEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Allocation Donut */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Workload by Department</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Resource allocation across functional squads</p>
          </div>

          <div className="h-52 w-full my-2 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {analyticsData.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Capacity</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-[#1E2538] text-xs">
            {analyticsData.categoryDistribution.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-700 dark:text-slate-300 truncate font-medium">{c.name}</span>
                </div>
                <span className="font-mono text-slate-500 dark:text-slate-400 font-bold">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Status Funnel (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Sprint Pipeline Throughput</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current active tasks moving from backlog to completion</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={analyticsData.taskStatusDistribution}
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis dataKey="status" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Count" radius={[0, 8, 8, 0]}>
                  {analyticsData.taskStatusDistribution.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1E2538] text-xs text-slate-500 dark:text-slate-400">
            <span>Average task lifecycle: <strong className="text-slate-900 dark:text-white">2.4 days</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Zero bottleneck stages detected</span>
          </div>
        </div>
      </div>

      {/* TEAM PRODUCTIVITY LEADERBOARD */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Contributor Performance & Productivity</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Top sprint achievers and velocity champions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.slice(0, 6).map((member, idx) => (
            <div key={member.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538] flex items-center gap-3">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-500/30" />
                <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-purple-600 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  #{idx + 1}
                </span>
              </div>
              <div className="flex-1 truncate">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{member.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{member.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">
                    {member.tasksCompleted} tasks done
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {member.productivityScore}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
