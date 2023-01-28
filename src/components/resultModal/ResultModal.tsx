import './ResultModal.scss';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import {
  setIsAddResultModalOpen,
  setIsEditResultModalOpen,
  setEditModalMovie,
  setIsDeleteResultModalOpen,
  setIsThereErrorInResult,
} from '../../state/features/modalsSlice';

interface ResultModalProps {
  isAdded?: boolean;
  isDeleted?: boolean;
  isEdited?: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isAdded,
  isEdited,
  isDeleted,
}) => {
  const dispatch = useDispatch();
  const isError = useSelector(
    (state: RootState) => state.modals.isThereErrorInResult,
  );

  const closeModal = () => {
    if (isAdded) {
      dispatch(setIsAddResultModalOpen(false));
    } else if (isEdited) {
      dispatch(setIsEditResultModalOpen(false));
      dispatch(setEditModalMovie(null));
    } else if (isDeleted) {
      dispatch(setIsDeleteResultModalOpen(false));
    }
    dispatch(setIsThereErrorInResult(false));
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
          {isError ? (
            <>
              <div className="error">
                <MdErrorOutline className="error__icon" />
              </div>
              <h2>Oops!</h2>
              <p>Something went wrong. Please try again later.</p>
            </>
          ) : (
            <>
              <div className="check">
                <div>
                  <span className="check__icon"></span>
                </div>
              </div>
              <h2>Congratulations!</h2>
              {isAdded && (
                <p>The movie has been added to database successfully</p>
              )}
              {isEdited && <p>The movie has been edited successfully</p>}
              {isDeleted && (
                <p>The movie has been deleted from database successfully</p>
              )}
            </>
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
