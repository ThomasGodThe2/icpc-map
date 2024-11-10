import dbConnect from '@/lib/dbConnect';
import Topic from '@/models/Topic';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const { id } = await context.params; // Await `context.params`

  await dbConnect();

  try {
    const topic = await Topic.findById(id).populate('topics_list');
    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}