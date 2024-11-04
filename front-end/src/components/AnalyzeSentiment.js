
import React, { useState } from 'react';
import { analyzeSentiment } from '../services/api';

const AnalyzeSentiment = () => {
  // State to store the input URL and the result of the sentiment analysis
  const [url, setUrl] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the sentiment analysis request
  const handleAnalyze = async () => {
    setLoading(true);  // Start loading
    setError(null);    // Clear previous errors
    setSentiment(null); // Clear previous result

    try {
      const response = await analyzeSentiment(url);
      setSentiment(response.data);
    } catch (err) {
      setError("Failed to analyze sentiment. Please try again.");
      console.error("Error analyzing sentiment:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-semibold">Analyze Sentiment</h2>
      
      {/* Input for the article URL */}
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mb-4"
      />
      
      {/* Button to trigger the sentiment analysis */}
      <button
        onClick={handleAnalyze}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading || !url}
      >
        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {/* Display loading state, result, or error message */}
      <div className="mt-4">
        {loading && <p className="text-gray-500">Analyzing sentiment...</p>}
        
        {error && (
          <p className="text-red-500 mt-2">
            {error}
          </p>
        )}
        
        {sentiment && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-bold text-lg">Sentiment Analysis Result:</h3>
            <p><strong>Sentiment:</strong> {sentiment.sentiment}</p>
            <p><strong>Confidence:</strong> {sentiment.confidence}</p>
            <p><strong>Source URL:</strong> <a href={sentiment.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{sentiment.source_url}</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeSentiment;