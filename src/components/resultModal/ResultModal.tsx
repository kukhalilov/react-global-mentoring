import './ResultModal.scss';
import { useContext } from 'react';
import { MovieContext } from '../../context/MovieContext';
import { ACTIONS } from '../../context/MovieReducer';

interface ResultModalProps {
  isAdded?: boolean;
  isDeleted?: boolean;
  isEdited?: boolean;
  setIsDeleteResultModalOpen?: (a: boolean) => void;
  setIsEditResultModalOpen?: (a: boolean) => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isAdded,
  isEdited,
  isDeleted,
  setIsDeleteResultModalOpen,
  setIsEditResultModalOpen,
}) => {
  const { dispatch } = useContext(MovieContext);

  const closeModal = () => {
    if (isAdded) {
      dispatch({
        type: ACTIONS.SET_IS_ADD_RESULT_MODAL_OPEN,
        payload: false,
      });
    } else if (isEdited) {
      setIsEditResultModalOpen!(false);
    } else if (isDeleted) {
      setIsDeleteResultModalOpen!(false);
    }
  };

  return (
    <>
      <div
        className="result-modal__overlay"
        onClick={closeModal}
        onKeyDown={closeModal}
        role="presentation"
      ></div>
      <div className="result-modal">
        <div className="result-modal__content">
          <div className="check">
            <div>
              <span className="check__icon"></span>
            </div>
          </div>
          <h2>Congratulations!</h2>
          {isAdded && <p>The movie has been added to database successfully</p>}
          {isEdited && <p>The movie has been edited successfully</p>}
          {isDeleted && (
            <p>The movie has been deleted from database successfully</p>
          )}
          <button className="result-modal__close" onClick={closeModal}>
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultModal;
