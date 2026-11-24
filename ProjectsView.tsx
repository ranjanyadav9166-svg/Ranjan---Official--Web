import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Calendar, 
  DollarSign, 
  Trash2, 
  ArrowUpRight
} from 'lucide-react';
import { Project } from '../../types';

export const ProjectsView: React.FC = () => {
  const { 
    projects, 
    tasks, 
    teamMembers, 
    setIsCreateProjectOpen, 
    setSelectedProjectForDetail,
    deleteProject,
    setCurrentView,
    setActiveProjectId
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'dueDate' | 'progress' | 'budget' | 'name'>('progress');

  const categories = ['All', 'Engineering', 'Product', 'Marketing', 'Design', 'Operations', 'Research'];

  // Filter & Search
  const filteredProjects = projects
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.key.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
      return matchSearch && matchCategory && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortBy === 'budget') return b.budget - a.budget;
      return a.name.localeCompare(b.name);
    });

  const handleDelete = (e: React.MouseEvent, p: Project) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete project "${p.name}"?`)) {
      deleteProject(p.id);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Project Portfolio</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
              {filteredProjects.length} Initiatives
            </span>
          </h2>
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track milestones, budgets, assignees, and cross-functional strategic goals.
          </p>
        </div>

        <button
          onClick={() => setIsCreateProjectOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects by title, key, or description..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-800 dark:text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-800 dark:text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="progress">Sort by Progress</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="budget">Sort by Budget</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* View toggle (Grid / List) */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0A0D14] rounded-xl border border-slate-200 dark:border-[#1E2538] p-0.5">
            <button
              onClick={() => setViewStyle('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewStyle === 'grid' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewStyle('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewStyle === 'list' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#10141E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-[#1E2538]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECTS DISPLAY */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] space-y-3 shadow-xs">
          <FolderKanban className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No projects found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or category filter, or create a new project.
          </p>
          <button
            onClick={() => setIsCreateProjectOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
          >
            Create New Project
          </button>
        </div>
      ) : viewStyle === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(p => {
            const projectTasks = tasks.filter(t => t.projectId === p.id);
            const completedCount = projectTasks.filter(t => t.status === 'completed').length;
            const calcProgress = projectTasks.length > 0 
              ? Math.round((completedCount / projectTasks.length) * 100) 
              : p.progress;

            const members = teamMembers.filter(m => p.teamMemberIds?.includes(m.id));

            return (
              <div
                key={p.id}
                onClick={() => setSelectedProjectForDetail(p)}
                className="rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] hover:border-purple-400 dark:hover:border-purple-500/40 overflow-hidden cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between group"
              >
                {/* Card Top Cover Header */}
                <div className="p-5 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent dark:from-purple-950/40 dark:to-slate-900 border-b border-slate-200/80 dark:border-[#1E2538]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-transparent shadow-xs">
                        {p.key}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300">
                        {p.category}
                      </span>
                    </div>

                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      p.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300' :
                      p.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300' :
                      'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300'
                    }`}>
                      {p.priority}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-1 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Milestone Progress</span>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{calcProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${calcProgress}%`, backgroundColor: p.color }}
                      />
                    </div>
                  </div>

                  {/* Meta stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-0.5">
                        <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        Due Date
                      </div>
                      <div className="font-mono font-bold text-slate-900 dark:text-white text-[11px]">{p.dueDate}</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-0.5">
                        <DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        Budget
                      </div>
                      <div className="font-mono font-bold text-slate-900 dark:text-white text-[11px]">${p.budget.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Team Avatars & Footer actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-[#1E2538] flex items-center justify-between">
                    <div className="flex items-center -space-x-2 overflow-hidden">
                      {members.slice(0, 4).map(m => (
                        <img
                          key={m.id}
                          src={m.avatar}
                          alt={m.name}
                          title={m.name}
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-[#10141E]"
                        />
                      ))}
                      {members.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center ring-2 ring-white dark:ring-[#10141E]">
                          +{members.length - 4}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setActiveProjectId(p.id);
                          setCurrentView('tasks');
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
                        title="Open in Kanban Board"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={e => handleDelete(e, p)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#0D101A] border-b border-slate-200/80 dark:border-[#1E2538] text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Key & Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E2538]/60">
                {filteredProjects.map(p => {
                  const members = teamMembers.filter(m => p.teamMemberIds?.includes(m.id));
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProjectForDetail(p)}
                      className="hover:bg-purple-50/50 dark:hover:bg-purple-950/10 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-400">{p.key}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">{p.category}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          p.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300' :
                          p.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300' :
                          'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300'
                        }`}>
                          {p.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${p.progress}%`, backgroundColor: p.color }} />
                          </div>
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        ${p.budget.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{p.dueDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center -space-x-1.5">
                          {members.slice(0, 3).map(m => (
                            <img
                              key={m.id}
                              src={m.avatar}
                              alt={m.name}
                              className="w-5 h-5 rounded-full object-cover ring-1 ring-white dark:ring-slate-800"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={e => handleDelete(e, p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
