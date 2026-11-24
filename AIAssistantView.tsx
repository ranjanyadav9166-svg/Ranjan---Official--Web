import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  Zap, 
  Layers, 
  CheckSquare, 
  BarChart3, 
  Lightbulb, 
  Key, 
  ArrowRight,
  Flame
} from 'lucide-react';

export const AIAssistantView: React.FC = () => {
  const { 
    aiMessages, 
    sendAIMessage, 
    applyAIAction, 
    isAiLoading, 
    userSettings, 
    setCurrentView,
    projects
  } = useApp();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasApiKey = Boolean(userSettings.apiKey && userSettings.apiKey.trim().length > 5);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isAiLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiLoading) return;
    const text = input;
    setInput('');
    await sendAIMessage(text);
  };

  const promptStarters = [
    {
      label: 'Generate project ideas',
      icon: Lightbulb,
      prompt: 'Suggest 3 high-impact project ideas for an AI-powered SaaS product with architecture scope.'
    },
    {
      label: 'Break project into tasks',
      icon: CheckSquare,
      prompt: `Decompose the project "${projects[0]?.name || 'Autonomous Cloud Engine'}" into 4 sprint tasks with time estimates.`
    },
    {
      label: 'Draft task description',
      icon: Zap,
      prompt: 'Draft an engineering task specification for implementing a streaming WebSocket event bus.'
    },
    {
      label: 'Create project plan',
      icon: Layers,
      prompt: 'Create a 6-week architecture and execution roadmap for scaling multi-tenant database clusters.'
    },
    {
      label: 'Summarize progress',
      icon: BarChart3,
      prompt: 'Summarize the current sprint progress, completed milestones, and potential delivery bottlenecks.'
    },
    {
      label: 'Productivity recommendations',
      icon: Flame,
      prompt: 'Analyze current sprint velocity and recommend 3 tactical workflow improvements to boost output.'
    }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-4 max-w-5xl mx-auto h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Copilot Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-[#10141E] border border-slate-200/80 dark:border-[#1E2538] shadow-xs flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-md shadow-purple-600/20">
            <div className="w-full h-full bg-white dark:bg-[#0B0E17] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Nexora Copilot AI</span>
              {hasApiKey ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live API Connected ({userSettings.aiModel || 'Gemini'})
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 flex items-center gap-1">
                  <Bot className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  Workspace Copilot Agent
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous sprint planning, task decomposition, and productivity suggestions.
            </p>
          </div>
        </div>

        {!hasApiKey && (
          <button
            onClick={() => setCurrentView('settings')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Add Custom API Key</span>
          </button>
        )}
      </div>

      {/* Quick Prompt Starters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0">
        {promptStarters.map((starter, i) => {
          const Icon = starter.icon;
          return (
            <button
              key={i}
              onClick={() => sendAIMessage(starter.prompt)}
              disabled={isAiLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#10141E] hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-200/80 dark:border-[#1E2538] hover:border-purple-300 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white whitespace-nowrap transition-all shadow-xs flex-shrink-0 disabled:opacity-50"
            >
              <Icon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{starter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 lg:p-6 rounded-3xl bg-white dark:bg-[#10141E]/80 border border-slate-200/80 dark:border-[#1E2538] shadow-xs">
        {aiMessages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`flex items-start gap-3.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mt-0.5">
              {msg.role === 'user' ? (
                <img
                  src={userSettings.avatar}
                  alt={userSettings.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-purple-500/40"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/20">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-50 dark:bg-[#0A0D14] border border-slate-200/80 dark:border-[#1E2538] text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                {msg.content}
              </div>

              {/* Suggested Action Buttons if Assistant Response */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1E2538] space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Workspace Actions (1-Click Execution)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => applyAIAction(act)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-600/25 hover:bg-purple-100 dark:hover:bg-purple-600/40 border border-purple-200 dark:border-purple-500/40 text-purple-700 dark:text-purple-200 text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <span className={`block text-[10px] mt-2 ${
                msg.role === 'user' ? 'text-purple-200' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isAiLoading && (
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="rounded-2xl p-4 bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-[#1E2538] text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              <span>Nexora Copilot is decomposing your request and evaluating workspace signals...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Input Form */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 relative">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Nexora Copilot: 'Decompose mobile app sprint', 'Create 6-week roadmap'..."
          disabled={isAiLoading}
          className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-white dark:bg-[#10141E] border border-slate-200 dark:border-[#1E2538] text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-md"
        />
        <button
          type="submit"
          disabled={!input.trim() || isAiLoading}
          className="absolute right-2 top-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
