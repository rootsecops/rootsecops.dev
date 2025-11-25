
import { NextResponse } from 'next/server';
import { getAllCodes, searchCodes } from '@/lib/codes';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '';
    const query = searchParams.get('query');

    if (query) {
        const searchResults = await searchCodes(query);
        return NextResponse.json({ programs: searchResults });
    }

    const programs = await getAllCodes(path); 
    return NextResponse.json({ programs });
  } catch (error) {
    console.error('API Error fetching codes:', error);
    return NextResponse.json({ message: 'Failed to fetch codes' }, { status: 500 });
  }
}
