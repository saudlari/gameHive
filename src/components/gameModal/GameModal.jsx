import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from '../contactForm/ContacForm.jsx';
import './GameModal.css';
import { useCart } from "../../CartContext.jsx";
import { useNavigate } from 'react-router-dom';

function GameModal({ game, onClose }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!game) return null;

  const handleBuy = () => {
    addToCart(game);
    onClose();
    navigate('/carrito'); // Redirige a la página del carrito
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
        </div>
        <div className="modal-footer">
          <button className="buy-button" onClick={handleBuy}>Comprar</button>
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
