import React from 'react';
import './ConfirmDeleteModal.scss';
import { MovieInfo } from '../addEditForm/AddEditForm';

interface ConfirmDeleteProps {
  setIsConfirmDeleteOpen: (a: boolean) => void;
  movie: MovieInfo;
  movies: MovieInfo[];
  setMovies: (a: MovieInfo[]) => void;
  setIsDeleteResultModalOpen?: (a: boolean) => void;
  setIsMovieDetailsOpen: (a: boolean) => void;
  movieWithDetails: MovieInfo | null;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  setIsConfirmDeleteOpen,
  movie,
  movies,
  setMovies,
  setIsDeleteResultModalOpen,
  setIsMovieDetailsOpen,
  movieWithDetails,
}) => {
  const handleConfirmDelete = () => {
    const newMovies = movies.filter((m) => m.id !== movie.id);
    setMovies(newMovies);
    setIsConfirmDeleteOpen(false);
    setIsDeleteResultModalOpen && setIsDeleteResultModalOpen(true);
    if (movieWithDetails && movieWithDetails.id === movie.id) {
      setIsMovieDetailsOpen(false);
    }
  };

  return (
    <>
      <div
        className="confirm-delete-modal__overlay"
        onClick={() => setIsConfirmDeleteOpen(false)}
        onKeyDown={() => setIsConfirmDeleteOpen(false)}
        role="presentation"
      ></div>
      <div className="confirm-delete-modal">
        <div className="confirm-delete-modal__content">
          <h2>Delete Movie</h2>
          <p>Are you sure you want to delete this movie?</p>
          <button
            className="confirm-delete-modal__close"
            onClick={() => setIsConfirmDeleteOpen(false)}
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
