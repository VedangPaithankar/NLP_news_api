import { Router } from 'express';
import { summarizeArticle } from '../controllers/articleController.js';
import { analyzeArticleSentiment } from '../controllers/sentimentController.js';
import { extractEntitiesFromArticle } from '../controllers/entityController.js';
import { extractKeywordsFromArticle } from '../controllers/keywordController.js';
import { getTopics } from '../controllers/topicController.js';
import { getSimilarArticles } from '../controllers/similarityController.js';
import { classifyArticle } from '../controllers/classificationController.js';
import { translateArticle } from '../controllers/translationController.js';
import { searchArticles } from '../controllers/searchController.js';

const router = Router();

// Define your routes
router.post('/summarize_article', summarizeArticle);
router.post('/analyze_sentiment', analyzeArticleSentiment);
router.post('/extract_entities', extractEntitiesFromArticle);
router.post('/extract_keywords', extractKeywordsFromArticle);
router.post('/get_topics', getTopics);
router.post('/get_similar_articles', getSimilarArticles);
router.post('/classify_article', classifyArticle);
router.post('/translate_article', translateArticle);
router.post('/search_articles', searchArticles);

export default router;