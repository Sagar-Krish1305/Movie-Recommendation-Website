import React from "react";

const MovieCard = ({
  movieImage,
  movieRating,
  movieGenre,
  movieName,
  movieCast,
  movieDescription,
  movieAvailability,
}) => {

  return (
    <div className="m-5 border-white bg-black rounded-lg shadow-lg border-2 flex flex-col w-96 max-w-xs h-auto text-wrap hover:scale-105 ease-in duration-150 p-5">
      <img
        src={movieImage}
        alt={`${movieName} Poster`}
        className="h-64 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white">{movieName}</h2>
        <p className="text-yellow-400 font-bold">{movieRating}</p>
        <p className="text-gray-400 italic">{movieGenre}</p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Cast:</span> {movieCast}
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Description:</span>{" "}
          <span className="block text-sm text-gray-300">{movieDescription}</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="font-bold text-white">Available On:</span>
          {movieAvailability.map((platform, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-600 text-white text-sm rounded-lg"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
