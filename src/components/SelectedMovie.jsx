import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import not_found from '../assets/not_found.svg'
import useKey from './useKey';

const key = import.meta.env.VITE_MOVIE_KEY;

const SelectedMovie = ({ id, resetId, handleAddMovie, watched }) => {
  
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const isWatched = watched.map((el) => el.imdbID).includes(id);
  const watchedUserRating = watched.find((el) => el.imdbID === id)?.userRating; 

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: relased,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: id,
      imdbRating: Number(imdbRating),
      title,
      year,
      poster: poster === 'N/A' ? not_found : poster,
      runtime: runtime === 'N/A' ? '20' : Number(runtime.split(' ').at(0)),
      userRating,
    };
    handleAddMovie(newWatchedMovie);
    resetId();
  };

  useKey('Escape', resetId) 

  useEffect(() => {
    const getMovie = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${id}`
        );
        if (!res.ok) {
          throw new Error('Unfornetly movie not found...');
        }
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  return (
    <>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <div className='details'>
          <header>
            <button className='btn-back' onClick={resetId}>
              &larr;
            </button>
            <img
              src={poster === 'N/A' ? not_found : poster}
              alt={`Poster of ${movie} movie`}
            />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {relased} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMBd rating
              </p>
              <p>{year}</p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating setUserRating={setUserRating} />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
};
export default SelectedMovie;
