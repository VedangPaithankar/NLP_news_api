import React, { useState } from 'react';
import { extractEntities } from '../services/api';

const ExtractEntities = () => {
  const [url, setUrl] = useState('');
  const [entities, setEntities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtractEntities = async () => {
    setLoading(true);
    setError(null);
    setEntities(null); // Clear previous results
    try {
      const response = await extractEntities(url);
      setEntities(response.data.entities);
      console.log(response);
    } catch (err) {
      setError("Error extracting entities. Please check the URL and try again.");
      console.error("Error extracting entities:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Extract Named Entities</h2>
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleExtractEntities}
        className="bg-blue-500 text-white p-2"
        disabled={!url || loading}
      >
        {loading ? 'Extracting...' : 'Extract Entities'}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {entities && (
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Extracted Entities:</h3>
          <ul className="list-disc pl-5">
            {entities.map((entity, index) => (
              <li key={index}>
                <strong>{entity.entity_group}</strong> - <em>{entity.word}</em> : <em>{entity.score.toFixed(2)}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExtractEntities;