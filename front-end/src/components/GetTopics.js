import React, { useState } from 'react';
import { getTopics } from '../services/api';

const GetTopics = () => {
  const [urls, setUrls] = useState(''); // Input as a single string with line-separated URLs
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetTopics = async () => {
    // Convert the input into an array of URLs
    const urlArray = urls.split('\n').map(url => url.trim()).filter(url => url);

    if (urlArray.length === 0) {
      setError("Please enter at least one valid URL.");
      return;
    }

    setLoading(true);
    setError(null);
    setTopics(null);

    try {
      const response = await getTopics(urlArray);
      setTopics(response.data.topics);
      console.log(response)
    } catch (err) {
      console.error("Error fetching topics:", err);
      setError("An error occurred while fetching topics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Get Topics from Articles</h2>
      <textarea
        placeholder="Enter article URLs, one per line"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        className="border p-2 w-full h-40"
      />
      <button
        onClick={handleGetTopics}
        className="bg-blue-500 text-white p-2 mt-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Topics"}
      </button>

      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}

      {topics && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Detected Topics:</h3>
          <ul className="list-disc pl-5 mt-2">
            {topics.map((topicData, index) => (
              <li key={index} className="mb-4">
                <strong>{topicData.topic}:</strong>
                <ul className="list-inside list-disc ml-4 mt-1">
                  {topicData.keywords.map((keyword, idx) => (
                    <li key={idx}>{keyword}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetTopics;