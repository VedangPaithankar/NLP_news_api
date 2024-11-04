import React, { useState } from 'react';
import { extractKeywords } from '../services/api';

const ExtractKeywords = () => {
  const [url, setUrl] = useState(''); // State to hold the article URL
  const [keywords, setKeywords] = useState([]); // State to hold the extracted keywords
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const handleExtractKeywords = async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Clear any previous errors
    setKeywords([]); // Clear previous keywords

    try {
      // Call the API function to extract keywords
      const response = await extractKeywords(url);
      setKeywords(response.data.keywords); // Update keywords state with response data
    } catch (err) {
      console.error("Error extracting keywords:", err);
      setError("Failed to extract keywords. Please check the URL or try again later.");
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Extract Keywords</h2>
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleExtractKeywords}
        className="bg-blue-500 text-white p-2 mt-2"
        disabled={loading}
      >
        {loading ? 'Extracting...' : 'Extract Keywords'}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {keywords.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Keywords:</h3>
          <ul className="list-disc list-inside">
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExtractKeywords;
