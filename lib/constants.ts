export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'professional', label: 'Professional' },
] as const;

export const GAME_STATUSES = [
  { value: 'scheduled', label: 'Scheduled', color: 'text-blue-400' },
  { value: 'in-progress', label: 'In Progress', color: 'text-yellow-400' },
  { value: 'completed', label: 'Completed', color: 'text-green-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-400' },
] as const;

export const CONTENT_TYPES = [
  { value: 'image', label: 'Image', icon: '📷' },
  { value: 'video', label: 'Video', icon: '🎥' },
  { value: 'text', label: 'Text', icon: '📝' },
] as const;

export const MOCK_USERS = [
  {
    userId: '1',
    username: 'alex_player',
    bio: 'Passionate nohejbal player from Prague',
    skillLevel: 'advanced' as const,
    location: 'Prague, Czech Republic',
    avatar: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=AP',
  },
  {
    userId: '2',
    username: 'sarah_champion',
    bio: 'Team captain and coach',
    skillLevel: 'professional' as const,
    location: 'Brno, Czech Republic',
    avatar: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=SC',
  },
];

export const MOCK_TEAMS = [
  {
    teamId: '1',
    teamName: 'Prague Panthers',
    members: ['1', '2'],
    jerseyColor: '#4F46E5',
    description: 'Competitive team from Prague',
  },
  {
    teamId: '2',
    teamName: 'Brno Bears',
    members: ['2'],
    jerseyColor: '#059669',
    description: 'Rising stars from Brno',
  },
];

export const MOCK_GAMES = [
  {
    gameId: '1',
    dateTime: '2024-01-20T15:00:00Z',
    location: 'Prague Sports Center',
    team1Id: '1',
    team2Id: '2',
    scoreTeam1: 21,
    scoreTeam2: 18,
    status: 'completed' as const,
  },
  {
    gameId: '2',
    dateTime: '2024-01-25T18:00:00Z',
    location: 'Brno Arena',
    team1Id: '2',
    team2Id: '1',
    status: 'scheduled' as const,
  },
];

export const MOCK_POSTS = [
  {
    postId: '1',
    userId: '1',
    contentType: 'image' as const,
    caption: 'Great training session today! 🏐',
    timestamp: '2024-01-15T10:00:00Z',
    likes: 24,
    comments: [],
  },
  {
    postId: '2',
    userId: '2',
    contentType: 'video' as const,
    caption: 'Amazing rally from yesterday\'s match!',
    timestamp: '2024-01-14T16:30:00Z',
    likes: 45,
    comments: [],
  },
];

export const MOCK_SPONSORS = [
  {
    sponsorId: '1',
    name: 'SportTech Pro',
    website: 'https://sporttech.com',
    logoUrl: 'https://via.placeholder.com/120x60/4F46E5/FFFFFF?text=SportTech',
    description: 'Premium nohejbal equipment and gear for professionals and enthusiasts.',
  },
  {
    sponsorId: '2',
    name: 'Czech Sports Federation',
    website: 'https://czechsports.cz',
    logoUrl: 'https://via.placeholder.com/120x60/059669/FFFFFF?text=CSF',
    description: 'Supporting nohejbal development across the Czech Republic.',
  },
  {
    sponsorId: '3',
    name: 'Arena Plus',
    website: 'https://arenaplus.com',
    logoUrl: 'https://via.placeholder.com/120x60/DC2626/FFFFFF?text=Arena+',
    description: 'Modern sports facilities and court rentals for nohejbal teams.',
  },
];
