
import { NextResponse } from 'next/server';
import { getAllPrograms } from '@/lib/programs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '';
    const programs = await getAllPrograms(path); 
    return NextResponse.json({ programs });
  } catch (error) {
    console.error('API Error fetching programs:', error);
    return NextResponse.json({ message: 'Failed to fetch programs' }, { status: 500 });
  }
}
