import React from 'react';
import './MovieItem.scss';
import useDetectClickOut from '../../hooks/useDetectClickOut';
import AddEditModal from '../addEditModal/AddEditModal';
import { MovieInfo } from '../addEditForm/AddEditForm';
import ResultModal from '../resultModal/ResultModal';
import ConfirmDeleteModal from '../confirmDeleteModal/ConfirmDeleteModal';

interface MovieItemProps {
  movie: MovieInfo;
  movies: MovieInfo[];
  setMovie: (a: MovieInfo) => void;
  setMovies: (a: MovieInfo[]) => void;
  setIsDeleteResultModalOpen?: (a: boolean) => void;
  setIsMovieDetailsOpen: (a: boolean) => void;
  setMovieWithDetails: (a: MovieInfo) => void;
  movieWithDetails: MovieInfo | null;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  movies,
  setMovie,
  setMovies,
  setIsDeleteResultModalOpen,
  setIsMovieDetailsOpen,
  setMovieWithDetails,
  movieWithDetails,
}) => {
  const {
    triggerRef,
    nodeRef,
    show: isContextMenuOpen,
    setShow: setIsContextMenuOpen,
  } = useDetectClickOut(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
  const [isEditResultModalOpen, setIsEditResultModalOpen] =
    React.useState(false);

  const handleClick = () => {
    setIsMovieDetailsOpen(true);
    setMovieWithDetails(movie);
  };

  return (
    <>
      <div className="movie__item">
        <img
          src={movie.url}
          alt={movie.title}
          loading="lazy"
          onClick={handleClick}
          onKeyDown={handleClick}
          role="presentation"
        />
        <div className="title__date">
          <span>{movie.title}</span>
          <span>{movie.date}</span>
        </div>
        <p className="genre">{movie.genres && movie.genres.join(', ')}</p>
        {!isContextMenuOpen && (
          <div className="context" ref={triggerRef}>
            <span
              className="context__icon"
              onClick={() => setIsContextMenuOpen(true)}
              onKeyDown={() => setIsContextMenuOpen(true)}
              role="presentation"
            ></span>
          </div>
        )}
        {isContextMenuOpen && (
          <div className="context__menu" ref={nodeRef}>
            <div
              className="context__menu__item"
              onClick={() => setIsEditModalOpen(true)}
              onKeyDown={() => setIsEditModalOpen(true)}
              role="presentation"
            >
              Edit
            </div>
            <div
              className="context__menu__item"
              onClick={() => setIsConfirmDeleteOpen(true)}
              onKeyDown={() => setIsConfirmDeleteOpen(true)}
              role="presentation"
            >
              Delete
            </div>
            <span
              className="close"
              onClick={() => setIsContextMenuOpen(false)}
              onKeyDown={() => setIsContextMenuOpen(false)}
              role="presentation"
            >
              x
            </span>
          </div>
        )}
        {isEditModalOpen && (
          <AddEditModal
            setIsAddEditModalOpen={setIsEditModalOpen}
            addOrEdit="Edit"
            movie={movie}
            movies={movies}
            setMovie={setMovie}
            setIsAddEditResultModalOpen={setIsEditResultModalOpen}
            setMovieWithDetails={setMovieWithDetails}
            movieWithDetails={movieWithDetails}
          />
        )}
        {isEditResultModalOpen && (
          <ResultModal
            setIsAddEditResultModalOpen={setIsEditResultModalOpen}
            isEdited={true}
          />
        )}
        {isConfirmDeleteOpen && (
          <ConfirmDeleteModal
            setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
            movie={movie}
            movies={movies}
            setMovies={setMovies}
            setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
            setIsMovieDetailsOpen={setIsMovieDetailsOpen}
            movieWithDetails={movieWithDetails}
          />
        )}
      </div>
    </>
  );
};

export default MovieItem;
