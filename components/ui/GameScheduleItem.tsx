import { Game, Team } from '@/lib/types';
import { formatDateTime, formatDate, formatTime } from '@/lib/utils';
import { GAME_STATUSES } from '@/lib/constants';

interface GameScheduleItemProps {
  game: Game;
  teams: Team[];
  variant?: 'upcoming' | 'completed';
  className?: string;
}

export function GameScheduleItem({ 
  game, 
  teams, 
  variant = 'upcoming',
  className = '' 
}: GameScheduleItemProps) {
  const team1 = teams.find(t => t.teamId === game.team1Id);
  const team2 = teams.find(t => t.teamId === game.team2Id);
  
  const statusConfig = GAME_STATUSES.find(s => s.value === game.status);

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${statusConfig?.color || 'text-textSecondary'}`}>
            {statusConfig?.label || game.status}
          </span>
          {game.status === 'in-progress' && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
        </div>
        <div className="text-sm text-textSecondary">
          {formatDate(game.dateTime)}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        {/* Team 1 */}
        <div className="flex items-center space-x-3 flex-1">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: team1?.jerseyColor || '#4F46E5' }}
          >
            <span className="text-white font-bold text-sm">
              {team1?.teamName.split(' ').map(word => word.charAt(0)).join('') || 'T1'}
            </span>
          </div>
          <div>
            <p className="font-semibold text-textPrimary">
              {team1?.teamName || 'Team 1'}
            </p>
          </div>
        </div>

        {/* Score or VS */}
        <div className="px-4">
          {variant === 'completed' && game.scoreTeam1 !== undefined && game.scoreTeam2 !== undefined ? (
            <div className="text-center">
              <div className="text-2xl font-bold text-textPrimary">
                {game.scoreTeam1} - {game.scoreTeam2}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-lg font-semibold text-textSecondary">VS</div>
              <div className="text-sm text-textSecondary">
                {formatTime(game.dateTime)}
              </div>
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <div>
            <p className="font-semibold text-textPrimary text-right">
              {team2?.teamName || 'Team 2'}
            </p>
          </div>
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: team2?.jerseyColor || '#059669' }}
          >
            <span className="text-white font-bold text-sm">
              {team2?.teamName.split(' ').map(word => word.charAt(0)).join('') || 'T2'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-textSecondary">
        <div className="flex items-center space-x-1">
          <span>📍</span>
          <span>{game.location}</span>
        </div>
        {variant === 'upcoming' && (
          <button className="text-primary hover:text-opacity-80 font-medium">
            Join Game
          </button>
        )}
      </div>
    </div>
  );
}
