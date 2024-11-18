import dbConnect from '@/lib/dbConnect';
import Topic from '@/models/Topic';
import { NextResponse } from 'next/server';

export async function handler(request, context) {
  const { method } = request;

  await dbConnect();

  if (method === 'GET') {
    // Handle GET request: Retrieve a topic by ID
    // const { id } = context.params;

    try {
      const topics = await Topic.find({}).select('description _id'); // Fetch only relevant fields
      return NextResponse.json(topics);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
    }
  } else {
    // If the method is neither GET nor POST, return 405 Method Not Allowed
    return NextResponse.json({ error: `Method ${method} not allowed` }, { status: 405 });
  }
}

export { handler as GET};