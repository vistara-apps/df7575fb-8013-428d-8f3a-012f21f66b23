interface StatItem {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
}

interface StatDisplayProps {
  variant?: 'single' | 'grouped';
  stats: StatItem[];
  className?: string;
}

export function StatDisplay({ variant = 'single', stats, className = '' }: StatDisplayProps) {
  if (variant === 'single' && stats.length > 0) {
    const stat = stats[0];
    return (
      <div className={`card text-center ${className}`}>
        <div className="text-3xl font-bold text-textPrimary mb-2">
          {stat.value}
        </div>
        <div className="text-sm text-textSecondary mb-2">
          {stat.label}
        </div>
        {stat.change && (
          <div className={`text-xs font-medium ${
            stat.change.type === 'increase' ? 'text-green-400' : 'text-red-400'
          }`}>
            {stat.change.type === 'increase' ? '↗️' : '↘️'} {Math.abs(stat.change.value)}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-textPrimary mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-textSecondary mb-1">
              {stat.label}
            </div>
            {stat.change && (
              <div className={`text-xs font-medium ${
                stat.change.type === 'increase' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change.type === 'increase' ? '↗️' : '↘️'} {Math.abs(stat.change.value)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
