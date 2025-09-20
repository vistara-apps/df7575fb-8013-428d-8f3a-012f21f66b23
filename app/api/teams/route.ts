import { NextRequest, NextResponse } from 'next/server';
import { MOCK_TEAMS } from '@/lib/constants';
import { Team } from '@/lib/types';

// In-memory storage for demo purposes
let teams: Team[] = [...MOCK_TEAMS];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    if (teamId) {
      const team = teams.find(t => t.teamId === teamId);
      if (!team) {
        return NextResponse.json(
          { error: 'Team not found', success: false },
          { status: 404 }
        );
      }
      return NextResponse.json({
        data: team,
        success: true,
        message: 'Team retrieved successfully'
      });
    }

    return NextResponse.json({
      data: teams,
      success: true,
      message: 'Teams retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamName, jerseyColor, description } = body;

    // Validate required fields
    if (!teamName || !jerseyColor) {
      return NextResponse.json(
        { error: 'Missing required fields: teamName, jerseyColor', success: false },
        { status: 400 }
      );
    }

    // Check if team already exists
    const existingTeam = teams.find(team => team.teamName === teamName);
    if (existingTeam) {
      return NextResponse.json(
        { error: 'Team with this name already exists', success: false },
        { status: 409 }
      );
    }

    const newTeam: Team = {
      teamId: generateId(),
      teamName,
      members: [],
      jerseyColor,
      description,
    };

    teams.push(newTeam);

    return NextResponse.json({
      data: newTeam,
      success: true,
      message: 'Team created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { error: 'Failed to create team', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, ...updates } = body;

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required', success: false },
        { status: 400 }
      );
    }

    const teamIndex = teams.findIndex(team => team.teamId === teamId);
    if (teamIndex === -1) {
      return NextResponse.json(
        { error: 'Team not found', success: false },
        { status: 404 }
      );
    }

    // Update team
    teams[teamIndex] = { ...teams[teamIndex], ...updates };

    return NextResponse.json({
      data: teams[teamIndex],
      success: true,
      message: 'Team updated successfully'
    });
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json(
      { error: 'Failed to update team', success: false },
      { status: 500 }
    );
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
