import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Calendar, 
  LayoutGrid, 
  List, 
  Trash2, 
  FolderKanban
} from 'lucide-react';
import { TaskStatus, Priority } from '../../types';

export const TasksView: React.FC = () => {
  const { 
    tasks, 
    projects, 
    teamMembers, 
    setIsCreateTaskOpen, 
    setSelectedTaskForDetail, 
    moveTask, 
    deleteTask,
    activeProjectId,
    setActiveProjectId 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);

  const columns: { id: TaskStatus; title: string; color: string; dotColor: string }[] = [
    { id: 'todo', title: 'To Do', color: 'border-slate-300 dark:border-slate-700', dotColor: 'bg-slate-400' },
    { id: 'in_progress', title: 'In Progress', color: 'border-blue-400 dark:border-blue-500', dotColor: 'bg-blue-500' },
    { id: 'review', title: 'Review', color: 'border-amber-400 dark:border-amber-500', dotColor: 'bg-amber-500' },
    { id: 'completed', title: 'Completed', color: 'border-emerald-400 dark:border-emerald-500', dotColor: 'bg-emerald-500' },
  ];

  // Filtering
  const filteredTasks = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
    const matchProject = !activeProjectId || t.projectId === activeProjectId;
    const matchAssignee = selectedAssignee === 'all' || t.assigneeId === selectedAssignee;
    const matchPriority = selectedPriority === 'all' || t.priority === selectedPriority;
    return matchSearch && matchProject && matchAssignee && matchPriority;
  });

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, colId: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, colId: TaskStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      moveTask(taskId, colId);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Sprint & Task Board</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
              {filteredTasks.length} Active Items
            </span>
          </h2>
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Drag and drop tasks across sprint columns or filter by assignee and initiative.
          </p>
        </div>

        <button
          onClick={() => setIsCreateTaskOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
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
            placeholder="Search tasks by title, description, or tag..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Project filter */}
          <select
            value={activeProjectId || 'all'}
            onChange={e => setActiveProjectId(e.target.value === 'all' ? null : e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-800 dark:text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Assignee filter */}
          <select
            value={selectedAssignee}
            onChange={e => setSelectedAssignee(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-800 dark:text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Assignees</option>
            {teamMembers.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {/* Priority filter */}
          <select
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-800 dark:text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent Priority</option>
          </select>

          {/* View toggle (Kanban / List) */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0A0D14] rounded-xl border border-slate-200 dark:border-[#1E2538] p-0.5">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'kanban' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Kanban Board"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' 
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

      {/* Active Project Filter banner if selected */}
      {activeProjectId && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 text-xs">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <FolderKanban className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Filtering tasks for: <strong>{projects.find(p => p.id === activeProjectId)?.name}</strong></span>
          </div>
          <button
            onClick={() => setActiveProjectId(null)}
            className="text-purple-700 dark:text-purple-300 hover:underline font-bold"
          >
            Show All Projects
          </button>
        </div>
      )}

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            const isOver = dragOverCol === col.id;

            return (
              <div
                key={col.id}
                onDragOver={e => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={e => handleDrop(e, col.id)}
                className={`rounded-3xl bg-slate-100/70 dark:bg-[#10141E]/90 border transition-all min-h-[500px] flex flex-col p-4 shadow-xs ${
                  isOver 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 ring-2 ring-purple-500/20' 
                    : 'border-slate-200/80 dark:border-[#1E2538]'
                }`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-[#1E2538]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                      {col.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-xs">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Task Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[68vh] pr-0.5">
                  {colTasks.length === 0 ? (
                    <div className="h-32 rounded-2xl border border-dashed border-slate-300 dark:border-[#1E2538] flex items-center justify-center text-xs text-slate-400">
                      Drop tasks here
                    </div>
                  ) : (
                    colTasks.map(task => {
                      const proj = projects.find(p => p.id === task.projectId);
                      const assignee = teamMembers.find(m => m.id === task.assigneeId);
                      const completedSubtasks = (task.checklist || []).filter(c => c.completed).length;

                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={e => handleDragStart(e, task.id)}
                          onClick={() => setSelectedTaskForDetail(task)}
                          className="p-4 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538] hover:border-purple-400 dark:hover:border-purple-500/50 cursor-grab active:cursor-grabbing transition-all hover:shadow-md group"
                        >
                          {/* Project Tag & Priority */}
                          <div className="flex items-center justify-between gap-1 mb-2">
                            {proj && (
                              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 truncate max-w-[140px]">
                                {proj.name}
                              </span>
                            )}
                            <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ${
                              task.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40' :
                              task.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40' :
                              'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40'
                            }`}>
                              {task.priority}
                            </span>
                          </div>

                          {/* Task Title */}
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-2 leading-snug">
                            {task.title}
                          </h4>

                          {/* Subtasks Progress if any */}
                          {task.checklist && task.checklist.length > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                                <span>Subtasks</span>
                                <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">
                                  {completedSubtasks}/{task.checklist.length}
                                </span>
                              </div>
                              <div className="w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                                  style={{
                                    width: `${Math.round((completedSubtasks / task.checklist.length) * 100)}%`
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Tags */}
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {task.tags.slice(0, 2).map((t, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer: Due date, Assignee */}
                          <div className="pt-2 border-t border-slate-100 dark:border-[#1E2538] flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                              <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                              <span className="font-mono">{task.dueDate}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {assignee && (
                                <img
                                  src={assignee.avatar}
                                  alt={assignee.name}
                                  title={assignee.name}
                                  className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
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
                  <th className="py-3 px-4">Task Title</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Subtasks</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E2538]/60">
                {filteredTasks.map(t => {
                  const proj = projects.find(p => p.id === t.projectId);
                  const assignee = teamMembers.find(m => m.id === t.assigneeId);
                  const completedSubtasks = (t.checklist || []).filter(c => c.completed).length;

                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTaskForDetail(t)}
                      className="hover:bg-purple-50/50 dark:hover:bg-purple-950/10 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {t.title}
                      </td>
                      <td className="py-3 px-4 text-purple-600 dark:text-purple-300 font-semibold">{proj?.name || '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          t.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300' :
                          t.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300' :
                          t.status === 'review' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300' :
                          'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {t.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          t.priority === 'urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300' :
                          t.priority === 'high' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-300' :
                          'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {assignee ? (
                          <div className="flex items-center gap-2">
                            <img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{assignee.name}</span>
                          </div>
                        ) : '—'}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{t.dueDate}</td>
                      <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400 font-bold">
                        {completedSubtasks}/{(t.checklist || []).length}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            deleteTask(t.id);
                          }}
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
