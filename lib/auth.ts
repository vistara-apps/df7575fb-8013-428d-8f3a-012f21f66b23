// Authentication utilities for Farcaster integration
// This is a simplified version for demo purposes

export interface FarcasterUser {
  fid: string;
  username: string;
  displayName: string;
  pfpUrl?: string;
  bio?: string;
}

export class AuthService {
  private static instance: AuthService;
  private currentUser: FarcasterUser | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async connectFarcaster(): Promise<FarcasterUser> {
    // In production, this would integrate with the actual Farcaster SDK
    // For demo purposes, we'll simulate the connection
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser: FarcasterUser = {
          fid: '12345',
          username: 'demo_user',
          displayName: 'Demo User',
          pfpUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=DU',
          bio: 'Passionate nohejbal player',
        };

        this.currentUser = mockUser;
        this.saveToStorage(mockUser);
        resolve(mockUser);
      }, 2000);
    });
  }

  disconnectFarcaster(): void {
    this.currentUser = null;
    this.clearStorage();
  }

  getCurrentUser(): FarcasterUser | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to load from storage
    const stored = this.loadFromStorage();
    if (stored) {
      this.currentUser = stored;
      return stored;
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private saveToStorage(user: FarcasterUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('farcaster_user', JSON.stringify(user));
    }
  }

  private loadFromStorage(): FarcasterUser | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('farcaster_user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  private clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('farcaster_user');
    }
  }
}

export const authService = AuthService.getInstance();

