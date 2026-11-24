import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Activity, 
  Plus, 
  X, 
  Search, 
  Calendar
} from 'lucide-react';

export const TeamView: React.FC = () => {
  const { teamMembers, tasks, activities, inviteMember, setIsCreateTaskOpen } = useApp();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Form states for inviting teammate
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [skillsInput, setSkillsInput] = useState('');

  const departments = ['All', 'Engineering', 'Design', 'Product', 'Operations', 'Marketing'];

  const filteredMembers = teamMembers.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchDept = selectedDept === 'All' || m.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const skills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    inviteMember({
      name,
      email,
      role: role || 'Contributor',
      department,
      skills: skills.length > 0 ? skills : ['Collaboration'],
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random()*100000000)}?w=150&auto=format&fit=crop&q=80`
    });

    setName('');
    setEmail('');
    setRole('');
    setSkillsInput('');
    setIsInviteModalOpen(false);
  };

  const totalCompleted = teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0);
  const avgProductivity = Math.round(
    teamMembers.reduce((acc, m) => acc + m.productivityScore, 0) / (teamMembers.length || 1)
  );

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Team Collaboration & Directory</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
              {teamMembers.length} Members
            </span>
          </h2>
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor member productivity, active assignments, and collaborate across departments.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Teammate</span>
        </button>
      </div>

      {/* Stats KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block mb-1">Total Teammates</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{teamMembers.length}</span>
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold block mt-0.5">Across 5 departments</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block mb-1">Active Now</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {teamMembers.filter(m => m.status === 'active').length}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">Ready for review</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block mb-1">Avg Productivity</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{avgProductivity}%</span>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">Top 5% benchmark</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block mb-1">Total Tasks Finished</span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{totalCompleted}</span>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold block mt-0.5">All-time workspace</span>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, role, email, or skill..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0A0D14] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1E2538]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* TEAM MEMBER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(m => {
          const memberActiveTasks = tasks.filter(t => t.assigneeId === m.id && t.status !== 'completed');
          const memberDoneTasks = tasks.filter(t => t.assigneeId === m.id && t.status === 'completed');

          return (
            <div
              key={m.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] hover:border-purple-400 dark:hover:border-purple-500/40 transition-all hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Header: Avatar, Status & Role */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-500/30 group-hover:ring-purple-400 transition-all"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#10141E] ${
                        m.status === 'active' ? 'bg-emerald-500' :
                        m.status === 'busy' ? 'bg-amber-500' : 'bg-slate-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{m.role}</p>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        {m.department}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20">
                    {m.productivityScore}% Score
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-[#0A0D14] px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-[#1E2538] truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate font-medium">{m.email}</span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {m.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Workload Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Active Tasks</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">{memberActiveTasks.length} in sprint</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538]">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Completed</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{m.tasksCompleted + memberDoneTasks.length}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#1E2538] flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  Joined {m.joinedDate}
                </span>

                <button
                  onClick={() => setIsCreateTaskOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-600/20 dark:hover:bg-purple-600/40 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Assign Task</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TEAM ACTIVITY TIMELINE */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Collaboration & Sprint Feed</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Recent accomplishments and task updates across teammates</p>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map(act => (
            <div key={act.id} className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/70 dark:bg-[#0A0D14] border border-slate-200/70 dark:border-[#1E2538]">
              <img
                src={act.userAvatar}
                alt={act.userName}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-800 flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {act.userName}{' '}
                    <span className="font-normal text-slate-500 dark:text-slate-400">{act.action}</span>{' '}
                    <span className="font-bold text-purple-600 dark:text-purple-300">"{act.targetName}"</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                </div>
                {act.details && (
                  <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] leading-relaxed">
                    {act.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INVITE TEAMMATE MODAL */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] shadow-2xl p-6 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Invite Teammate</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Add a new collaborator to the Nexora workspace</p>
              </div>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="sarah@nexora.io"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="Product Designer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
                  placeholder="React, Figma, UX Research"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
