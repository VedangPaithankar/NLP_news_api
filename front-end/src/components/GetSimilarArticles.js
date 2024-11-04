import React, { useState } from 'react';
import { getSimilarArticles } from '../services/api';

const GetSimilarArticles = () => {
  const [queryUrl, setQueryUrl] = useState('');
  const [articleUrls, setArticleUrls] = useState('');
  const [similarArticles, setSimilarArticles] = useState([]);
  const [error, setError] = useState(null);

  const handleGetSimilarArticles = async () => {
    // Convert the multiline input into an array of URLs
    const urlsArray = articleUrls.split('\n').filter(url => url.trim() !== '');

    try {
      const response = await getSimilarArticles(queryUrl, urlsArray);
      setSimilarArticles(response.data.similar_articles);
      setError(null); // Clear any previous error
    } catch (err) {
      setError('An error occurred while fetching similar articles.');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Find Similar Articles</h2>

      <label className="block mb-2 font-bold">Query Article URL</label>
      <input
        type="text"
        placeholder="Enter the URL of the article you want to compare"
        value={queryUrl}
        onChange={(e) => setQueryUrl(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <label className="block mb-2 font-bold">Other Article URLs</label>
      <textarea
        placeholder="Enter URLs of other articles (one per line)"
        value={articleUrls}
        onChange={(e) => setArticleUrls(e.target.value)}
        className="border p-2 w-full mb-4"
        rows="5"
      />

      <button
        onClick={handleGetSimilarArticles}
        className="bg-blue-500 text-white p-2"
      >
        Find Similar Articles
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {similarArticles.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-lg">Similar Articles:</h3>
          <ul className="list-disc list-inside">
            {similarArticles.map((article, index) => (
              <li key={index} className="mt-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  {article.title || article.url}
                </a>
                {article.similarity !== undefined && (
                  <span className="ml-2 text-gray-500">
                    (Score: {article.similarity === 0 ? article.similarity : article.similarity.toFixed(2)})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetSimilarArticles;
