import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './PublishButton.css';
import PublishAdModal from '../publishAdModal/PublishAdModal';

function PublishButton() {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const openPublishModal = () => {
    if (currentUser) {
      setShowPublishModal(true);
    } else {
      navigate('/login');
    }
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
