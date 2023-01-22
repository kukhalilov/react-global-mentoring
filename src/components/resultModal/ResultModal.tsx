import './ResultModal.scss';

interface ResultModalProps {
  isAdded?: boolean;
  isDeleted?: boolean;
  isEdited?: boolean;
  setShow?: (a: boolean) => void;
  setIsDeleteResultModalOpen?: (a: boolean) => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isAdded,
  isEdited,
  isDeleted,
  setShow,
  setIsDeleteResultModalOpen,
}) => {
  const handleClose = () => {
    if (setShow) {
      setShow(false);
    } else if (setIsDeleteResultModalOpen) {
      setIsDeleteResultModalOpen(false);
    }
  };

  return (
    <>
      <div
        className="add-edit-result-modal__overlay"
        onClick={handleClose}
        onKeyDown={handleClose}
        role="presentation"
      ></div>
      <div className="add-edit-result-modal">
        <div className="add-edit-result-modal__content">
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
          <button
            className="add-edit-result-modal__close"
            onClick={handleClose}
          >
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultModal;
