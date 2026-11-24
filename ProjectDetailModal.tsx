import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  DollarSign, 
  Users, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Priority, ProjectStatus } from '../../types';

export const ProjectDetailModal: React.FC = () => {
  const { 
    selectedProjectForDetail, 
    setSelectedProjectForDetail, 
    updateProject, 
    deleteProject, 
    tasks, 
    teamMembers,
    setSelectedTaskForDetail,
    setIsCreateTaskOpen,
    setActiveProjectId,
    setCurrentView
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('in_progress');
  const [priority, setPriority] = useState<Priority>('high');
  const [dueDate, setDueDate] = useState('');
  const [budget, setBudget] = useState(0);

  if (!selectedProjectForDetail) return null;
  const p = selectedProjectForDetail;

  const projectTasks = tasks.filter(t => t.projectId === p.id);
  const completedTasks = projectTasks.filter(t => t.status === 'completed');
  const calculatedProgress = projectTasks.length > 0 
    ? Math.round((completedTasks.length / projectTasks.length) * 100) 
    : p.progress;

  const projectMembers = teamMembers.filter(m => p.teamMemberIds?.includes(m.id));

  const handleStartEdit = () => {
    setName(p.name);
    setDescription(p.description);
    setStatus(p.status);
    setPriority(p.priority);
    setDueDate(p.dueDate);
    setBudget(p.budget);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(p.id, {
      name,
      description,
      status,
      priority,
      dueDate,
      budget: Number(budget),
    });
    setSelectedProjectForDetail({
      ...p,
      name,
      description,
      status,
      priority,
      dueDate,
      budget: Number(budget),
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete project "${p.name}" and all its tasks?`)) {
      deleteProject(p.id);
      setSelectedProjectForDetail(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Cover Gradient Header */}
        <div className="p-6 bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-transparent dark:from-purple-950 dark:via-slate-900 dark:to-indigo-950 border-b border-slate-200/80 dark:border-[#1E2538] relative">
          <button
            onClick={() => setSelectedProjectForDetail(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-transparent shadow-xs">
              {p.key}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-200">
              {p.category}
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
              p.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300' :
              p.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300' :
              'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300'
            }`}>
              {p.priority} priority
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{p.name}</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">{p.description}</p>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as ProjectStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as Priority)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Progress & Quick Stats */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Milestone Completion</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">{calculatedProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${calculatedProgress}%` }}
                  />
                </div>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    Due Date
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{p.dueDate}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Budget
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">${p.budget.toLocaleString()}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    Spent
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">${(p.spent || 0).toLocaleString()}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    Tasks
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{completedTasks.length}/{projectTasks.length} Done</div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Team Assigned
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectMembers.map(m => (
                    <div key={m.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                      <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Tasks */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    Associated Tasks ({projectTasks.length})
                  </div>
                  <button
                    onClick={() => {
                      setActiveProjectId(p.id);
                      setIsCreateTaskOpen(true);
                    }}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {projectTasks.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400 bg-slate-50 dark:bg-[#0A0D14] rounded-2xl border border-slate-200/80 dark:border-[#1E2538]">
                      No tasks created for this project yet.
                    </div>
                  ) : (
                    projectTasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTaskForDetail(t)}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538] hover:border-purple-300 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3 truncate">
                          <span className={`w-2 h-2 rounded-full ${
                            t.status === 'completed' ? 'bg-emerald-500' :
                            t.status === 'in_progress' ? 'bg-blue-500' :
                            t.status === 'review' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-white truncate">
                            {t.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-xs">
                            {t.status.replace('_', ' ')}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#0D101A] border-t border-slate-200/80 dark:border-[#1E2538] flex items-center justify-between flex-shrink-0">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Project</span>
          </button>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            )}
            <button
              onClick={() => {
                setActiveProjectId(p.id);
                setSelectedProjectForDetail(null);
                setCurrentView('tasks');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/25"
            >
              Open Kanban Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
