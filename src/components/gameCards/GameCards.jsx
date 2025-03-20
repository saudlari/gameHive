import PropTypes from 'prop-types';
import './GameCards.css';
import ButtonFav from '../button-fav/ButtonFav';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GameCard({ id, title, price, image, description, onClick, isNew, category, isFavorite, onAddToFavorites }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    addToCart({ 
      id, 
      title, 
      price, 
      image, 
      description,
      category
    });
    
    // Añadir efecto visual de confirmación
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500); // Vuelve al estado normal después de 1.5 segundos
  };

  const handleBuyNow = () => {
    // Primero añadimos al carrito
    addToCart({ 
      id, 
      title, 
      price, 
      image, 
      description,
      category
    });
    
    // Luego redirigimos al carrito
    navigate('/cart');
  };

  return (
    <div className="game-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="game-card-image-container">
        <img src={image} alt={title} className="game-card-image" />
        {isNew && <span className="new-badge">NUEVO</span>}
      </div>
      <div className="game-card-content">
        <h3 className="game-card-title">{title}</h3>
        <p className="game-card-description">{description.substring(0, 100)}...</p>
        <p className="game-card-price">${price}</p>
        {/* Pass all required props to ButtonFav */}
        <ButtonFav
          game={{ title, price, image, description }}
          isFavorite={isFavorite}
          onAddToFavorites={onAddToFavorites}
     />
        <div className="card-buttons">
          <button 
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            {isAdded ? 'Añadido' : 'Añadir al carrito'}
          </button>
          <button 
            className="buy-now-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleBuyNow();
            }}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  category: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired, // Make sure it's required for the favorite state
  onAddToFavorites: PropTypes.func.isRequired,
};

GameCard.defaultProps = {
  isNew: false,
};

export default GameCard;
