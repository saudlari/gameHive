import { useState } from 'react';
import PropTypes from 'prop-types';
import './ButtonFav.css';


function ButtonFav({ game, onAddToFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);

  
  const toggleFavorite = () => {
    setIsFavorite(prevState => !prevState);
    onAddToFavorites(game);
  };

  return (
    <button
      className={`fav-button ${isFavorite ? 'active' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="star">&#9733;</span>
    </button>
  );
}

ButtonFav.propTypes = {
  game: PropTypes.object.isRequired,
  onAddToFavorites: PropTypes.func.isRequired
};

export default ButtonFav;
