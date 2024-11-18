// pages/api/mindmap.js
import dbConnect from '@/lib/dbConnect';
import Topic from '@/models/Topic';
import { NextResponse } from 'next/server';

async function handler(request, context) {
  const { method } = request;
  await dbConnect();

  if (request.method !== 'GET') {
    // res.setHeader('Allow', ['GET']);

    return NextResponse.json({ error: `Method ${method} not allowed` }, { status: 405 });
  }

  try {
    // console.log("Could");
    // Fetch topics and their subsidiaries
    const topics = await Topic.find({})
      .populate('topics_list', 'name description _id') // Populate subsidiaries with name and description
      .select('name description topics_list'); // Select only needed fields

    
    // Transform data into mindmap format
    const mindmapData = {
      name: 'ICPC Mindmap',
      children: topics.map((topic) => ({
        name: topic.name, // Use `name` as the node label
        description: topic.description, // Additional field for potential tooltip/info
        children: topic.topics_list.map((subTopic) => ({
          name: subTopic.name,
          description: subTopic.description,
        })),
      })),
    };

    return NextResponse.json(mindmapData);
  } catch (error) {
    console.error('Error fetching mindmap data:', error);
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}

export { handler as GET};