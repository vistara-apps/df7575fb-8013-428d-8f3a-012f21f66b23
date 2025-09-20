import { NextRequest, NextResponse } from 'next/server';
import { MOCK_GAMES } from '@/lib/constants';
import { Game } from '@/lib/types';

// In-memory storage for demo purposes
let games: Game[] = [...MOCK_GAMES];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    const teamId = searchParams.get('teamId');
    const status = searchParams.get('status');

    if (gameId) {
      const game = games.find(g => g.gameId === gameId);
      if (!game) {
        return NextResponse.json(
          { error: 'Game not found', success: false },
          { status: 404 }
        );
      }
      return NextResponse.json({
        data: game,
        success: true,
        message: 'Game retrieved successfully'
      });
    }

    let filteredGames = games;

    if (teamId) {
      filteredGames = filteredGames.filter(game =>
        game.team1Id === teamId || game.team2Id === teamId
      );
    }

    if (status) {
      filteredGames = filteredGames.filter(game => game.status === status);
    }

    return NextResponse.json({
      data: filteredGames,
      success: true,
      message: 'Games retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dateTime, location, team1Id, team2Id, status = 'scheduled' } = body;

    // Validate required fields
    if (!dateTime || !location || !team1Id || !team2Id) {
      return NextResponse.json(
        { error: 'Missing required fields: dateTime, location, team1Id, team2Id', success: false },
        { status: 400 }
      );
    }

    const newGame: Game = {
      gameId: generateId(),
      dateTime,
      location,
      team1Id,
      team2Id,
      status,
    };

    games.push(newGame);

    return NextResponse.json({
      data: newGame,
      success: true,
      message: 'Game created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, ...updates } = body;

    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required', success: false },
        { status: 400 }
      );
    }

    const gameIndex = games.findIndex(game => game.gameId === gameId);
    if (gameIndex === -1) {
      return NextResponse.json(
        { error: 'Game not found', success: false },
        { status: 404 }
      );
    }

    // Update game
    games[gameIndex] = { ...games[gameIndex], ...updates };

    return NextResponse.json({
      data: games[gameIndex],
      success: true,
      message: 'Game updated successfully'
    });
  } catch (error) {
    console.error('Error updating game:', error);
    return NextResponse.json(
      { error: 'Failed to update game', success: false },
      { status: 500 }
    );
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
