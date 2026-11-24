import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  CheckSquare, 
  FolderKanban,
  Edit2
} from 'lucide-react';
import { TaskStatus, Priority } from '../../types';

export const TaskDetailModal: React.FC = () => {
  const { 
    selectedTaskForDetail, 
    setSelectedTaskForDetail, 
    updateTask, 
    deleteTask, 
    toggleChecklist,
    moveTask,
    projects, 
    teamMembers 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<Priority>('medium');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [newChecklistText, setNewChecklistText] = useState('');

  if (!selectedTaskForDetail) return null;
  const t = selectedTaskForDetail;

  const project = projects.find(p => p.id === t.projectId);
  const assignee = teamMembers.find(m => m.id === t.assigneeId);

  const completedChecklistCount = (t.checklist || []).filter(c => c.completed).length;

  const handleStartEdit = () => {
    setTitle(t.title);
    setDescription(t.description);
    setStatus(t.status);
    setPriority(t.priority);
    setAssigneeId(t.assigneeId);
    setDueDate(t.dueDate);
    setEstimatedHours(t.estimatedHours);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(t.id, {
      title,
      description,
      status,
      priority,
      assigneeId,
      dueDate,
      estimatedHours: Number(estimatedHours),
    });
    setSelectedTaskForDetail({
      ...t,
      title,
      description,
      status,
      priority,
      assigneeId,
      dueDate,
      estimatedHours: Number(estimatedHours),
    });
    setIsEditing(false);
  };

  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    const newItem = {
      id: 'c_' + Date.now(),
      text: newChecklistText.trim(),
      completed: false,
    };
    const updated = [...(t.checklist || []), newItem];
    updateTask(t.id, { checklist: updated });
    setSelectedTaskForDetail({ ...t, checklist: updated });
    setNewChecklistText('');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete task "${t.title}"?`)) {
      deleteTask(t.id);
      setSelectedTaskForDetail(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-[#1E2538] bg-slate-50 dark:bg-[#0D101A] relative flex-shrink-0">
          <button
            onClick={() => setSelectedTaskForDetail(null)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {project && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 flex items-center gap-1">
                <FolderKanban className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                {project.name}
              </span>
            )}
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
              t.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300' :
              t.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300' :
              'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300'
            }`}>
              {t.priority}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {t.status.replace('_', ' ')}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pr-8">{t.title}</h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={4}
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
                    onChange={e => setStatus(e.target.value as TaskStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Assignee</label>
                  <select
                    value={assigneeId}
                    onChange={e => setAssigneeId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-sm"
                  >
                    {teamMembers.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
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
                  Save Task
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0A0D14] p-3.5 rounded-2xl border border-slate-200/80 dark:border-[#1E2538]">
                  {t.description || 'No detailed description provided.'}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <User className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    Assignee
                  </div>
                  {assignee ? (
                    <div className="flex items-center gap-2 mt-1">
                      <img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Unassigned</span>
                  )}
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    Due Date
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono mt-1">{t.dueDate}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                  <div className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    Estimated
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono mt-1">{t.estimatedHours} hours</div>
                </div>
              </div>

              {/* Tags */}
              {t.tags && t.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Subtasks Checklist
                  </h4>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                    {completedChecklistCount}/{(t.checklist || []).length} Completed
                  </span>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 mb-3">
                  {(t.checklist || []).map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(t.id, item.id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538] hover:border-purple-300 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-0 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <span className={`text-xs flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add Checklist Item */}
                <form onSubmit={handleAddChecklistItem} className="flex gap-2">
                  <input
                    type="text"
                    value={newChecklistText}
                    onChange={e => setNewChecklistText(e.target.value)}
                    placeholder="Add a subtask item..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#0D101A] border-t border-slate-200/80 dark:border-[#1E2538] flex items-center justify-between flex-shrink-0">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            )}

            {t.status !== 'completed' ? (
              <button
                onClick={() => {
                  moveTask(t.id, 'completed');
                  setSelectedTaskForDetail({ ...t, status: 'completed' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Completed</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  moveTask(t.id, 'in_progress');
                  setSelectedTaskForDetail({ ...t, status: 'in_progress' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
              >
                <span>Reopen Task</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
