import PropTypes from 'prop-types';
import ContactForm from '../contactForm/ContacForm.jsx';
import './GameModal.css';
import ButtonFav from '../button-fav/ButtonFav.jsx';

function GameModal({ game, onClose }) {
  if (!game) return null;

  const displayGame = {
    ...game,
    contactEmail: game.contact_email || game.contactEmail,
    contactPhone: game.contact_phone || game.contactPhone
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2>{game.title}</h2>
        </div>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={game.image} alt={game.title} className="modal-image" />
          </div>
          <div className="modal-details">
            <p className="modal-description">{game.description}</p>
            <p className="modal-category">Categoría: {game.category}</p>
            <p className="modal-price">Precio: ${game.price}</p>
            
            <ContactForm gameId={game.id} gameTitle={game.title} />
          </div>
          <div className="contact-info">
            <h4>Información de contacto:</h4>
            <p>Email: {displayGame.contactEmail}</p>
            {displayGame.contactPhone && <p>Teléfono: {displayGame.contactPhone}</p>}
          </div>
        </div>
        <div className="modal-footer">
          <button className="buy-button">Comprar</button>
        </div>
      </div>
    </div>
  );
}

GameModal.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default GameModal;