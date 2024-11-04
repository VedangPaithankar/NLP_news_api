import React, { useState } from 'react';
import { translateArticle } from '../services/api';

const TranslateArticle = () => {
  const [url, setUrl] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default to Spanish
  const [translatedText, setTranslatedText] = useState(null);
  const [originalText, setOriginalText] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleTranslate = async () => {
    setError(null); // Reset error state
    setTranslatedText(null); // Reset translation state
    setOriginalText(null); // Reset original text state
    setLoading(true); // Set loading state to true

    try {
      const response = await translateArticle(url, targetLanguage);
      setTranslatedText(response.data.translated_text);
      setOriginalText(response.data.original_text);
    } catch (error) {
      setError("Error translating article. Please check the URL and try again.");
      console.error("Error translating article:", error);
    } finally {
      setLoading(false); // Reset loading state after processing
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Translate Article</h2>
      <input
        type="text"
        placeholder="Enter article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ar">Arabic</option>
        <option value="hi">Hindi</option>
        {/* Add more languages as needed */}
      </select>
      <button 
        onClick={handleTranslate} 
        className={`bg-blue-500 text-white p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {originalText && (
        <div className="mt-4">
          <h3 className="font-bold">Original Text:</h3>
          <p>{originalText}</p>
        </div>
      )}
      {translatedText && (
        <div className="mt-4">
          <h3 className="font-bold">Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateArticle;