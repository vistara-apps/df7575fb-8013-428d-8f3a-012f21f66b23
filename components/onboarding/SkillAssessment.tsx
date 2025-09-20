'use client';

import { CTAButton } from '@/components/ui/CTAButton';

interface SkillAssessmentProps {
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional' | '';
  onUpdate: (skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional') => void;
}

const skillLevels = [
  {
    id: 'beginner' as const,
    title: 'Beginner',
    description: 'New to nohejbal or playing casually',
    icon: '🌱',
    details: [
      'Learning basic rules and techniques',
      'Playing for fun and fitness',
      'Interested in recreational matches'
    ]
  },
  {
    id: 'intermediate' as const,
    title: 'Intermediate',
    description: 'Have some experience and consistent play',
    icon: '⚡',
    details: [
      'Comfortable with basic techniques',
      'Regular practice and matches',
      'Looking to improve skills'
    ]
  },
  {
    id: 'advanced' as const,
    title: 'Advanced',
    description: 'Strong technical skills and tactical understanding',
    icon: '🔥',
    details: [
      'Advanced serving and spiking',
      'Good court positioning',
      'Competitive tournament experience'
    ]
  },
  {
    id: 'professional' as const,
    title: 'Professional',
    description: 'Elite level player or coach',
    icon: '🏆',
    details: [
      'Professional or semi-professional',
      'Extensive tournament experience',
      'Coaching or training others'
    ]
  }
];

export function SkillAssessment({ skillLevel, onUpdate }: SkillAssessmentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          What's Your Skill Level?
        </h2>
        <p className="text-textSecondary">
          This helps us match you with players at a similar level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillLevels.map((level) => (
          <div
            key={level.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              skillLevel === level.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-600 bg-surface hover:border-primary/50'
            }`}
            onClick={() => onUpdate(level.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{level.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-textPrimary mb-1">
                  {level.title}
                </h3>
                <p className="text-sm text-textSecondary mb-3">
                  {level.description}
                </p>
                <ul className="text-xs text-textSecondary space-y-1">
                  {level.details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-textSecondary rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {skillLevel && (
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">
              {skillLevels.find(l => l.id === skillLevel)?.icon}
            </span>
            <div>
              <p className="font-semibold text-textPrimary">
                Selected: {skillLevels.find(l => l.id === skillLevel)?.title}
              </p>
              <p className="text-sm text-textSecondary">
                You can change this later in your profile settings
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-surface p-4 rounded-lg">
        <h3 className="font-semibold text-textPrimary mb-2">Why This Matters</h3>
        <p className="text-sm text-textSecondary">
          Your skill level helps us recommend suitable opponents and teammates.
          You can always update this information as your skills improve!
        </p>
      </div>
    </div>
  );
}

