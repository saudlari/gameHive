import PropTypes from 'prop-types';
import './GameCards.css';

function GameCard({ title, price, image, description }) {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-card-image" />
      <div className="game-card-content">
        <h3 className="game-card-title">{title}</h3>
        <p className="game-card-description">{description}</p>
        <p className="game-card-price">${price}</p>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GameCard;
