import React, { useState, useContext } from 'react';
import './MovieItem.scss';
import useDetectClickOut from '../../hooks/useDetectClickOut';
import AddEditModal from '../addEditModal/AddEditModal';
import { MovieInfo } from '../addEditForm/AddEditForm';
import ResultModal from '../resultModal/ResultModal';
import ConfirmDeleteModal from '../confirmDeleteModal/ConfirmDeleteModal';
import { ACTIONS } from '../../context/MovieReducer';
import { MovieContext } from '../../context/MovieContext';

interface MovieItemProps {
  movie: MovieInfo;
  setIsDeleteResultModalOpen: (a: boolean) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  setIsDeleteResultModalOpen,
}) => {
  const {
    triggerRef,
    nodeRef,
    show: isContextMenuOpen,
    setShow: setIsContextMenuOpen,
  } = useDetectClickOut(false);

  const { dispatch } = useContext(MovieContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditResultModalOpen, setIsEditResultModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleImgClick = () => {
    dispatch({ type: ACTIONS.SET_MOVIE_FOR_DETAILS_VIEW, payload: movie });
    dispatch({ type: ACTIONS.SET_IS_MOVIE_DETAILS_OPEN, payload: true });
  };

  return (
    <>
      <div className="movie__item">
        <img
          src={movie.url}
          alt={movie.title}
          loading="lazy"
          onClick={handleImgClick}
          onKeyDown={handleImgClick}
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
              onClick={openEditModal}
              onKeyDown={openEditModal}
              role="presentation"
            >
              Edit
            </div>
            <div
              className="context__menu__item"
              onClick={openDeleteModal}
              onKeyDown={openDeleteModal}
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
            setIsEditModalOpen={setIsEditModalOpen}
            setIsEditResultModalOpen={setIsEditResultModalOpen}
            addOrEdit="Edit"
            movie={movie}
          />
        )}
        {isEditResultModalOpen && (
          <ResultModal
            setIsEditResultModalOpen={setIsEditResultModalOpen}
            isEdited={true}
          />
        )}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsDeleteResultModalOpen={setIsDeleteResultModalOpen}
            movie={movie}
          />
        )}
      </div>
    </>
  );
};

export default MovieItem;
