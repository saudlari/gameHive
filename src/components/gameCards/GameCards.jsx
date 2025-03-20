import PropTypes from 'prop-types';
import './GameCards.css';
import ButtonFav from '../button-fav/ButtonFav';
import { useCart } from '../../CartContext';

function GameCard({ title, price, image, description, onClick, isNew }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({ title, price, image, description });
    // Opcional: mostrar alguna notificación de éxito
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
        <ButtonFav>
          
                   
           </ButtonFav>
        <button 
          className="add-to-cart-btn" 
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isNew: PropTypes.bool
};

GameCard.defaultProps = {
  isNew: false
};

export default GameCard;
