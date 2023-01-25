import './MovieList.scss';
import Genres from '../genres/Genres';
import Sort, { sortMethods } from '../sort/Sort';
import MovieItem from '../movieItem/MovieItem';
import React, { useContext, useState } from 'react';
import ResultModal from '../resultModal/ResultModal';
import { MovieContext } from '../../context/MovieContext';

const MovieList = () => {
  const {
    state: { movies },
  } = useContext(MovieContext);

  const [isDeleteResultModalOpen, setIsDeleteResultModalOpen] = useState(false);

  const [sortState, setSortState] = useState('date');

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
              setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
            />
          ))}
        </div>
      </div>
      {isDeleteResultModalOpen && (
        <ResultModal
          setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
          isDeleted={true}
        />
      )}
    </>
  );
};

export default MovieList;
