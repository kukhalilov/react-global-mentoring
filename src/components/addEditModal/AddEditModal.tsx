import React from 'react';
import './AddEditModal.scss';
import AddEditForm, { MovieInfo } from '../addEditForm/AddEditForm';

const AddEditModal: React.FC<{
  setIsAddEditModalOpen: (a: boolean) => void;
  addOrEdit: string;
  movie?: MovieInfo;
  movies?: MovieInfo[];
  setMovie?: (a: MovieInfo) => void;
  addMovie?: (a: MovieInfo) => void;
  setIsAddEditResultModalOpen?: (a: boolean) => void;
  setMovieWithDetails?: (a: MovieInfo) => void;
  movieWithDetails?: MovieInfo | null;
}> = ({
  setIsAddEditModalOpen,
  addOrEdit,
  movie,
  movies,
  setMovie,
  addMovie,
  setIsAddEditResultModalOpen,
  setMovieWithDetails,
  movieWithDetails,
}) => {
  return (
    <>
      <div
        className="darkBG"
        onClick={() => setIsAddEditModalOpen(false)}
        onKeyDown={() => setIsAddEditModalOpen(false)}
        role="presentation"
      />
      <div className="centered">
        <div className="modal">
          <div className="modalContent">
            <div className="modalHeader">
              <h1 className="title">{addOrEdit} Movie</h1>
              <button
                className="closeBtn"
                onClick={() => setIsAddEditModalOpen(false)}
              >
                x
              </button>
            </div>
            <AddEditForm
              movie={movie}
              movies={movies}
              setMovie={setMovie}
              addMovie={addMovie}
              setIsAddEditModalOpen={setIsAddEditModalOpen}
              setIsAddEditResultModalOpen={setIsAddEditResultModalOpen}
              setMovieWithDetails={setMovieWithDetails}
              movieWithDetails={movieWithDetails}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditModal;
