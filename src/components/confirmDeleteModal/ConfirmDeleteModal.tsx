import React, { useContext } from 'react';
import './ConfirmDeleteModal.scss';
import { MovieContext } from '../../context/MovieContext';
import { ACTIONS } from '../../context/MovieReducer';
import { MovieInfo } from '../addEditForm/AddEditForm';

interface ConfirmDeleteModalProps {
  movie: MovieInfo;
  setIsDeleteModalOpen: (a: boolean) => void;
  setIsDeleteResultModalOpen: (a: boolean) => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteModalProps> = ({
  movie,
  setIsDeleteModalOpen,
  setIsDeleteResultModalOpen,
}) => {
  const { state, dispatch } = useContext(MovieContext);
  const { movieForDetailsView } = state;
  console.log('movie', movie);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    closeDeleteModal();
    if (movieForDetailsView && movieForDetailsView.id === movie.id) {
      dispatch({ type: ACTIONS.SET_MOVIE_FOR_DETAILS_VIEW, payload: null });
      dispatch({ type: ACTIONS.SET_IS_MOVIE_DETAILS_OPEN, payload: false });
    }
    dispatch({
      type: ACTIONS.DELETE_MOVIE,
      payload: movie.id,
    });
    setIsDeleteResultModalOpen(true);
  };

  return (
    <>
      <div
        className="confirm-delete-modal__overlay"
        onClick={closeDeleteModal}
        onKeyDown={closeDeleteModal}
        role="presentation"
      ></div>
      <div className="confirm-delete-modal">
        <div className="confirm-delete-modal__content">
          <h2>Delete Movie</h2>
          <p>Are you sure you want to delete this movie?</p>
          <button
            className="confirm-delete-modal__close"
            onClick={closeDeleteModal}
          >
            x
          </button>
          <button className="confirm" onClick={handleConfirmDelete}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
