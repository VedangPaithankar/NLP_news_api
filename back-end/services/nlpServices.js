import { pipeline } from '@xenova/transformers';
import axios from 'axios';
import { HfInference } from '@huggingface/inference';
import { removeStopwords } from 'stopword';
import * as cheerio from 'cheerio';
import { kmeans } from 'ml-kmeans';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Hugging Face Inference API
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY); // Ensure your Hugging Face API key is set

// Fetch article content from the URL
export const fetchArticleContent = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract the JSON-LD script
        const jsonData = $('script[type="application/ld+json"]').html();
        const articleData = JSON.parse(jsonData);

        // Get the headline and article body
        const headline = articleData.headline;
        const articleBody = articleData.articleBody;

        return {
            headline,
            articleBody,
        };
    } catch (error) {
        throw new Error('Failed to fetch article content: ' + error.message);
    }
};

// Summarize the text of the given article using a Hugging Face model
export const summarizeText = async (text) => {
    try {
        // Use a pre-trained summarization model
        const response = await hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: text,
        });

        return response.summary_text || "No summary available.";
    } catch (error) {
        console.error("Error during text summarization:", error);
        throw new Error("Failed to summarize text: " + error.message);
    }
};

// Translate text using Hugging Face model
export const translateText = async (text, targetLang, sourceLang = "en") => {
    try {
        const response = await hf.request({
            model: 'facebook/nllb-200-distilled-600M',
            inputs: text,
            parameters: {
                max_length: 512,
                temperature: 0.7,
                num_beams: 4,
                early_stopping: true,
                src_lang: getLanguageCode(sourceLang),
                tgt_lang: getLanguageCode(targetLang)
            },
            task: 'translation'
        });

        if (!response || !Array.isArray(response)) {
            throw new Error('Invalid response format from the model');
        }

        const translatedText = response[0]?.translation_text;

        if (!translatedText) {
            throw new Error('No translation received from the model');
        }

        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error(`Translation failed: ${error.message}`);
    }
};

// Helper function to get language codes
const getLanguageCode = (language) => {
    const languageMap = {
        'en': 'eng_Latn',
        'fr': 'fra_Latn',
        'es': 'spa_Latn',
        'de': 'deu_Latn',
        'it': 'ita_Latn',
        'pt': 'por_Latn',
        'ru': 'rus_Cyrl',
        'zh': 'zho_Hans',
        'ja': 'jpn_Jpan',
        'ko': 'kor_Hang',
        'hi': 'hin_Deva',
        'ar': 'ara_Arab',
        'bn': 'ben_Beng',
        'ta': 'tam_Taml',
        'te': 'tel_Telu',
        'ml': 'mal_Mlym'
    };

    const nllbCode = languageMap[language];
    if (!nllbCode) {
        throw new Error(`Unsupported language: ${language}`);
    }

    return nllbCode;
};

// Perform sentiment analysis using a Hugging Face model
export const analyzeSentiment = async (text) => {
    try {
        const pipe = await pipeline('sentiment-analysis');
        const sentimentAnalysis = await pipe(text);
        return sentimentAnalysis;
    } catch (error) {
        throw new Error('Failed to analyze sentiment: ' + error.message);
    }
};

// Extract named entities using a Hugging Face model
export const extractEntities = async (text) => {
    try {
        const entityRecognition = await hf.tokenClassification({
            model: 'dslim/distilbert-NER',
            inputs: text
        });
        return entityRecognition;
    } catch (error) {
        throw new Error('Failed to extract entities: ' + error.message);
    }
};

// Summarize article content using a DistilBERT model
export const summarizeArticle = async (text) => {
    try {
        const summary = await hf.summarization({
            model: 'distilbert/distilbert-base-uncased',
            inputs: text
        });
        return summary[0].summary_text;
    } catch (error) {
        throw new Error('Failed to summarize article: ' + error.message);
    }
};

// Perform topic modeling on a set of articles
export const performTopicModeling = async (articles) => {
    try {
        const texts = articles.map(article => article.text);

        if (texts.length === 0) {
            throw new Error("No articles provided for topic modeling.");
        }

        // Use a Sentence Transformer model for embedding extraction
        const embeddings = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: texts,
        });

        if (!embeddings || !Array.isArray(embeddings)) {
            throw new Error("Failed to retrieve embeddings.");
        }

        const maxTopics = Math.floor(embeddings.length / 2) || 1;
        const numTopics = Math.min(2, maxTopics);

        let clusteredTexts;
        if (numTopics > 1) {
            const clusters = kmeans(embeddings, numTopics);
            clusteredTexts = Array(numTopics).fill().map(() => []);
            texts.forEach((text, i) => {
                const clusterIndex = clusters.clusters[i];
                clusteredTexts[clusterIndex].push(text);
            });
        } else {
            clusteredTexts = [texts];
        }

        const topics = clusteredTexts.map((clusterTexts, index) => {
            const keywords = extractKeywords(clusterTexts);
            return {
                topic: `Topic ${index + 1}`,
                keywords: keywords.slice(0, 5)
            };
        });

        return topics;
    } catch (error) {
        console.error("Error in performTopicModeling:", error);
        throw new Error('Failed to perform topic modeling: ' + error.message);
    }
};

// Function to extract keywords from a set of texts (simple word frequency)
export const extractKeywords = (texts) => {
    const uniqueKeywords = new Set();

    if (typeof texts === 'string') {
        texts = [texts];
    } else if (!Array.isArray(texts)) {
        throw new Error('Input texts must be a string or an array of strings.');
    }

    texts.forEach(text => {
        const words = text.toLowerCase().split(/\W+/);
        const filteredWords = removeStopwords(words);
        filteredWords.forEach(word => {
            if (word.length > 2) {
                uniqueKeywords.add(word);
            }
        });
    });

    return Array.from(uniqueKeywords);
};

// Search articles by keywords using News API
export const searchArticlesByKeywords = async (query) => {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;
        return articles;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching articles: ' + error.message);
    }
};