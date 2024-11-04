// src/components/SummarizeArticle.js
import React, { useState } from 'react';
import { summarizeArticle } from '../services/api';

const SummarizeArticle = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummary(null); // Reset previous summary

    try {
      const response = await summarizeArticle(url);
      setSummary(response.data);
    } catch (err) {
      console.error("Error summarizing article:", err);
      setError("Failed to summarize the article. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Summarize Article</h2>
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSummarize}
        className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
      {summary && (
        <div className="mt-4">
          <h3 className="font-bold">Title:</h3>
          <p className="italic">{summary.title}</p>
          <h3 className="font-bold mt-2">Summary:</h3>
          <p>{summary.summary}</p>
          <a href={summary.source_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </div>
      )}
    </div>
  );
};

export default SummarizeArticle;
