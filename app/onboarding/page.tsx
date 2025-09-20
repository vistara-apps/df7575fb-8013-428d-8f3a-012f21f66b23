'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { AppShell } from '@/components/ui/AppShell';

export default function OnboardingPage() {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  const handleOnboardingComplete = () => {
    setIsComplete(true);
    // Redirect to main app after a short delay
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  if (isComplete) {
    return (
      <AppShell variant="glass">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-textPrimary mb-4">
              Welcome to Nohejbal Hub!
            </h1>
            <p className="text-textSecondary">
              Your profile has been set up successfully. Redirecting to the main app...
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell variant="glass">
      <div className="max-w-2xl mx-auto">
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </div>
    </AppShell>
  );
}

