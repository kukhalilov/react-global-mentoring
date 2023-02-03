import React from 'react';
import './AddEditModal.scss';
import AddEditForm from '../addEditForm/AddEditForm';
import { useDispatch } from 'react-redux';
import {
  setIsAddModalOpen,
  setEditModalMovie,
} from '../../state/features/modalsSlice';

const AddEditModal: React.FC<{
  addOrEdit: string;
}> = ({ addOrEdit }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setIsAddModalOpen(false));
    dispatch(setEditModalMovie(null));
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
            <AddEditForm addOrEdit={addOrEdit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditModal;
