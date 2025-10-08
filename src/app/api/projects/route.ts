
import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/projects';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('API Error fetching projects:', error);
    return NextResponse.json({ message: 'Failed to fetch projects' }, { status: 500 });
  }
}
