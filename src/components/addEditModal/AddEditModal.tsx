import React, { useContext } from 'react';
import './AddEditModal.scss';
import AddEditForm, { MovieInfo } from '../addEditForm/AddEditForm';
import { MovieContext } from '../../context/MovieContext';
import { ACTIONS } from '../../context/MovieReducer';

const AddEditModal: React.FC<{
  movie?: MovieInfo;
  addOrEdit: string;
  setIsEditModalOpen?: (a: boolean) => void;
  setIsEditResultModalOpen?: (a: boolean) => void;
}> = ({ movie, addOrEdit, setIsEditModalOpen, setIsEditResultModalOpen }) => {
  const { dispatch } = useContext(MovieContext);

  const closeModal = () => {
    dispatch({
      type: ACTIONS.SET_IS_ADD_MODAL_OPEN,
      payload: false,
    });
    setIsEditModalOpen && setIsEditModalOpen(false);
  };

  return (
    <>
      <div
        className="darkBG"
        onClick={closeModal}
        onKeyDown={closeModal}
        role="presentation"
      />
      <div className="centered">
        <div className="modal">
          <div className="modalContent">
            <div className="modalHeader">
              <h1 className="title">{addOrEdit} Movie</h1>
              <button className="closeBtn" onClick={closeModal}>
                x
              </button>
            </div>
            <AddEditForm
              addOrEdit={addOrEdit}
              movie={movie}
              setIsEditModalOpen={setIsEditModalOpen}
              setIsEditResultModalOpen={setIsEditResultModalOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditModal;
