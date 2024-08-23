import { useEffect, useState } from 'react';
const apiKey = import.meta.env.VITE_MOVIE_KEY;

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
        );

        if (!res.ok) {
          throw new Error(
            'Could not fetch data, some problem... try again later'
          );
        }

        const response = await res.json();

        if (response.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(response.Search);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError(false);
      return;
    }

    callback?.();

    getMovies();

  }, [query]);

   

  return { isLoading, error, movies };
};
