import React, { useState } from 'react';
import { PlusIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { toast, Toaster } from 'sonner';

const AddMovieButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    genre: '',
    actors: '',
    description: '',
    posterLink: '',
    rating: '',
    availableOn: '',
    year: '',
    director: '',
    duration: '',
    language: '',
    releaseDate: ''
  });
  const [errors, setErrors] = useState({});

  const addMovie = async (movieDetails) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/add_movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieDetails }),
      });

      if (response.ok) {
        // Show success toast
        toast.success(`"${movieDetails.title}" has been added to your collection.`, {
          description: "Movie added successfully",
          duration: 3000,
        });

        // Fetch updated movies list
        if (fetchMovies) {
          fetchMovies();
        }
        
        // Close the modal and reset form
        setIsModalOpen(false);
        setMovieDetails({
          title: '',
          genre: '',
          actors: '',
          description: '',
          posterLink: '',
          rating: '',
          availableOn: '',
          year: '',
          director: '',
          duration: '',
          language: '',
          releaseDate: ''
        });
      } else {
        // Handle error case
        toast.error("There was a problem adding the movie. Please try again.", {
          description: "Add Movie Error",
        });
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("Unable to connect to the server. Please check your connection.", {
        description: "Network Error",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Make all fields mandatory
    Object.keys(movieDetails).forEach(key => {
      if (!movieDetails[key].trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    
    // Additional specific validations
    if (movieDetails.rating && (isNaN(movieDetails.rating) || 
        parseFloat(movieDetails.rating) < 0 || 
        parseFloat(movieDetails.rating) > 10)) {
      newErrors.rating = 'Rating must be a number between 0 and 10';
    }
    
    if (movieDetails.year && (isNaN(movieDetails.year) || 
        parseInt(movieDetails.year) < 1900 || 
        parseInt(movieDetails.year) > new Date().getFullYear())) {
      newErrors.year = 'Please enter a valid year';
    }

    // URL validation for poster link
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (movieDetails.posterLink && !urlPattern.test(movieDetails.posterLink)) {
      newErrors.posterLink = 'Please enter a valid URL';
    }

    // Validation for actors (ensure at least one actor)
    if (movieDetails.actors.split(',').filter(actor => actor.trim() !== '').length < 1) {
      newErrors.actors = 'At least one actor is required';
    }

    // Duration validation (optional: ensure it's in a valid format)
    const durationPattern = /^\d+\s*(min|hrs?|minutes?|hours?)$/i;
    if (movieDetails.duration && !durationPattern.test(movieDetails.duration)) {
      newErrors.duration = 'Duration should be in format like "120 min" or "2 hrs"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddMovie = () => {
    if (validateForm()) {
      onAddMovie(movieDetails);
      addMovie(movieDetails);
    }
  };

  const renderInput = (name, placeholder, type = 'text') => {
    const isTextArea = type === 'textarea';
    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-white mb-1">
          {placeholder.replace('*', '')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <InputComponent 
          id={name}
          type={isTextArea ? undefined : type}
          name={name}
          value={movieDetails[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={isTextArea ? 3 : undefined}
          className={`w-full p-2 border rounded focus:outline-none ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className='ml-2'>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center text-white px-4 py-2 rounded-lg transition-colors border-2"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Movie
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className=" p-4 lg:p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto border-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Add New Movie</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddMovie();
            }}>
              <div className="space-y-4">
                {renderInput('title', 'Title*')}
                {renderInput('genre', 'Genre*')}
                {renderInput('actors', 'Actors (comma separated)*')}
                {renderInput('description', 'Description*', 'textarea')}
                {renderInput('posterLink', 'Poster Link (URL)*')}
                {renderInput('rating', 'Rating (0-10)*')}
                {renderInput('availableOn', 'Available On*')}
                {renderInput('year', 'Year*')}
                {renderInput('director', 'Director*')}
                {renderInput('duration', 'Duration*')}
                {renderInput('language', 'Language*')}
                {renderInput('releaseDate', 'Release Date*')}
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-gray px-4 py-2 rounded-lg border-2 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => validateForm() ?? addMovie(movieDetails)}
                  type="submit"
                  className="border-2 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default AddMovieButton;