'use client';

import { useState } from 'react';
import { ProfileSetup } from './ProfileSetup';
import { SkillAssessment } from './SkillAssessment';
import { WelcomeScreen } from './WelcomeScreen';
import { CTAButton } from '@/components/ui/CTAButton';

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'profile' | 'skills' | 'complete';

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    location: '',
    skillLevel: '' as 'beginner' | 'intermediate' | 'advanced' | 'professional',
  });

  const handleNext = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('profile');
        break;
      case 'profile':
        setCurrentStep('skills');
        break;
      case 'skills':
        setCurrentStep('complete');
        // Here you would typically save the user data to your backend
        handleComplete();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'profile':
        setCurrentStep('welcome');
        break;
      case 'skills':
        setCurrentStep('profile');
        break;
    }
  };

  const handleComplete = () => {
    // Save user data (in a real app, this would call an API)
    console.log('Saving user data:', userData);
    onComplete();
  };

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'profile':
        return (
          <ProfileSetup
            userData={userData}
            onUpdate={updateUserData}
          />
        );
      case 'skills':
        return (
          <SkillAssessment
            skillLevel={userData.skillLevel}
            onUpdate={(skillLevel) => updateUserData({ skillLevel })}
          />
        );
      case 'complete':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-textPrimary mb-4">
              You're all set!
            </h2>
            <p className="text-textSecondary">
              Welcome to the Nohejbal Hub community. Let's start connecting with other players!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'welcome': return 25;
      case 'profile': return 50;
      case 'skills': return 75;
      case 'complete': return 100;
      default: return 0;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'profile':
        return userData.username && userData.location;
      case 'skills':
        return userData.skillLevel;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full bg-surface rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${getStepProgress()}%` }}
        ></div>
      </div>

      {/* Step Content */}
      <div className="card">
        {renderStep()}
      </div>

      {/* Navigation */}
      {currentStep !== 'complete' && (
        <div className="flex justify-between">
          {currentStep !== 'welcome' ? (
            <CTAButton variant="outline" onClick={handleBack}>
              Back
            </CTAButton>
          ) : (
            <div></div>
          )}

          <CTAButton
            variant="primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 'skills' ? 'Complete Setup' : 'Next'}
          </CTAButton>
        </div>
      )}
    </div>
  );
}

