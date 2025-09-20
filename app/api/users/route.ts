import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/constants';
import { User } from '@/lib/types';

// In-memory storage for demo purposes
// In production, this would be replaced with a database
let users: User[] = [...MOCK_USERS];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skillLevel = searchParams.get('skillLevel');
    const location = searchParams.get('location');

    let filteredUsers = users;

    if (skillLevel) {
      filteredUsers = filteredUsers.filter(user => user.skillLevel === skillLevel);
    }

    if (location) {
      filteredUsers = filteredUsers.filter(user =>
        user.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    return NextResponse.json({
      data: filteredUsers,
      success: true,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, farcasterId, bio, skillLevel, location } = body;

    // Validate required fields
    if (!username || !skillLevel || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: username, skillLevel, location', success: false },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this username already exists', success: false },
        { status: 409 }
      );
    }

    const newUser: User = {
      userId: generateId(),
      username,
      farcasterId,
      bio,
      skillLevel,
      location,
    };

    users.push(newUser);

    return NextResponse.json({
      data: newUser,
      success: true,
      message: 'User created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', success: false },
      { status: 500 }
    );
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
