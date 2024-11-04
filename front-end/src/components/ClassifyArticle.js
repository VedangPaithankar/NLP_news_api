import React, { useState } from 'react';
import { classifyArticle } from '../services/api';

const ClassifyArticle = () => {
  const [url, setUrl] = useState('');
  const [classification, setClassification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClassify = async () => {
    setLoading(true);
    setError(null);
    setClassification(null);

    try {
      const response = await classifyArticle(url);
      console.log(response);
      setClassification(response.data); // Store the entire classification data
    } catch (error) {
      setError("Failed to classify the article. Please check the URL or try again later.");
      console.error("Error classifying article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Classify Article</h2>
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleClassify}
        className="bg-blue-500 text-white p-2 mt-2 disabled:opacity-50"
        disabled={!url || loading}
      >
        {loading ? "Classifying..." : "Classify Article"}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {classification && (
        <div className="mt-4">
          <h3 className="font-bold">Classification Result:</h3>
          <p><strong>Primary Category:</strong> {classification.category.primary_category.category}</p>
          <p><strong>Confidence:</strong> {classification.category.primary_category.confidence}</p>
          <p>
            <strong>Secondary Categories:</strong> 
            {classification.category.secondary_categories.length > 0 
              ? classification.category.secondary_categories.map(cat => (
                  <div key={cat.category}>
                    <span>{cat.category} (Confidence: {cat.confidence})</span>
                  </div>
                ))
              : ' None'}
          </p>
          <p><strong>Model Used:</strong> {classification.classification_model}</p>
        </div>
      )}
    </div>
  );
};

export default ClassifyArticle;
