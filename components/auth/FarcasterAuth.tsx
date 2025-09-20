'use client';

import { useState } from 'react';
import { CTAButton } from '@/components/ui/CTAButton';

interface FarcasterAuthProps {
  onAuthSuccess?: (user: any) => void;
  onAuthError?: (error: string) => void;
}

export function FarcasterAuth({ onAuthSuccess, onAuthError }: FarcasterAuthProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleConnect = async () => {
    setIsConnecting(true);

    try {
      // For demo purposes, simulate Farcaster connection
      // In production, this would integrate with actual Farcaster SDK
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockUser = {
        fid: '12345',
        username: 'demo_user',
        displayName: 'Demo User',
        pfpUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=DU',
      };

      setUser(mockUser);
      setIsConnected(true);
      onAuthSuccess?.(mockUser);
    } catch (error) {
      const errorMessage = 'Failed to connect to Farcaster';
      onAuthError?.(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    setIsConnected(false);
  };

  if (isConnected && user) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg">
        <img
          src={user.pfpUrl}
          alt={user.displayName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-semibold text-textPrimary">{user.displayName}</p>
          <p className="text-sm text-textSecondary">@{user.username}</p>
        </div>
        <CTAButton
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
        >
          Disconnect
        </CTAButton>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🟣</span>
        </div>
        <h3 className="text-lg font-semibold text-textPrimary mb-2">
          Connect with Farcaster
        </h3>
        <p className="text-textSecondary">
          Connect your Farcaster account to join the Nohejbal Hub community
        </p>
      </div>

      <CTAButton
        variant="primary"
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full"
      >
        {isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Connecting...
          </>
        ) : (
          <>
            🟣 Connect Farcaster
          </>
        )}
      </CTAButton>

      <p className="text-xs text-textSecondary mt-4">
        By connecting, you agree to share your profile information with Nohejbal Hub
      </p>
    </div>
  );
}

