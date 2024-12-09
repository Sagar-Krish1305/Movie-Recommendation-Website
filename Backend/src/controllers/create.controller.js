
import { index } from "../db/pc.js";
import { createPineconeVector } from "../models/PineconeVector.js";
export const addMovieToIndex = async (req, res, next) => {
  try {
    const movieDetails  = req.body.movieDetails
    const record = await createPineconeVector(movieDetails);
    console.log(record)
    await index.upsert([record]);
    res.status(201).json({ message: "Movie added to the index" });
  } catch (error) {
    next(error);
    console.log("There is some error")
    res.status(500).json({ message: "Error adding movie to the index" });
  }
};
