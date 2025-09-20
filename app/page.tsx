'use client';

import { useState } from 'react';
import { AppShell } from '@/components/ui/AppShell';
import { PlayerMatchmaking } from '@/components/features/PlayerMatchmaking';
import { TeamPerformance } from '@/components/features/TeamPerformance';
import { FanContentHub } from '@/components/features/FanContentHub';
import { SponsorVisibility } from '@/components/features/SponsorVisibility';
import { CTAButton } from '@/components/ui/CTAButton';
import { StatDisplay } from '@/components/ui/StatDisplay';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');

  const quickStats = [
    { label: 'Active Players', value: '2,847', change: { value: 12, type: 'increase' as const } },
    { label: 'Games This Week', value: '156', change: { value: 8, type: 'increase' as const } },
    { label: 'Teams Registered', value: '342', change: { value: 15, type: 'increase' as const } },
    { label: 'Community Posts', value: '1,293', change: { value: 23, type: 'increase' as const } },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'matchmaking':
        return <PlayerMatchmaking />;
      case 'performance':
        return <TeamPerformance />;
      case 'community':
        return <FanContentHub />;
      case 'sponsors':
        return <SponsorVisibility />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="card glass text-center">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-textPrimary mb-2">
                  Welcome to Nohejbal Hub
                </h1>
                <p className="text-xl text-textSecondary">
                  Connect, Compete, and Conquer the Nohejbal World
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton 
                  variant="primary" 
                  size="lg"
                  onClick={() => setActiveSection('matchmaking')}
                >
                  🏐 Find Players
                </CTAButton>
                <CTAButton 
                  variant="outline" 
                  size="lg"
                  onClick={() => setActiveSection('community')}
                >
                  👥 Join Community
                </CTAButton>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <StatDisplay
                  key={index}
                  variant="single"
                  stats={[stat]}
                />
              ))}
            </div>

            {/* Feature Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => setActiveSection('matchmaking')}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Player Matchmaking
                  </h3>
                  <p className="text-textSecondary mb-4">
                    Find players and teams for your next nohejbal match based on skill level and location.
                  </p>
                  <CTAButton variant="outline" className="w-full">
                    Explore Matchmaking
                  </CTAButton>
                </div>
              </div>

              <div 
                className="card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => setActiveSection('performance')}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Team Performance
                  </h3>
                  <p className="text-textSecondary mb-4">
                    Track your team's progress with detailed statistics and performance analytics.
                  </p>
                  <CTAButton variant="outline" className="w-full">
                    View Analytics
                  </CTAButton>
                </div>
              </div>

              <div 
                className="card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => setActiveSection('community')}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Fan Content Hub
                  </h3>
                  <p className="text-textSecondary mb-4">
                    Share photos, videos, and stories with the nohejbal community.
                  </p>
                  <CTAButton variant="outline" className="w-full">
                    Join Community
                  </CTAButton>
                </div>
              </div>

              <div 
                className="card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => setActiveSection('sponsors')}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    Sponsor Portal
                  </h3>
                  <p className="text-textSecondary mb-4">
                    Discover sponsors and partners supporting the nohejbal community.
                  </p>
                  <CTAButton variant="outline" className="w-full">
                    View Sponsors
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏐</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-textPrimary text-sm">
                      <strong>Prague Panthers</strong> won against Brno Bears 21-18
                    </p>
                    <p className="text-textSecondary text-xs">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-textPrimary text-sm">
                      <strong>alex_player</strong> joined the community
                    </p>
                    <p className="text-textSecondary text-xs">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📷</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-textPrimary text-sm">
                      <strong>sarah_champion</strong> shared a training video
                    </p>
                    <p className="text-textSecondary text-xs">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AppShell variant="glass">
      {/* Section Navigation */}
      {activeSection !== 'overview' && (
        <div className="mb-6">
          <button
            onClick={() => setActiveSection('overview')}
            className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary transition-colors duration-200"
          >
            <span>←</span>
            <span>Back to Overview</span>
          </button>
        </div>
      )}

      {renderContent()}
    </AppShell>
  );
}
