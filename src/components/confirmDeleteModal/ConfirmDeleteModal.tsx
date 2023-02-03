import React from 'react';
import './ConfirmDeleteModal.scss';
import { RootState } from '../../state/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDeleteModalMovie,
  setIsDeleteResultModalOpen,
  setIsThereErrorInResult,
} from '../../state/features/modalsSlice';
import { setSelectedMovie } from '../../state/features/movieDetailsSlice';
import { useDeleteMovieMutation } from '../../state/api/moviesApi';

const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const movieForDetailsView = useSelector(
    (state: RootState) => state.movieDetails.selectedMovie,
  );
  const movie = useSelector(
    (state: RootState) => state.modals.deleteModalMovie,
  );
  const [deleteMovie] = useDeleteMovieMutation();

  const closeDeleteModal = () => {
    dispatch(setDeleteModalMovie(null));
  };

  const handleConfirmDelete = async () => {
    const res = await deleteMovie(movie?.id as number);
    if ('error' in res) {
      dispatch(setIsThereErrorInResult(true));
    } else {
      if (movieForDetailsView && movieForDetailsView.id === movie?.id) {
        dispatch(setSelectedMovie(null));
      }
    }
    dispatch(setIsDeleteResultModalOpen(true));
    closeDeleteModal();
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
