import React, { useEffect, useContext } from 'react';
import './MovieDetails.scss';
import { FaSearch } from 'react-icons/fa';
import { MovieContext } from '../../context/MovieContext';
import { ACTIONS } from '../../context/MovieReducer';

const MovieDetails = () => {
  const { state, dispatch } = useContext(MovieContext);
  const { movieForDetailsView: movie } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie]);

  return (
    <div className="movie-details">
      {movie && (
        <>
          <div className="movie-details__content">
            <div className="movie-details__content__left">
              <img src={movie.url} alt={movie.title} loading="lazy" />
            </div>
            <div className="movie-details__content__right">
              <div className="movie-details__content__right__header">
                <div className="title-rating">
                  <h1>
                    {movie.title}
                    <span className="rating">{movie.rating}</span>
                  </h1>
                </div>
                <div className="genres">
                  <p>{movie.genres && movie.genres.join(', ')}</p>
                </div>
                <div className="date-runtime">
                  <span>{movie.date}</span>
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
                dispatch({
                  type: ACTIONS.SET_IS_MOVIE_DETAILS_OPEN,
                  payload: false,
                });
                dispatch({
                  type: ACTIONS.SET_MOVIE_FOR_DETAILS_VIEW,
                  payload: null,
                });
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
