'use client';

import { StatDisplay } from '@/components/ui/StatDisplay';
import { GameScheduleItem } from '@/components/ui/GameScheduleItem';
import { MOCK_TEAMS, MOCK_GAMES } from '@/lib/constants';

export function TeamPerformance() {
  const team = MOCK_TEAMS[0]; // Prague Panthers
  const teamGames = MOCK_GAMES.filter(
    game => game.team1Id === team.teamId || game.team2Id === team.teamId
  );

  const completedGames = teamGames.filter(game => game.status === 'completed');
  const wins = completedGames.filter(game => {
    if (game.team1Id === team.teamId) {
      return (game.scoreTeam1 || 0) > (game.scoreTeam2 || 0);
    }
    return (game.scoreTeam2 || 0) > (game.scoreTeam1 || 0);
  }).length;

  const stats = [
    {
      label: 'Games Played',
      value: completedGames.length,
      change: { value: 15, type: 'increase' as const }
    },
    {
      label: 'Wins',
      value: wins,
      change: { value: 8, type: 'increase' as const }
    },
    {
      label: 'Win Rate',
      value: completedGames.length > 0 ? `${Math.round((wins / completedGames.length) * 100)}%` : '0%',
      change: { value: 12, type: 'increase' as const }
    },
    {
      label: 'Team Rating',
      value: '1,847',
      change: { value: 5, type: 'increase' as const }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: team.jerseyColor }}
          >
            <span className="text-white font-bold text-xl">
              {team.teamName.split(' ').map(word => word.charAt(0)).join('')}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-textPrimary">{team.teamName}</h2>
            <p className="text-textSecondary">{team.description}</p>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatDisplay
            key={index}
            variant="single"
            stats={[stat]}
          />
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Performance Trend</h3>
        <div className="h-48 bg-surface rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-textSecondary">Performance chart coming soon</p>
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-textPrimary">Recent Games</h3>
        {teamGames.map((game) => (
          <GameScheduleItem
            key={game.gameId}
            game={game}
            teams={MOCK_TEAMS}
            variant={game.status === 'completed' ? 'completed' : 'upcoming'}
          />
        ))}
      </div>
    </div>
  );
}
