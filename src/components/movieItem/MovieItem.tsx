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
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  movies,
  setMovie,
  setMovies,
  setIsDeleteResultModalOpen,
}) => {
  const { triggerRef, nodeRef, show, setShow } = useDetectClickOut(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  return (
    <>
      <div className="movie__item">
        <img src={movie.url} alt={movie.title} loading="lazy" />
        <div className="title__date">
          <span>{movie.title}</span>
          <span>{movie.date}</span>
        </div>
        <p className="genre">{movie.genres && movie.genres.join(', ')}</p>
        {!show && (
          <div className="context" ref={triggerRef}>
            <span
              className="context__icon"
              onClick={() => setShow(true)}
              onKeyDown={() => setShow(true)}
              role="presentation"
            ></span>
          </div>
        )}
        {show && (
          <div className="context__menu" ref={nodeRef}>
            <div
              className="context__menu__item"
              onClick={() => setIsEditOpen(true)}
              onKeyDown={() => setIsEditOpen(true)}
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
              onClick={() => setShow(false)}
              onKeyDown={() => setShow(false)}
              role="presentation"
            >
              x
            </span>
          </div>
        )}
        {isEditOpen && (
          <AddEditModal
            setIsOpen={setIsEditOpen}
            addOrEdit="Edit"
            movie={movie}
            movies={movies}
            setMovie={setMovie}
            setShow={setShowResult}
          />
        )}
        {showResult && <ResultModal setShow={setShowResult} isEdited={true} />}
        {isConfirmDeleteOpen && (
          <ConfirmDeleteModal
            setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
            movie={movie}
            movies={movies}
            setMovies={setMovies}
            setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default MovieItem;
