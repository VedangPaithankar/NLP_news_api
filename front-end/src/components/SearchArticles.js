import React, { useState } from 'react';
import { searchArticles } from '../services/api';

const SearchArticles = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchArticles(query);
      setResults(response.data.matching_articles || []);
      console.log(response);
    } catch (err) {
      setError("Error fetching articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter results to only include articles from Business Insider
  const filteredResults = results.filter(
    (article) => article.source && article.source.name === "Business Insider"
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Search Articles</h2>
      
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 mt-2"
        disabled={loading || !query.trim()}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {error && <div className="text-red-500 mt-4">{error}</div>}
      
      {filteredResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Search Results:</h3>
          <ul className="space-y-4">
            {filteredResults.map((article, index) => (
              <li key={index} className="border p-2 rounded flex">
                <img src={article.urlToImage} alt={article.title} className='h-60 object-cover mr-4' />
                <div className="flex-grow">
                  <h4 className="font-bold">{article.title}</h4>
                  <p>{article.description || article.summary}</p>
                  <span className="block mt-2 text-sm">
                    Published at: {new Date(article.publishedAt).toLocaleString()}
                  </span>
                  <span className="block text-sm">
                    Source: {article.source.name}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mt-2"
                  >
                    Redirect to Article
                  </a>
                  <br/>
                  <span className="block text-sm">
                    URL: {article.url}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {filteredResults.length === 0 && !loading && !error && (
        <p className="mt-4 text-gray-500">No results found from Business Insider. Try another query.</p>
      )}
    </div>
  );
};

export default SearchArticles;