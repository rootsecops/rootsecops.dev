
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blogs';

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('API Error fetching blog posts:', error);
    return NextResponse.json({ message: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
