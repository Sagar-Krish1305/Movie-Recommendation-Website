import React, { useState } from 'react';

const Search = ({ onSearch, setQueryText }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setQueryText(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className="relative w-96 m-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full h-12 px-4 pr-12 border-2 border-white bg-black text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:transparent"
        placeholder="What Kind of movie do you crave???"
      />
      <button
        onClick={handleSearchClick}
        className="absolute top-2 right-2 text-white hover:text-white transition duration-200"
      >
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
  );
};

export default Search;