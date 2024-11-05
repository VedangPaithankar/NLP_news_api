import axios from 'axios'; // Import axios
import { searchArticlesByKeywords } from '../services/nlpServices.js';

/**
 * Searches for articles based on the provided keywords.
 *
 * @param {Object} req - The request object containing the query in the body.
 * @param {Object} res - The response object used to send back the search results.
 */
export const searchArticles = async (req, res) => {
    const { query } = req.body;

    // Check if query is provided
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        // Search for articles based on the provided keywords
        const matchingArticles = await searchArticlesByKeywords(query);

        // Send the response back to the client
        res.json({ matching_articles: matchingArticles });
    } catch (error) {
        // Handle errors and send a response
        console.error("Error searching articles:", error.message);
        res.status(500).json({ error: error.message });
    }
};