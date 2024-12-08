import Header from "./Components/Header";
import MovieCard from "./Components/MovieCard";
import movies from "./Components/movies";
import Search from "./Components/Search";

const App = () => {
  return (
    <>
      <Search />
      <div className="overflow-x-scroll whitespace-nowrap p-5">
        {movies.map((movie) => (
          <div className="flex lg:inline-block" key={movie.movieName}>
            <MovieCard
              movieImage={movie.movieImage}
              movieRating={movie.movieRating}
              movieGenre={movie.movieGenre}
              movieName={movie.movieName}
              movieCast={movie.movieCast}
              movieDescription={movie.movieDescription}
              movieAvailability={movie.movieAvailability}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
