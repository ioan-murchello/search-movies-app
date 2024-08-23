import not_found from '../assets/not_found.svg'

const MoviesList = ({ movies, handleMovie }) => {

  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <li onClick={() => handleMovie(movie.imdbID)} key={movie.imdbID}>
          <img src={movie.Poster === 'N/A' ? not_found : movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default MoviesList;
