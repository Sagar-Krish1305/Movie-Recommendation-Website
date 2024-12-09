import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { addMovieToIndex } from "./src/controllers/create.controller.js";
import { searchMovies } from "./src/controllers/search.controller.js";
import cors from 'cors';
const app = express();
const router = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())
// Define the route
router.post('/api/v1/add_movie', addMovieToIndex);
router.get('/api/v1/search/:queryText/:K', searchMovies);

// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});