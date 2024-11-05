// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Summarize Article
export const summarizeArticle = (url) => {
  return axios.post(`${API_BASE_URL}/summarize_article`, { url });
};

// Analyze Sentiment
export const analyzeSentiment = (url) => {
  return axios.post(`${API_BASE_URL}/analyze_sentiment`, { url });
};

// Extract Named Entities
export const extractEntities = (url) => {
  return axios.post(`${API_BASE_URL}/extract_entities`, { url });
};

// Extract Keywords
export const extractKeywords = (url) => {
  return axios.post(`${API_BASE_URL}/extract_keywords`, { url });
};

// Get Topics (Topic Modeling)
export const getTopics = (urls) => {
  return axios.post(`${API_BASE_URL}/get_topics`, { urls });
};

// Get Similar Articles
export const getSimilarArticles = (queryUrl, articleUrls) => {
  return axios.post(`${API_BASE_URL}/get_similar_articles`, { query_url: queryUrl, article_urls: articleUrls });
};

// Classify Article
export const classifyArticle = (url) => {
  return axios.post(`${API_BASE_URL}/classify_article`, { url });
};

// Translate Article
export const translateArticle = (url, targetLanguage) => {
  return axios.post(`${API_BASE_URL}/translate_article`, { url, target_language: targetLanguage });
};

// Search Articles
export const searchArticles = (query) => {
  return axios.post(`${API_BASE_URL}/search_articles`, { query });
};