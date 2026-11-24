import React, { useState, useEffect, useRef } from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/layout/ToastContainer';
import { GeminiAmbientAurora } from './components/layout/GeminiAmbientAurora';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { ProjectsView } from './components/projects/ProjectsView';
import { TasksView } from './components/tasks/TasksView';
import { TeamView } from './components/team/TeamView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AIAssistantView } from './components/ai/AIAssistantView';
import { SettingsView } from './components/settings/SettingsView';
import { CreateProjectModal } from './components/modals/CreateProjectModal';
import { CreateTaskModal } from './components/modals/CreateTaskModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { TaskDetailModal } from './components/modals/TaskDetailModal';
import { PaymentGatewayModal } from './components/modals/PaymentGatewayModal';

export const AppContent: React.FC = () => {
  const { currentView, showToast } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastToastTimeRef = useRef<number>(0);

  // Anti-Copy & Comprehensive Content Protection Guard
  useEffect(() => {
    const notifyBlocked = () => {
      const now = Date.now();
      if (now - lastToastTimeRef.current > 2500) {
        lastToastTimeRef.current = now;
        showToast({
          title: 'Protected Content',
          description: 'Copying words or text is disabled on this website.',
          type: 'warning'
        });
      }
    };

    // 1. Intercept and block clipboard copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
      notifyBlocked();
    };

    // 2. Intercept and block clipboard cut
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '');
      }
    };

    // 3. Block selection starting on content elements (outside inputs)
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      e.preventDefault();
    };

    // 4. Block drag-to-copy
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    // 5. Intercept right-click context menu outside inputs
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      e.preventDefault();
      notifyBlocked();
    };

    // 6. Intercept keyboard copy shortcuts (Ctrl+C, Cmd+C, Ctrl+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        if (!isInput) {
          e.preventDefault();
          notifyBlocked();
        }
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A') && !isInput) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showToast]);

  // If in landing mode, show the full high-conversion landing page
  if (currentView === 'landing') {
    return (
      <>
        {/* Full-Screen Dynamic Gemini Moving Aurora & 360 Edge Glow */}
        <GeminiAmbientAurora />
        <LandingPage />
        <PaymentGatewayModal />
        <ToastContainer />
      </>
    );
  }

  // Workspace Application Layout
  return (
    <div className="flex min-h-screen bg-[#0A0D14] text-[#F3F5F9] overflow-x-hidden relative">
      {/* Full-Screen Dynamic Gemini Moving Aurora & 360 Perimeter Edge Glow */}
      <GeminiAmbientAurora />

      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        {/* Top Header */}
        <Header onOpenMobileMenu={() => setIsMobileOpen(true)} />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && <MainDashboard />}
          {currentView === 'projects' && <ProjectsView />}
          {currentView === 'tasks' && <TasksView />}
          {currentView === 'team' && <TeamView />}
          {currentView === 'analytics' && <AnalyticsView />}
          {currentView === 'ai' && <AIAssistantView />}
          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <CreateProjectModal />
      <CreateTaskModal />
      <ProjectDetailModal />
      <TaskDetailModal />
      <CommandPalette />
      <PaymentGatewayModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
