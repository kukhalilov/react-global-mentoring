import React from 'react';
import './AddModal.scss';

const Modal: React.FC<{ setIsOpen: (a: boolean) => void }> = ({
  setIsOpen,
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
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            x
          </button>
          <div className="modalContent">Modal content</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
