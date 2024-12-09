import { getTextEmbeddingValues } from "../utils/embeddings.utils.js";
import { index } from "../db/pc.js";

export const searchMovies = async (req, res, next) => {
  try {
    const queryText = req.params.queryText; 
    const K = parseInt(req.params.K, 10); // Parse K as an integer
    const embeddings = await getTextEmbeddingValues(queryText);
    const results = await index.query({
      vector: embeddings,
      topK: K,
      includeMetadata: true
    });
    const resultMovies = results.matches.map((match) => match.metadata);
    res.status(200).json(resultMovies);
  } catch (error) {
    next(error);
  }
};