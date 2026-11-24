import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  User, 
  Moon, 
  Bell, 
  RotateCcw, 
  Download, 
  Check, 
  Eye, 
  EyeOff, 
  Sparkles,
  Sliders,
  Save,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    userSettings, 
    updateUserSettings, 
    resetToDemoData, 
    projects, 
    tasks, 
    teamMembers, 
    showToast,
    userSubscription,
    openPaymentGateway
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'ai' | 'workspace' | 'billing'>('profile');

  // Form states
  const [name, setName] = useState(userSettings.name);
  const [email, setEmail] = useState(userSettings.email);
  const [title, setTitle] = useState(userSettings.title);
  const [bio, setBio] = useState(userSettings.bio);
  const [department, setDepartment] = useState(userSettings.department);
  const [avatar, setAvatar] = useState(userSettings.avatar);

  // AI & Key states
  const [apiKey, setApiKey] = useState(userSettings.apiKey || '');
  const [aiModel, setAiModel] = useState(userSettings.aiModel || 'gemini-1.5-flash');
  const [showKey, setShowKey] = useState(false);

  // Preference switches
  const [theme, setTheme] = useState(userSettings.theme);
  const [emailNotifs, setEmailNotifs] = useState(userSettings.emailNotifications);
  const [desktopNotifs, setDesktopNotifs] = useState(userSettings.desktopNotifications);
  const [weeklyDigest, setWeeklyDigest] = useState(userSettings.weeklyDigest);
  const [soundEffects, setSoundEffects] = useState(userSettings.soundEffects);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserSettings({
      name,
      email,
      title,
      bio,
      department,
      avatar,
      theme,
      apiKey,
      aiModel,
      emailNotifications: emailNotifs,
      desktopNotifications: desktopNotifs,
      weeklyDigest,
      soundEffects,
    });
  };

  const handleExportWorkspace = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      userSettings,
      projects,
      tasks,
      teamMembers,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexora_workspace_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast({
      title: 'Workspace Exported',
      description: 'JSON backup file successfully generated.',
      type: 'success',
    });
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span>Workspace & Profile Settings</span>
        </h2>
        <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile identity, color scheme, AI copilot credentials, and notifications.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-[#1E2538] pb-3 overflow-x-auto">
        {[
          { id: 'profile', label: 'User Profile', icon: User },
          { id: 'appearance', label: 'Theme & Appearance', icon: Moon },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'ai', label: 'AI Copilot Engine', icon: Sparkles },
          { id: 'billing', label: 'Billing & Payment Gateway', icon: CreditCard },
          { id: 'workspace', label: 'Workspace Data', icon: Sliders },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#10141E]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile Information</h3>

            {/* Avatar selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Profile Avatar
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500 shadow-md"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {sampleAvatars.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="preset"
                        onClick={() => setAvatar(url)}
                        className={`w-9 h-9 rounded-xl object-cover cursor-pointer transition-all hover:scale-110 ${
                          avatar === url ? 'ring-2 ring-purple-600 scale-105' : 'opacity-60 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 block">Select from team presets or input custom image URL below</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Bio / Status Note
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: THEME & APPEARANCE */}
      {activeTab === 'appearance' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Theme Selection</h3>
            <p className="text-xs text-slate-400">Nexora workspace visual aesthetic.</p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-950/20 border-2 border-purple-600 ring-2 ring-purple-600/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                  Permanent Dark Obsidian
                </span>
              </div>
              <Check className="w-4 h-4 text-purple-400 font-bold" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Obsidian Dark with Living Gemini Aurora</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep charcoal canvas (#0A0D14) with electric blue and crimson neural ambient pulses. White theme is permanently disabled for eye comfort and aesthetic perfection.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1E2538] flex items-center justify-between text-xs">
            <span className="text-slate-300">Active Theme: <strong className="text-purple-400">Obsidian Dark</strong></span>
            <span className="text-emerald-400 font-bold">Locked for maximum contrast</span>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Notification Preferences</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Control delivery channels and notification triggers.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538]">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Email Notifications</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive task assignments, mentions, and due date alerts.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmailNotifs(!emailNotifs);
                  updateUserSettings({ emailNotifications: !emailNotifs });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  emailNotifs ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  emailNotifs ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538]">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Desktop In-App Alerts</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Display floating toasts for sprint changes and task completions.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDesktopNotifs(!desktopNotifs);
                  updateUserSettings({ desktopNotifications: !desktopNotifs });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  desktopNotifs ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  desktopNotifs ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538]">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Weekly Productivity Digest</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive weekly summaries of completed velocity and sprint retros.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setWeeklyDigest(!weeklyDigest);
                  updateUserSettings({ weeklyDigest: !weeklyDigest });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  weeklyDigest ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538]">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Interactive Confetti Celebrations</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Trigger celebratory micro-confetti when moving tasks to Completed.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSoundEffects(!soundEffects);
                  updateUserSettings({ soundEffects: !soundEffects });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  soundEffects ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-800'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: AI COPILOT ENGINE */}
      {activeTab === 'ai' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">AI Copilot Credentials</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure your Google Gemini or OpenAI API keys for live AI generation.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Google Gemini API Key</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 lowercase font-medium">Stored locally in your browser</span>
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Model Engine Selection
              </label>
              <select
                value={aiModel}
                onChange={e => setAiModel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra-Fast Response)</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Architecture Reasoning)</option>
                <option value="gpt-4o">OpenAI GPT-4o (Cross-model)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {apiKey.length > 5 ? (
                  <strong className="text-emerald-600 dark:text-emerald-400">Key configured: Live API active</strong>
                ) : (
                  <strong className="text-purple-600 dark:text-purple-400">Demo mode active: Simulated intelligent responses</strong>
                )}
              </span>

              <button
                type="button"
                onClick={() => {
                  updateUserSettings({ apiKey, aiModel });
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25"
              >
                Save AI Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: WORKSPACE DATA & RESET */}
      {activeTab === 'workspace' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Workspace Storage & Data Portability</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manage persistent data backup, migration, and factory reset.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Export Full Backup</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Download a complete JSON snapshot of all your projects, sprint tasks, team rosters, and activities.
              </p>
              <button
                onClick={handleExportWorkspace}
                className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
              >
                Export Workspace JSON
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0A0D14] border border-rose-200 dark:border-rose-500/30 space-y-3">
              <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Factory Demo Reset</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Clear all custom projects and restore the original seed data and sample sprint boards.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all workspace data to default demo state?')) {
                    resetToDemoData();
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-600/20 dark:hover:bg-rose-600/40 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors"
              >
                Reset to Demo Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BILLING & PAYMENT GATEWAY */}
      {activeTab === 'billing' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span>Subscription & Payment Gateway</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your active subscription, payment methods, and automated tax invoices.
            </p>
          </div>

          {/* Current Plan Badge */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Plan:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-black uppercase">
                  NEXORA {userSubscription.plan.toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Renewal & Access valid through: <strong className="text-white">{userSubscription.activeUntil}</strong>
              </p>
            </div>

            <button
              onClick={() => openPaymentGateway('pro')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span>{userSubscription.plan === 'free' ? 'Upgrade to Pro Gateway' : 'Manage Subscription'}</span>
            </button>
          </div>

          {/* Supported Gateway Integrations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#090C14] border border-[#1E2538] space-y-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> UPI & Instant QR
              </span>
              <p className="text-[11px] text-slate-400">
                GPay, PhonePe, Paytm, CRED with live QR and instant webhook confirmation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C14] border border-[#1E2538] space-y-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Credit & Debit Cards
              </span>
              <p className="text-[11px] text-slate-400">
                Visa, MasterCard, RuPay, Amex with 256-bit AES encryption & tokenization.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090C14] border border-[#1E2538] space-y-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Net Banking (50+ Banks)
              </span>
              <p className="text-[11px] text-slate-400">
                Direct bank checkout for HDFC, ICICI, SBI, Axis, Kotak and corporate accounts.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
