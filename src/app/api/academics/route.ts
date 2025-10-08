
import { NextResponse } from 'next/server';
import { getNotes, getNoteContent, searchNotes } from '@/lib/notes';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawPath = searchParams.get('path') || '';
    const path = decodeURIComponent(decodeURIComponent(rawPath));
    const action = searchParams.get('action');
    const query = searchParams.get('query');

    if (query) {
        const searchResults = await searchNotes(query);
        return NextResponse.json({ notes: searchResults });
    }

    if (action === 'getContent' && path) {
        const noteContent = await getNoteContent(path);
        if (noteContent) {
            return NextResponse.json(noteContent);
        }
        return NextResponse.json({ message: 'Note content not found' }, { status: 404 });
    }

    const notes = await getNotes(path); 
    return NextResponse.json({ notes });

  } catch (error) {
    console.error('API Error fetching notes:', error);
    return NextResponse.json({ message: 'Failed to fetch notes' }, { status: 500 });
  }
}
