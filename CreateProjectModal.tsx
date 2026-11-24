import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Layers, Calendar, DollarSign, Users } from 'lucide-react';
import { Priority, ProjectCategory, ProjectStatus } from '../../types';

export const CreateProjectModal: React.FC = () => {
  const { isCreateProjectOpen, setIsCreateProjectOpen, addProject, teamMembers } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Engineering');
  const [priority, setPriority] = useState<Priority>('high');
  const [status, setStatus] = useState<ProjectStatus>('planning');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [budget, setBudget] = useState(35000);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(['user-1']);
  const [color, setColor] = useState('#8B5CF6');

  if (!isCreateProjectOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProject({
      name,
      description,
      category,
      priority,
      status,
      dueDate,
      budget: Number(budget) || 20000,
      teamMemberIds: selectedMembers,
      color,
      progress: 0,
      spent: 0,
    });

    // Reset & close
    setName('');
    setDescription('');
    setIsCreateProjectOpen(false);
  };

  const colors = [
    { label: 'Purple', value: '#8B5CF6' },
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Cyan', value: '#06B6D4' },
    { label: 'Emerald', value: '#10B981' },
    { label: 'Amber', value: '#F59E0B' },
    { label: 'Rose', value: '#F43F5E' },
  ];

  const categories: ProjectCategory[] = ['Engineering', 'Product', 'Marketing', 'Design', 'Operations', 'Research'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-[#1E2538] bg-slate-50 dark:bg-[#0D101A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Create New Project</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Initialize a collaborative initiative in your workspace</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateProjectOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Next-Gen Realtime Collab Engine"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What are the key outcomes and architectural milestones for this project?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Priority</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Target Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Budget Allocation ($)
              </label>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Color theme selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              {colors.map(c => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c.value ? 'scale-125 ring-2 ring-purple-600 ring-offset-2 ring-offset-white dark:ring-offset-[#10141E]' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Team Members Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Assign Team Members
            </label>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map(m => {
                const isSelected = selectedMembers.includes(m.id);
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMembers(selectedMembers.filter(id => id !== m.id));
                      } else {
                        setSelectedMembers([...selectedMembers, m.id]);
                      }
                    }}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs border font-medium transition-all ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-600/20 border-purple-500 text-purple-700 dark:text-white font-bold'
                        : 'bg-slate-50 dark:bg-[#0A0D14] border-slate-200 dark:border-[#1E2538] text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full object-cover" />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/80 dark:border-[#1E2538]">
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
