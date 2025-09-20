import { NextRequest, NextResponse } from 'next/server';
import { MOCK_SPONSORS } from '@/lib/constants';
import { Sponsor } from '@/lib/types';

// In-memory storage for demo purposes
let sponsors: Sponsor[] = [...MOCK_SPONSORS];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sponsorId = searchParams.get('sponsorId');

    if (sponsorId) {
      const sponsor = sponsors.find(s => s.sponsorId === sponsorId);
      if (!sponsor) {
        return NextResponse.json(
          { error: 'Sponsor not found', success: false },
          { status: 404 }
        );
      }
      return NextResponse.json({
        data: sponsor,
        success: true,
        message: 'Sponsor retrieved successfully'
      });
    }

    return NextResponse.json({
      data: sponsors,
      success: true,
      message: 'Sponsors retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sponsors', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, website, logoUrl, description } = body;

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description', success: false },
        { status: 400 }
      );
    }

    // Check if sponsor already exists
    const existingSponsor = sponsors.find(sponsor => sponsor.name === name);
    if (existingSponsor) {
      return NextResponse.json(
        { error: 'Sponsor with this name already exists', success: false },
        { status: 409 }
      );
    }

    const newSponsor: Sponsor = {
      sponsorId: generateId(),
      name,
      website,
      logoUrl,
      description,
    };

    sponsors.push(newSponsor);

    return NextResponse.json({
      data: newSponsor,
      success: true,
      message: 'Sponsor created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to create sponsor', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sponsorId, ...updates } = body;

    if (!sponsorId) {
      return NextResponse.json(
        { error: 'Sponsor ID is required', success: false },
        { status: 400 }
      );
    }

    const sponsorIndex = sponsors.findIndex(sponsor => sponsor.sponsorId === sponsorId);
    if (sponsorIndex === -1) {
      return NextResponse.json(
        { error: 'Sponsor not found', success: false },
        { status: 404 }
      );
    }

    // Update sponsor
    sponsors[sponsorIndex] = { ...sponsors[sponsorIndex], ...updates };

    return NextResponse.json({
      data: sponsors[sponsorIndex],
      success: true,
      message: 'Sponsor updated successfully'
    });
  } catch (error) {
    console.error('Error updating sponsor:', error);
    return NextResponse.json(
      { error: 'Failed to update sponsor', success: false },
      { status: 500 }
    );
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
