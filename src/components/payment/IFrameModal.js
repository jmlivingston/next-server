import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';

const IFrameModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iFrameLoadCount, setIFrameLoadCount] = useState(1);
  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.returnValue = '';
        return false;
      };
    }
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const onLoad = () => {
    if (iFrameLoadCount % 2 == 0) {
      toggleModal();
    }
    setIFrameLoadCount(iFrameLoadCount + 1);
  };

  return (
    <>
      <button
        className="btn btn-primary me-2"
        onClick={() => {
          setIsTop(false);
          toggleModal();
        }}
      >
        Redirect using window.location.href
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsTop(true);
          toggleModal();
        }}
      >
        Redirect using window.top.location.href
      </button>
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal}>
        {isModalOpen && (
          <iframe
            onLoad={onLoad}
            src={
              isModalOpen
                ? `https://viking-cruises.github.io/olb-mock-redirector?redirect=https://www.google.com${
                    isTop ? '&top=true' : ''
                  }`
                : null
            }
            sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock 
              allow-pointer-lock allow-popups allow-popups-to-escape-sandbox 
              allow-presentation allow-same-origin allow-scripts
              allow-storage-access-by-user-activation"
          ></iframe>
        )}
      </Modal>
    </>
  );
};

IFrameModal.propTypes = {};

export default IFrameModal;
