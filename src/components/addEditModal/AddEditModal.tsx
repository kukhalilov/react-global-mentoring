import React from 'react';
import './AddEditModal.scss';
import AddEditForm, { MovieInfo } from '../addEditForm/AddEditForm';

const AddEditModal: React.FC<{
  setIsOpen: (a: boolean) => void;
  addOrEdit: string;
  movie?: MovieInfo;
  movies?: MovieInfo[];
  setMovie?: (a: MovieInfo) => void;
  addMovie?: (a: MovieInfo) => void;
  setShow?: (a: boolean) => void;
  setMovieWithDetails?: (a: MovieInfo) => void;
  movieWithDetails?: MovieInfo | null;
}> = ({
  setIsOpen,
  addOrEdit,
  movie,
  movies,
  setMovie,
  addMovie,
  setShow,
  setMovieWithDetails,
  movieWithDetails,
}) => {
  return (
    <>
      <div
        className="darkBG"
        onClick={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(false)}
        role="presentation"
      />
      <div className="centered">
        <div className="modal">
          <div className="modalContent">
            <div className="modalHeader">
              <h1 className="title">{addOrEdit} Movie</h1>
              <button className="closeBtn" onClick={() => setIsOpen(false)}>
                x
              </button>
            </div>
            <AddEditForm
              movie={movie}
              movies={movies}
              setMovie={setMovie}
              addMovie={addMovie}
              setIsOpen={setIsOpen}
              setShow={setShow}
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
