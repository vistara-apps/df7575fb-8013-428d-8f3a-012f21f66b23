'use client';

import { useState } from 'react';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { CTAButton } from '@/components/ui/CTAButton';
import { MOCK_USERS, SKILL_LEVELS } from '@/lib/constants';

export function PlayerMatchmaking() {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const filteredUsers = MOCK_USERS.filter(user => {
    if (selectedSkillLevel && user.skillLevel !== selectedSkillLevel) return false;
    if (selectedLocation && !user.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-textPrimary mb-4">Find Players</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Skill Level
            </label>
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value)}
              className="w-full bg-surface text-textPrimary border border-white border-opacity-10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Levels</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Location
            </label>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Enter city or region"
              className="w-full bg-surface text-textPrimary border border-white border-opacity-10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-textSecondary"
            />
          </div>
        </div>

        <CTAButton variant="primary" className="w-full mb-4">
          🔍 Search Players
        </CTAButton>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-textPrimary">
          Available Players ({filteredUsers.length})
        </h3>
        
        {filteredUsers.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-textSecondary">
              No players found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <ProfileCard
                key={user.userId}
                variant="player"
                data={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
