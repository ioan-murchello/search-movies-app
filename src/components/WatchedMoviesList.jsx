import WatchedMovie from './WatchedMovie';

const WatchedMoviesList = ({ watched, handleDeleteWatched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
};
export default WatchedMoviesList;
