import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

const Modal = ({ children, isModalOpen, toggleModal }) => {
  const id = uuidV4();

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  return (
    <div
      className={`modal fade ${isModalOpen ? 'show' : ''}`}
      id={`${id}-modal`}
      tabIndex="-1"
      aria-labelledby={`${id}-modal-label`}
      style={isModalOpen ? { display: 'block' } : {}}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}-modal-label`}>
              Modal
            </h5>
            <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
