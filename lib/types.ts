export interface User {
  userId: string;
  username: string;
  farcasterId?: string;
  bio?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  location: string;
  teamId?: string;
  avatar?: string;
}

export interface Team {
  teamId: string;
  teamName: string;
  members: string[];
  jerseyColor: string;
  description?: string;
}

export interface Game {
  gameId: string;
  dateTime: string;
  location: string;
  team1Id: string;
  team2Id: string;
  scoreTeam1?: number;
  scoreTeam2?: number;
  status: GameStatus;
}

export type GameStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Post {
  postId: string;
  userId: string;
  contentUrl?: string;
  contentType: 'image' | 'video' | 'text';
  caption: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  commentId: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface Sponsor {
  sponsorId: string;
  name: string;
  website?: string;
  logoUrl?: string;
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
