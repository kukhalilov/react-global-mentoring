import './MovieList.scss';
import Genres from '../genres/Genres';
import Sort from '../sort/Sort';
import MovieItem from '../movieItem/MovieItem';
import { MovieInfo } from '../addEditForm/AddEditForm';
import React from 'react';
import ResultModal from '../resultModal/ResultModal';

interface MovieListProps {
  movies: MovieInfo[];
  setMovies: (a: MovieInfo[]) => void;
  setIsMovieDetailsOpen: (a: boolean) => void;
  setMovieWithDetails: (a: MovieInfo) => void;
  movieWithDetails: MovieInfo | null;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  setMovies,
  setIsMovieDetailsOpen,
  setMovieWithDetails,
  movieWithDetails,
}) => {
  const [isDeleteResultModalOpen, setIsDeleteResultModalOpen] =
    React.useState(false);
  const [sortState, setSortState] = React.useState('date');

  const sortMethods = {
    date: (a: MovieInfo, b: MovieInfo) => {
      const dateA = new Date(a.date ? a.date : '');
      const dateB = new Date(b.date ? b.date : '');
      return dateB.getTime() - dateA.getTime();
    },
    genre: (a: MovieInfo, b: MovieInfo) => {
      const genreA = a.genres && a.genres[0];
      const genreB = b.genres && b.genres[0];
      if (genreA && genreB && genreA < genreB) {
        return -1;
      }
      if (genreA && genreB && genreA > genreB) {
        return 1;
      }
      return 0;
    },
    rating: (a: MovieInfo, b: MovieInfo) => {
      if (a.rating && b.rating) {
        return +b.rating - +a.rating;
      }
      return 0;
    },
  };

  const setMovie = (movie: MovieInfo) => {
    const newMovies = movies.map((m) => {
      if (m.id === movie.id) {
        return movie;
      }
      return m;
    });
    setMovies(newMovies);
  };

  const genres = movies.map((movie) => movie.genres);
  const flattenedGenres = Array.from(new Set(genres.flat()));
  const allGenres = flattenedGenres.length
    ? ['All', ...flattenedGenres]
    : ['All'];

  const sortedMovies = movies.sort(
    sortMethods[sortState as keyof typeof sortMethods],
  );

  return (
    <>
      <div className="movie__list">
        <div className="movie__list__header">
          <Genres genres={allGenres as string[]} />
          <Sort setSortState={setSortState} />
        </div>
        <hr />
        <h3 className="count">{movies.length} movies found</h3>
        <div className="movie__list__content">
          {sortedMovies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              movies={movies}
              setMovie={setMovie}
              setMovies={setMovies}
              setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
              setIsMovieDetailsOpen={setIsMovieDetailsOpen}
              setMovieWithDetails={setMovieWithDetails}
              movieWithDetails={movieWithDetails}
            />
          ))}
        </div>
      </div>
      {isDeleteResultModalOpen && (
        <ResultModal
          isDeleted={true}
          setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
        />
      )}
    </>
  );
};

export default MovieList;
