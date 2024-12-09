import { useState } from "react";
import MovieCard from "./Components/MovieCard";
import Search from "./Components/Search";
import ItemCounter from "./Components/ItemCounter";
import AddMovieButton from "./Components/AddMovieButton";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [K, setK] = useState(5);

  // Fetch movies based on search query and K value
  const fetchMovies = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/search/${queryText}/${K}`
    );
    const data = await response.json();
    setMovies(data);  // Set movies state with the fetched data
    console.log(data); // Log the data to check its structure
  };

  // const addMovie = async (movieDetails) => {
  //   const response = await fetch("http://localhost:3000/api/v1/add_movie", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ movieDetails }),
  //   });
  //   if (response.ok) {
  //     fetchMovies();
  //   }
  // };

  return (
    <>
      <div className="block lg:flex justify-center items-center m-2">
        <Search className='ml-2' onSearch={fetchMovies} setQueryText={setQueryText} />
        <ItemCounter initialCount={K} onCountChange={setK} />
        <AddMovieButton />
      </div>
      <div className="overflow-x-scroll whitespace-nowrap p-5">
        {movies.map((movie) => (
          <div className="flex lg:inline-block" key={movie.id}>
            <MovieCard
              movieImage={movie.posterLink}  // Ensure the key matches the movie object structure
              movieRating={movie.rating}
              movieGenre={movie.genre}
              movieName={movie.title}  // Match the property from API data
              movieCast={movie.actors}
              movieDescription={movie.description}
              movieAvailability={movie.availableOn}
              movieYear={movie.year}
              movieDirector={movie.director}
              movieDuration={movie.duration}
              movieLanguage={movie.language}
              movieReleaseDate={movie.releaseDate}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
