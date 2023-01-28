import './MovieList.scss';
import { useState } from 'react';
import Genres from '../genres/Genres';
import Sort from '../sort/Sort';
import MovieItem from '../movieItem/MovieItem';
import ResultModal from '../resultModal/ResultModal';
import { useGetMoviesQuery } from '../../state/api/moviesApi';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';

const MovieList = () => {
  const [sort, setSort] = useState('release_date');
  const [filter, setFilter] = useState<string[]>([]);

  const {
    data: moviesResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMoviesQuery({
    sortBy: sort,
    sortOrder: 'desc',
    filter: filter.length == 0 ? undefined : filter,
  });
  const movies = moviesResponse?.data;

  const modalsState = useSelector((state: RootState) => state.modals);

  return (
    <>
      <div className="movie__list">
        <div className="movie__list__header">
          <Genres filter={filter} setFilter={setFilter} />
          <Sort setSort={setSort} />
        </div>
        <hr />
        <h3 className="count">
          {movies?.length && movies?.length > 0 ? movies?.length : 'No'} movies
          found
        </h3>
        <div className="movie__list__content">
          {isLoading && (
            <div className="movie__list__loading">
              <h2>Loading...</h2>
            </div>
          )}
          {isError && 'error' in error && (
            <div className="movie__list__error">
              {JSON.stringify(error.error)}
            </div>
          )}
          {isSuccess &&
            movies?.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        </div>
      </div>
      {modalsState.isDeleteResultModalOpen && <ResultModal isDeleted={true} />}
    </>
  );
};

export default MovieList;
