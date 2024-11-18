import { useState, useEffect } from 'react';

export default function TopicForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [problemUrls, setProblemUrls] = useState('');
  const [topics, setTopics] = useState([]); // List of all available topics
  const [selectedTopics, setSelectedTopics] = useState([]); // Selected subsidiary topics

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics');
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      }
    }
    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const problemUrlsArray = problemUrls.split(/\s+/).filter((url) => url.length > 0);

    try {
      const res = await fetch('/api/topics/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          problem_urls: problemUrlsArray,
          topics_list: selectedTopics,
        }),
      });

      if (res.ok) {
        alert('Topic created successfully!');
        setDescription('');
        setProblemUrls('');
        setSelectedTopics([]);
        setName("");
      } else {
        alert('Failed to create topic.');
      }
    } catch (error) {
      console.error('Error submitting topic:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create a New Topic</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name:
          </label>
          <textarea
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the name of the topic"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a brief description"
            required
          />
        </div>

        <div>
          <label htmlFor="problemUrls" className="block text-lg font-medium mb-2">
            Problem URLs:
          </label>
          <textarea
            id="problemUrls"
            value={problemUrls}
            onChange={(e) => setProblemUrls(e.target.value)}
            rows="5"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Paste URLs separated by spaces or newlines"
            required
          />
        </div>

        <div>
          <label htmlFor="topics" className="block text-lg font-medium mb-2">
            Add Subsidiary Topics:
          </label>
          <select
            id="topics"
            multiple
            value={selectedTopics}
            onChange={(e) =>
              setSelectedTopics(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.description}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple topics.</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Topic
        </button>
      </form>
    </div>
  );
}