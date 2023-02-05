import './MovieList.scss';
import Genres from '../genres/Genres';
import Sort from '../sort/Sort';
import MovieItem from '../movieItem/MovieItem';
import ResultModal from '../resultModal/ResultModal';
import { useGetMoviesQuery } from '../../state/api/moviesApi';
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const MovieList = () => {
  const { searchQuery } = useParams<{ searchQuery?: string }>();
  const [searchParams] = useSearchParams();
  const genres = searchParams.get('genre')?.split(',');
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const {
    data: moviesResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMoviesQuery({
    sortBy: sortBy || 'release_date',
    sortOrder: sortOrder || 'desc',
    filter: genres?.length == 0 ? undefined : genres,
    search: searchQuery,
    searchBy: 'title',
    limit: searchQuery || genres ? 100 : 20,
  });
  const movies = moviesResponse?.data;

  const modalsState = useSelector((state: RootState) => state.modals);

  return (
    <>
      <div className="movie__list">
        <div className="movie__list__header">
          <Genres />
          <Sort />
        </div>
        <hr />
        <h3 className="count">
          {searchQuery || genres?.length
            ? `${
                movies?.length && movies?.length > 0 ? movies?.length : 'No'
              } movies found`
            : movies?.length && movies?.length > 0
            ? `showing ${movies?.length} of ${moviesResponse?.totalAmount} movies`
            : 'No movies found'}
        </h3>

        <div className="movie__list__content">
          {isLoading && (
            <div className="movie__list__loading">
              <h2>Loading...</h2>
            </div>
          )}
          {isError && 'error' in error && (
            <div className="movie__list__error">
              <h2>Failed to fetch</h2>
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
