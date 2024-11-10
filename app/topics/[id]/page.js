import React from 'react';

// Fetch data on the server side in an async component
export default async function TopicPage({ params }) {
  let { id } = await params;

  // Fetch data from your API route
  // console.log("Really")
  console.log(id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topics/${id}`, {
    cache: 'no-store' // Fetch fresh data on each request
  });

  if (!res.ok) {
    return <p>Error fetching data</p>;
  }

  const topic = await res.json();

  return (
    <div>
      <h1 className='text-black'>Topic: {topic.description}</h1>
      <h2 className='text-black'>Problems:</h2>
      <ul>
        {topic.list_of_problems.map((problemUrl, index) => (
          <li key={index}>
            <a className='text-black' href={problemUrl} target="_blank" rel="noopener noreferrer">
              Problem {index + 1}
            </a>
          </li>
        ))}
      </ul>
      <h2 className='text-black'>Related Topics:</h2>
      <ul>
        {topic.topics_list.map((relatedTopic) => (
          <li key={relatedTopic._id}>{relatedTopic.description}</li>
        ))}
      </ul>
    </div>
  );
}