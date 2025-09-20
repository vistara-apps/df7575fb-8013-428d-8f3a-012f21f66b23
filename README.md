# Nohejbal Hub - Base Mini App

Connect, Compete, and Conquer the Nohejbal World.

## Overview

Nohejbal Hub is an advanced digital ecosystem for nohejbal players, fans, coaches, and sponsors to connect, track progress, and engage with user-generated content. Built as a Base Mini App using Next.js 15 and MiniKit.

## Features

### 🎯 Player & Game Matchmaking
- Create player profiles with skill levels and location
- Find other players and teams for matches
- Schedule games and communicate with opponents

### 📊 Team Performance Tracking
- Track individual and team statistics
- Visualize progress over time
- Win/loss records and performance metrics

### 📱 Fan Content Hub
- Upload and share photos, videos, and stories
- Like, comment, and tag players/teams
- Community-driven content creation

### 🤝 Sponsor Visibility Portal
- Sponsor profiles and showcases
- Directory of community supporters
- Partnership opportunities

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Base Integration**: MiniKit for Base Mini App functionality
- **Identity**: Farcaster integration for social features
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nohejbal-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your MiniKit API key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## Design System

### Colors
- **Primary**: `hsl(240 80% 50%)` - Blue accent
- **Accent**: `hsl(160 80% 50%)` - Teal highlight
- **Background**: `hsl(230 15% 10%)` - Dark background
- **Surface**: `hsl(230 15% 15%)` - Card backgrounds
- **Text Primary**: `hsl(0 0% 95%)` - Main text
- **Text Secondary**: `hsl(0 0% 75%)` - Secondary text

### Components
- **AppShell**: Main layout with navigation
- **ProfileCard**: Player and team profiles
- **GameScheduleItem**: Game listings and results
- **FeedPost**: Social media style posts
- **CTAButton**: Call-to-action buttons
- **StatDisplay**: Performance statistics

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main homepage
├── providers.tsx      # MiniKit provider setup
├── globals.css        # Global styles and design tokens
├── loading.tsx        # Loading UI
└── error.tsx          # Error boundary

components/
├── ui/                # Reusable UI components
│   ├── AppShell.tsx
│   ├── ProfileCard.tsx
│   ├── GameScheduleItem.tsx
│   ├── FeedPost.tsx
│   ├── CTAButton.tsx
│   └── StatDisplay.tsx
└── features/          # Feature-specific components
    ├── PlayerMatchmaking.tsx
    ├── TeamPerformance.tsx
    ├── FanContentHub.tsx
    └── SponsorVisibility.tsx

lib/
├── types.ts           # TypeScript type definitions
├── constants.ts       # App constants and mock data
└── utils.ts           # Utility functions
```

## Data Model

### Core Entities
- **User**: Player profiles with skill levels and location
- **Team**: Team information and member management
- **Game**: Match scheduling and results
- **Post**: User-generated content and social features
- **Sponsor**: Sponsor profiles and visibility

## Development Guidelines

### Code Standards
- Use TypeScript for all components
- Follow Next.js 15 App Router patterns
- Implement proper error handling
- Use Tailwind CSS for styling
- Maintain mobile-first responsive design

### Component Guidelines
- Keep components modular and reusable
- Use proper TypeScript interfaces
- Implement loading and error states
- Follow accessibility best practices

## Deployment

This app is designed to run as a Base Mini App within the Base App ecosystem. Follow Base Mini App deployment guidelines for production deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
