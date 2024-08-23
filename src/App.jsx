import Navbar from './components/Navbar';
import Main from './components/Main';
import Search from './components/Search';
import NumResults from './components/NumResults';
import { useEffect, useState } from 'react';
import Box from './components/Box';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';
import MoviesList from './components/MoviesList';
import SelectedMovie from './components/SelectedMovie';
import { useMovies } from './components/useMovies';

const App = () => {
  const [query, setQuery] = useState('matrix'); 
  const [watched, setWatched] = useState(() => {
    const local = localStorage.getItem('watched');
    return JSON.parse(local) || [];
  });
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleMovie = (id) => {
    setSelectedMovieId((selected) => (id === selected ? null : id));
  };

  const handleAddMovie = (movie) => {
    setWatched((watchedList) => [...watchedList, movie]);
  };

  const resetId = () => {
    setSelectedMovieId(null);
  };

  const { isLoading, error, movies } = useMovies(query, resetId);

  const handleDeleteWatched = (id) => {
    setWatched((el) => el.filter((m) => m.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <Navbar>
        <Search value={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      {error && <p className='error'>🆘 {error}</p>}
      <Main>
        {!online && (
          <p style={{ fontSize: '18px', color: '#ff5b49' }}>
            You have no internet connection
          </p>
        )}
        <Box title='Finded movies'>
          {isLoading && <div className='loader'></div>}
          {!isLoading && !error && (
            <MoviesList movies={movies} handleMovie={handleMovie} />
          )}
        </Box>
        <Box title='Watched movies'>
          {selectedMovieId ? (
            <SelectedMovie
              id={selectedMovieId}
              resetId={resetId}
              handleAddMovie={handleAddMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
