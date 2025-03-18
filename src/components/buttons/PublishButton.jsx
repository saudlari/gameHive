import { useState } from 'react';
import PropTypes from 'prop-types';
import './PublishButton.css';
import PublishAdModal from '../publishAdModal/PublishAdModal';

function PublishButton() {
  const [showPublishModal, setShowPublishModal] = useState(false);

  const openPublishModal = () => {
    setShowPublishModal(true);
  };

  const closePublishModal = () => {
    setShowPublishModal(false);
  };

  return (
    <>
      <button onClick={openPublishModal} className="publish-button">
        Publicar Anuncio
      </button>
      
      {showPublishModal && (
        <PublishAdModal onClose={closePublishModal} />
      )}
    </>
  );
}

export default PublishButton;
