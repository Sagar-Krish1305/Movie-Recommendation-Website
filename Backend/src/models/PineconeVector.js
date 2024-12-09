import { getMovieEmbeddingValues } from "../utils/embeddings.utils.js";
export const createPineconeVector = async (movieDetails) => {
    const values = await getMovieEmbeddingValues(movieDetails);
    return {
        id: movieDetails.title,
        values: values,
        metadata: {
            title: movieDetails.title,
            genre: movieDetails.genre,
            year: movieDetails.year,
            director: movieDetails.director,
            actors: movieDetails.actors,
            rating: movieDetails.rating,
            description: movieDetails.description,
            availableOn: movieDetails.availableOn,
            posterLink: movieDetails.posterLink,
            duration: movieDetails.duration || null,
            language: movieDetails.language || null,
            releaseDate: movieDetails.releaseDate || null,
        }
      }
}