import React from 'react';
import './MovieItem.scss';
import useDetectClickOut from '../../hooks/useDetectClickOut';
import AddEditModal from '../addEditModal/AddEditModal';
import ResultModal from '../resultModal/ResultModal';
import ConfirmDeleteModal from '../confirmDeleteModal/ConfirmDeleteModal';
import Movie from '../../types/Movie';
import { RootState } from '../../state/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditModalMovie,
  setDeleteModalMovie,
} from '../../state/features/modalsSlice';
import { setSelectedMovie } from '../../state/features/movieDetailsSlice';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const {
    triggerRef,
    nodeRef,
    show: isContextMenuOpen,
    setShow: setIsContextMenuOpen,
  } = useDetectClickOut(false);

  const dispatch = useDispatch();
  const modalsState = useSelector((state: RootState) => state.modals);

  const openEditModal = () => {
    dispatch(setEditModalMovie(movie));
    setIsContextMenuOpen(false);
  };

  const openDeleteModal = () => {
    dispatch(setDeleteModalMovie(movie));
    setIsContextMenuOpen(false);
  };

  const handleImgClick = () => {
    dispatch(setSelectedMovie(movie));
  };

  return (
    <>
      <div className="movie__item">
        <img
          src={movie.poster_path}
          alt={movie.title}
          loading="lazy"
          onClick={handleImgClick}
          onKeyDown={handleImgClick}
          role="presentation"
          onError={(e) => {
            e.currentTarget.src = 'https://dummyimage.com/300x450/333/aaa';
          }}
        />
        <div className="title__date">
          <span>{movie.title}</span>
          <span>{movie.release_date}</span>
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
        {!modalsState.isEditResultModalOpen &&
          modalsState.editModalMovie &&
          modalsState.editModalMovie.id == movie.id && (
            <AddEditModal addOrEdit="Edit" />
          )}
        {modalsState.isEditResultModalOpen &&
          modalsState.editModalMovie &&
          modalsState.editModalMovie.id == movie.id && (
            <ResultModal isEdited={true} />
          )}
        {modalsState.deleteModalMovie &&
          modalsState.deleteModalMovie.id == movie.id && <ConfirmDeleteModal />}
      </div>
    </>
  );
};

export default MovieItem;
