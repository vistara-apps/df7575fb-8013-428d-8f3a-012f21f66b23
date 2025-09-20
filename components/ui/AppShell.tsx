'use client';

import { useState } from 'react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'games', label: 'Games', icon: '🏐' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const shellClasses = variant === 'glass' 
    ? 'glass rounded-lg' 
    : 'bg-surface';

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className={`${shellClasses} border-b border-white border-opacity-10`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <h1 className="text-xl font-bold text-textPrimary">Nohejbal Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
                <span className="text-lg">🔔</span>
              </button>
              <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-around py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary bg-primary bg-opacity-10'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-white hover:bg-opacity-5'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
