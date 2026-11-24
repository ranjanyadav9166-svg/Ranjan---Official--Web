export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export type ProjectCategory = 'Engineering' | 'Product' | 'Marketing' | 'Design' | 'Operations' | 'Research';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  dueDate: string;
  tags: string[];
  estimatedHours: number;
  actualHours: number;
  order: number;
  checklist: ChecklistItem[];
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  startDate: string;
  dueDate: string;
  teamMemberIds: string[];
  budget: number;
  spent: number;
  color: string;
  coverGradient: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
  status: 'active' | 'busy' | 'away' | 'offline';
  productivityScore: number;
  tasksCompleted: number;
  tasksActive: number;
  skills: string[];
  joinedDate: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  targetType: 'project' | 'task' | 'team' | 'ai';
  targetName: string;
  timestamp: string;
  details?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'project' | 'mention' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface UserSettings {
  name: string;
  email: string;
  title: string;
  avatar: string;
  bio: string;
  department: string;
  theme: 'dark' | 'light' | 'system';
  emailNotifications: boolean;
  desktopNotifications: boolean;
  weeklyDigest: boolean;
  soundEffects: boolean;
  compactMode: boolean;
  apiKey: string;
  aiModel: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: {
    type: 'create_project' | 'create_tasks' | 'view_analytics';
    label: string;
    payload?: any;
  }[];
}

export type ViewMode = 'landing' | 'dashboard' | 'projects' | 'tasks' | 'team' | 'analytics' | 'ai' | 'settings';
