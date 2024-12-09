import { pc, index } from '../db/pc.js';

/**
 * Get text embeddings from Pinecone
 * @param {string} text - Input text to embed
 * @returns {Promise<number[]>} Embedding values array
 */
export const getTextEmbeddingValues = async (text) => {
    const embeddings = await pc.inference.embed(
        process.env.PINECONE_MODEL,
        [text],
        { inputType: 'passage', truncate: 'END' }
    );
    return embeddings[0].values;
};

/**
 * Convert movie details into a descriptive text
 * @param {Object} movie - Movie details object
 * @returns {string} Generated descriptive text for the movie
 */
export const getMovieText = (movieDetails) => {
    const actors = movieDetails.actors.join(', ');
    const availableOn = movieDetails.availableOn.join(', ');
    return `${movieDetails.title} is a ${movieDetails.genre} movie released on ${movieDetails.releaseDate} (${movieDetails.year}). 
    Directed by ${movieDetails.director}, this ${movieDetails.duration} long movie stars ${actors}.
    The storyline follows: ${movieDetails.description}.
    The movie is in ${movieDetails.language} and has a rating of ${movieDetails.rating}. 
    It is available on ${availableOn}.`;
};

/**
 * Generate embedding values for a movie
 * @param {Object} movie - Movie details object
 * @returns {Promise<number[]>} Embedding values array
 */
export const getMovieEmbeddingValues = async (movie) => {
    const text = getMovieText(movie);
    return await getTextEmbeddingValues(text);
};


