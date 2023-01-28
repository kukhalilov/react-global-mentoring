import React, { useEffect } from 'react';
import './MovieDetails.scss';
import { FaSearch } from 'react-icons/fa';
import { RootState } from '../../state/store';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMovie } from '../../state/features/movieDetailsSlice';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const movie = useSelector(
    (state: RootState) => state.movieDetails.selectedMovie,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie]);

  return (
    <div className="movie-details">
      {movie && (
        <>
          <div className="movie-details__content">
            <div className="movie-details__content__left">
              <img
                src={movie.poster_path}
                alt={movie.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://dummyimage.com/300x450/333/aaa';
                }}
              />
            </div>
            <div className="movie-details__content__right">
              <div className="movie-details__content__right__header">
                <div className="title-rating">
                  <h1>
                    {movie.title}
                    <span className="rating">{movie.vote_average}</span>
                  </h1>
                </div>
                <div className="genres">
                  <p>{movie.genres && movie.genres.join(', ')}</p>
                </div>
                <div className="date-runtime">
                  <span>{movie.release_date}</span>
                  <span>
                    {movie.runtime &&
                      (movie.runtime < 60
                        ? `${movie.runtime}min`
                        : `${Math.floor(+movie.runtime / 60)}h ${
                            +movie.runtime % 60
                          }min`)}
                  </span>
                </div>
              </div>
              <div className="overview">
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
          <div className="movie-details__back-to-search">
            <button
              type="button"
              onClick={() => {
                dispatch(setSelectedMovie(null));
              }}
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
