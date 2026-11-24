import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, Task, TeamMember, Activity, NotificationItem, 
  UserSettings, AIMessage, ViewMode, TaskStatus, Priority, ProjectCategory 
} from '../types';
import { 
  initialProjects, initialTasks, initialTeamMembers, 
  initialActivities, initialNotifications, initialUserSettings, 
  initialAIMessages 
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  activities: Activity[];
  notifications: NotificationItem[];
  userSettings: UserSettings;
  aiMessages: AIMessage[];
  isAiLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  
  // Modals & Panels
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
  isCreateTaskOpen: boolean;
  setIsCreateTaskOpen: (open: boolean) => void;
  selectedProjectForDetail: Project | null;
  setSelectedProjectForDetail: (p: Project | null) => void;
  selectedTaskForDetail: Task | null;
  setSelectedTaskForDetail: (t: Task | null) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  selectedPlanForPayment: 'pro' | 'enterprise';
  setSelectedPlanForPayment: (plan: 'pro' | 'enterprise') => void;
  userSubscription: {
    plan: 'free' | 'pro' | 'enterprise';
    activeUntil: string;
    lastTransactionId?: string;
  };
  setUserSubscription: React.Dispatch<React.SetStateAction<{
    plan: 'free' | 'pro' | 'enterprise';
    activeUntil: string;
    lastTransactionId?: string;
  }>>;
  openPaymentGateway: (plan?: 'pro' | 'enterprise') => void;

  // Project Actions
  addProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Task Actions
  addTask: (data: Partial<Task>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  toggleChecklist: (taskId: string, checklistId: string) => void;

  // Team Actions
  inviteMember: (data: Partial<TeamMember>) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // User & Settings
  updateUserSettings: (updates: Partial<UserSettings>) => void;
  resetToDemoData: () => void;

  // AI
  sendAIMessage: (text: string) => Promise<void>;
  applyAIAction: (action: any) => void;

  // Toasts
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    return (localStorage.getItem('nexora_view') as ViewMode) || 'landing';
  });

  // State with LocalStorage persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('nexora_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('nexora_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('nexora_team');
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('nexora_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('nexora_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('nexora_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, theme: 'dark' };
      } catch (_) {}
    }
    return { ...initialUserSettings, theme: 'dark' };
  });

  const [aiMessages, setAiMessages] = useState<AIMessage[]>(() => {
    const saved = localStorage.getItem('nexora_ai_messages');
    return saved ? JSON.parse(saved) : initialAIMessages;
  });

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<Project | null>(null);
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<'pro' | 'enterprise'>('pro');
  const [userSubscription, setUserSubscription] = useState<{
    plan: 'free' | 'pro' | 'enterprise';
    activeUntil: string;
    lastTransactionId?: string;
  }>(() => {
    const saved = localStorage.getItem('nexora_subscription');
    return saved ? JSON.parse(saved) : { plan: 'free', activeUntil: '2026-12-31' };
  });

  const openPaymentGateway = (plan: 'pro' | 'enterprise' = 'pro') => {
    setSelectedPlanForPayment(plan);
    setIsPaymentModalOpen(true);
  };

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nexora_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('nexora_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nexora_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('nexora_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('nexora_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('nexora_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    // Permanently enforce dark mode on initial mount
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('nexora_settings', JSON.stringify({ ...userSettings, theme: 'dark' }));
    // Permanently enforce dark mode
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
  }, [userSettings]);

  useEffect(() => {
    localStorage.setItem('nexora_ai_messages', JSON.stringify(aiMessages));
  }, [aiMessages]);

  // Global Keyboard shortcut for Command Palette (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to add activity
  const recordActivity = (action: string, targetType: 'project' | 'task' | 'team' | 'ai', targetName: string, details?: string) => {
    const newAct: Activity = {
      id: 'act-' + Date.now(),
      userId: 'user-1',
      userName: userSettings.name,
      userAvatar: userSettings.avatar,
      action,
      targetType,
      targetName,
      timestamp: 'Just now',
      details,
    };
    setActivities(prev => [newAct, ...prev.slice(0, 24)]);
  };

  // Project Actions
  const addProject = (data: Partial<Project>): Project => {
    const count = projects.length + 1;
    const name = data.name || 'Untitled Project ' + count;
    const key = (data.key || name.substring(0, 4).toUpperCase()).replace(/[^A-Z0-9]/g, '');
    const newProject: Project = {
      id: 'proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name,
      key: key || 'PRJ' + count,
      description: data.description || 'Project managed with Nexora intelligent workspace.',
      category: (data.category as ProjectCategory) || 'Engineering',
      status: data.status || 'planning',
      priority: data.priority || 'medium',
      progress: data.progress || 0,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      dueDate: data.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      teamMemberIds: data.teamMemberIds && data.teamMemberIds.length > 0 ? data.teamMemberIds : ['user-1'],
      budget: data.budget || 20000,
      spent: data.spent || 0,
      color: data.color || '#8B5CF6',
      coverGradient: data.coverGradient || 'from-purple-900/40 via-indigo-950/40 to-slate-900',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProjects(prev => [newProject, ...prev]);
    recordActivity('created project', 'project', newProject.name, `Initialized in ${newProject.category} with ${newProject.priority} priority.`);
    showToast({
      title: 'Project Created',
      description: `"${newProject.name}" was successfully created.`,
      type: 'success',
    });
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        recordActivity('updated project', 'project', updated.name, 'Project settings modified.');
        return updated;
      }
      return p;
    }));
    showToast({
      title: 'Project Updated',
      type: 'info',
    });
  };

  const deleteProject = (id: string) => {
    const proj = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    setTasks(prev => prev.filter(t => t.projectId !== id));
    if (selectedProjectForDetail?.id === id) {
      setSelectedProjectForDetail(null);
    }
    if (proj) {
      recordActivity('deleted project', 'project', proj.name, 'Project and its associated tasks were removed.');
      showToast({
        title: 'Project Deleted',
        description: `"${proj.name}" was removed.`,
        type: 'warning',
      });
    }
  };

  // Task Actions
  const addTask = (data: Partial<Task>): Task => {
    const newTask: Task = {
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      projectId: data.projectId || (projects[0]?.id || 'proj-1'),
      title: data.title || 'New Task',
      description: data.description || 'Task description pending refinement.',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      assigneeId: data.assigneeId || 'user-1',
      dueDate: data.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      tags: data.tags || ['Feature'],
      estimatedHours: data.estimatedHours || 6,
      actualHours: data.actualHours || 0,
      order: tasks.filter(t => t.status === (data.status || 'todo')).length + 1,
      checklist: data.checklist || [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks(prev => [newTask, ...prev]);
    const proj = projects.find(p => p.id === newTask.projectId);
    recordActivity('added task', 'task', newTask.title, `Added to ${proj ? proj.name : 'workspace'}`);
    showToast({
      title: 'Task Created',
      description: `"${newTask.title}" added to board.`,
      type: 'success',
    });
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, ...updates };
      }
      return t;
    }));
    if (selectedTaskForDetail?.id === id) {
      setSelectedTaskForDetail(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteTask = (id: string) => {
    const t = tasks.find(task => task.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    if (selectedTaskForDetail?.id === id) {
      setSelectedTaskForDetail(null);
    }
    if (t) {
      recordActivity('deleted task', 'task', t.title);
      showToast({
        title: 'Task Deleted',
        description: `"${t.title}" was removed.`,
        type: 'info',
      });
    }
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => {
      return prev.map(t => {
        if (t.id === taskId) {
          const oldStatus = t.status;
          if (oldStatus !== newStatus) {
            recordActivity(`moved task to ${newStatus}`, 'task', t.title);
            if (newStatus === 'completed') {
              try {
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.8 },
                  colors: ['#8B5CF6', '#3B82F6', '#10B981'],
                });
              } catch (_) {}
              showToast({
                title: 'Task Completed! 🎉',
                description: `"${t.title}" is done!`,
                type: 'success',
              });
            }
          }
          return { ...t, status: newStatus };
        }
        return t;
      });
    });
  };

  const toggleChecklist = (taskId: string, checklistId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updatedChecklist = t.checklist.map(item => {
          if (item.id === checklistId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
        return { ...t, checklist: updatedChecklist };
      }
      return t;
    }));
  };

  // Team
  const inviteMember = (data: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: 'user-' + Date.now(),
      name: data.name || 'New Teammate',
      role: data.role || 'Contributor',
      email: data.email || 'teammate@nexora.io',
      avatar: data.avatar || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?w=150&auto=format&fit=crop&q=80`,
      department: data.department || 'Engineering',
      status: 'active',
      productivityScore: 92,
      tasksCompleted: 0,
      tasksActive: 0,
      skills: data.skills || ['Collaboration', 'Agile'],
      joinedDate: 'Just now',
    };
    setTeamMembers(prev => [...prev, newMember]);
    recordActivity('invited team member', 'team', newMember.name, `Joined ${newMember.department} as ${newMember.role}.`);
    showToast({
      title: 'Member Invited',
      description: `${newMember.name} has been added to the workspace.`,
      type: 'success',
    });
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast({
      title: 'Notifications Cleared',
      description: 'All notifications marked as read.',
      type: 'info',
    });
  };

  // User Settings
  const updateUserSettings = (updates: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...updates, theme: 'dark' }));
    showToast({
      title: 'Settings Saved',
      description: 'Preferences updated successfully.',
      type: 'success',
    });
  };

  const resetToDemoData = () => {
    setProjects(initialProjects);
    setTasks(initialTasks);
    setTeamMembers(initialTeamMembers);
    setActivities(initialActivities);
    setNotifications(initialNotifications);
    setUserSettings(initialUserSettings);
    setAiMessages(initialAIMessages);
    localStorage.clear();
    showToast({
      title: 'Workspace Reset',
      description: 'Demo data has been cleanly restored.',
      type: 'info',
    });
  };

  // AI Assistant logic (Demo intelligent simulator or Real API if key provided)
  const sendAIMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: 'Just now',
    };

    setAiMessages(prev => [...prev, userMsg]);
    setIsAiLoading(true);

    try {
      // Check if user has an API Key configured
      if (userSettings.apiKey && userSettings.apiKey.trim().length > 5) {
        // Real API call attempt
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${userSettings.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ 
                  text: `You are Nexora Copilot, a high-level SaaS project management AI. Context: The user has ${projects.length} active projects and ${tasks.length} tasks. User question: ${text}. Provide concise, structured, actionable advice with bullet points.` 
                }]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I've processed your request.";
          
          const assistantMsg: AIMessage = {
            id: 'msg-' + (Date.now() + 1),
            role: 'assistant',
            content: replyText,
            timestamp: 'Just now',
          };
          setAiMessages(prev => [...prev, assistantMsg]);
          setIsAiLoading(false);
          return;
        }
      }

      // Demo Mode Intelligent Simulation with dynamic context
      await new Promise(r => setTimeout(r, 1200));

      let simulatedReply = '';
      let suggestedActions: AIMessage['suggestedActions'] = undefined;

      const lower = text.toLowerCase();

      if (lower.includes('project') || lower.includes('idea') || lower.includes('create')) {
        simulatedReply = `### 💡 Proposed Project: **Autonomous Customer Retention Radar**
Based on your workspace's current focus on **PLG and AI Copilot**, here is a recommended high-impact initiative:

* **Category:** Product & Growth
* **Estimated Timeline:** 6 Weeks
* **Expected Impact:** +24% retention via early churn signal detection
* **Key Architecture:** Clickstream event streaming, LLM sentiment classifier, and automated Slack alert webhook.

Would you like me to instantly initialize this project in your workspace?`;
        suggestedActions = [
          {
            type: 'create_project',
            label: '➕ Create "Customer Retention Radar"',
            payload: {
              name: 'Customer Retention Radar',
              category: 'Product',
              priority: 'high',
              description: 'Autonomous analytics engine to identify early churn signals and dispatch automated interventions.',
            }
          }
        ];
      } else if (lower.includes('task') || lower.includes('break') || lower.includes('sprint')) {
        simulatedReply = `### 📋 Sprint Task Decomposition
Here is the recommended task breakdown for your upcoming sprint:

1. **[High] Architecture Design & DB Schema** (8h) — Define Postgres partitioning and index strategies.
2. **[Medium] Frontend Dashboard Glassmorphism UI** (12h) — Implement fluid responsive widgets and chart cards.
3. **[Urgent] End-to-End Test Suite & CI/CD Gate** (6h) — Verify 99% test pass rate before staging deployment.
4. **[Low] User Documentation & Release Notes** (4h) — Draft interactive walkthrough guide.

I can push these directly onto your Kanban board.`;
        suggestedActions = [
          {
            type: 'create_tasks',
            label: '⚡ Add These 4 Tasks to Kanban Board',
            payload: {
              projectId: projects[0]?.id || 'proj-1',
              tasks: [
                { title: 'Architecture Design & DB Schema', priority: 'high', estimatedHours: 8 },
                { title: 'Frontend Dashboard Glassmorphism UI', priority: 'medium', estimatedHours: 12 },
                { title: 'End-to-End Test Suite & CI/CD Gate', priority: 'urgent', estimatedHours: 6 },
                { title: 'User Documentation & Release Notes', priority: 'low', estimatedHours: 4 }
              ]
            }
          }
        ];
      } else if (lower.includes('productivity') || lower.includes('analytic') || lower.includes('summary')) {
        simulatedReply = `### 📈 Workspace Performance Analysis
* **Current Sprint Velocity:** **98% efficiency** (Top 5% among engineering teams).
* **Completed Tasks:** **${tasks.filter(t => t.status === 'completed').length}** out of ${tasks.length} total.
* **Top Performing Contributor:** **Alex Vance** (42 completed tasks, 98% quality rating).
* **Recommendations:** Consider reallocating 2 tasks from Marcus Chen to David Kim to balance workload evenly before the sprint cutoff.`;
        suggestedActions = [
          {
            type: 'view_analytics',
            label: '📊 Open Detailed Analytics View'
          }
        ];
      } else {
        simulatedReply = `I've analyzed your request regarding: "${text}".

Here are recommended next steps:
* **Review Active Deadlines:** You have **${tasks.filter(t => t.status === 'in_progress').length} tasks in progress** across ${projects.length} projects.
* **Collaboration Opportunity:** Elena Rostova recently submitted the Design System PR for review.
* **Action:** Would you like me to generate sprint planning items or schedule a project milestone?`;
      }

      const assistantMsg: AIMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: simulatedReply,
        timestamp: 'Just now',
        suggestedActions,
      };

      setAiMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: AIMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: "I'm ready to assist with project planning, task decomposition, and productivity insights. Try asking to generate a project idea or break down a sprint!",
        timestamp: 'Just now',
      };
      setAiMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const applyAIAction = (action: any) => {
    if (!action) return;
    if (action.type === 'create_project') {
      const p = addProject(action.payload);
      setCurrentView('projects');
      showToast({
        title: 'Project Initialized by AI',
        description: `Created "${p.name}".`,
        type: 'success',
      });
    } else if (action.type === 'create_tasks') {
      const payload = action.payload;
      const targetProjId = payload.projectId || projects[0]?.id || 'proj-1';
      payload.tasks.forEach((t: any) => {
        addTask({
          projectId: targetProjId,
          title: t.title,
          priority: t.priority || 'medium',
          estimatedHours: t.estimatedHours || 6,
          status: 'todo',
        });
      });
      setCurrentView('tasks');
      showToast({
        title: 'Tasks Generated',
        description: `Added ${payload.tasks.length} tasks to your board.`,
        type: 'success',
      });
    } else if (action.type === 'view_analytics') {
      setCurrentView('analytics');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        projects,
        tasks,
        teamMembers,
        activities,
        notifications,
        userSettings,
        aiMessages,
        isAiLoading,
        searchQuery,
        setSearchQuery,
        activeProjectId,
        setActiveProjectId,

        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isCreateProjectOpen,
        setIsCreateProjectOpen,
        isCreateTaskOpen,
        setIsCreateTaskOpen,
        selectedProjectForDetail,
        setSelectedProjectForDetail,
        selectedTaskForDetail,
        setSelectedTaskForDetail,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedPlanForPayment,
        setSelectedPlanForPayment,
        userSubscription,
        setUserSubscription,
        openPaymentGateway,

        addProject,
        updateProject,
        deleteProject,

        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleChecklist,

        inviteMember,

        markNotificationAsRead,
        markAllNotificationsAsRead,

        updateUserSettings,
        resetToDemoData,

        sendAIMessage,
        applyAIAction,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
