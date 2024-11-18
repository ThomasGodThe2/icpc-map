import dbConnect from '@/lib/dbConnect';
import Topic from '@/models/Topic';
import { NextResponse } from 'next/server';

export async function handler(request, context) {
  const { method } = request;

  await dbConnect();

  if (method === 'GET') {
    // Handle GET request: Retrieve a topic by ID
    const { id } = context.params;

    try {
      const topic = await Topic.findById(id).populate('topics_list');
      if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json(topic);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
    }
  }  else if (method === 'POST') {
    // Handle POST request: Create a new topic
    try {
      const {name, description, problem_urls,topics_list} = await request.json();
      
      // Validate required fields
      console.log(topics_list);
      if (!description || !name  || !Array.isArray(problem_urls)|| !Array.isArray(topics_list)) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const newTopic = await Topic.create({ name ,description, problem_urls,topics_list});
      return NextResponse.json({ message: 'Topic created successfully', data: newTopic }, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
    }
  } else {
    // If the method is neither GET nor POST, return 405 Method Not Allowed
    return NextResponse.json({ error: `Method ${method} not allowed` }, { status: 405 });
  }
}

export { handler as GET,handler as POST};