const Search = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="relative w-96">
        <input
          type="text"
          className="w-full h-12 px-4 pr-12 border-2 border-white bg-black text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:transparent"
          placeholder="What Kind of movie do you crave???"
        />
        <button className="absolute top-2 right-2 text-white hover:text-white transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.35-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
