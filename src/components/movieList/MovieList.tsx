import './MovieList.scss';
import Genres from '../genres/Genres';
import Sort from '../sort/Sort';
import movies from '../../data';
import MovieItem from '../movieItem/MovieItem';

const MovieList = () => {
  return (
    <div className="movie__list">
      <div className="movie__list__header">
        <Genres genres={['all', 'documentary', 'comedy', 'horror', 'crime']} />
        <Sort />
      </div>
      <hr />
      <h3 className="count">8 movies found</h3>
      <div className="movie__list__content">
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
