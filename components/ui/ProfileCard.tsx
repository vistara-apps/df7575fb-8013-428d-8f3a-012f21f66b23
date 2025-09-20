import { User, Team } from '@/lib/types';
import { getSkillLevelColor } from '@/lib/utils';

interface ProfileCardProps {
  variant: 'player' | 'team';
  data: User | Team;
  className?: string;
}

export function ProfileCard({ variant, data, className = '' }: ProfileCardProps) {
  if (variant === 'player') {
    const user = data as User;
    return (
      <div className={`card hover:shadow-lg transition-shadow duration-200 ${className}`}>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-lg">
                {user.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-textPrimary truncate">
              {user.username}
            </h3>
            <p className={`text-sm font-medium ${getSkillLevelColor(user.skillLevel)}`}>
              {user.skillLevel.charAt(0).toUpperCase() + user.skillLevel.slice(1)}
            </p>
            <p className="text-sm text-textSecondary mt-1">📍 {user.location}</p>
            {user.bio && (
              <p className="text-sm text-textSecondary mt-2 line-clamp-2">
                {user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="btn-primary flex-1 text-sm py-2">
            Connect
          </button>
          <button className="btn-outline flex-1 text-sm py-2">
            Message
          </button>
        </div>
      </div>
    );
  }

  const team = data as Team;
  return (
    <div className={`card hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex items-start space-x-4">
        <div 
          className="w-16 h-16 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: team.jerseyColor }}
        >
          <span className="text-white font-bold text-lg">
            {team.teamName.split(' ').map(word => word.charAt(0)).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-textPrimary">
            {team.teamName}
          </h3>
          <p className="text-sm text-textSecondary">
            👥 {team.members.length} member{team.members.length !== 1 ? 's' : ''}
          </p>
          {team.description && (
            <p className="text-sm text-textSecondary mt-2">
              {team.description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="btn-primary flex-1 text-sm py-2">
          Join Team
        </button>
        <button className="btn-outline flex-1 text-sm py-2">
          View Details
        </button>
      </div>
    </div>
  );
}
