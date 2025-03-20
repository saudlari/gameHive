import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ButtonFav.css';

function ButtonFav({ game, isFavorite, onAddToFavorites, onRemoveFromFavorites }) {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = () => {
    if (isFavoriteState) {
      
      onRemoveFromFavorites(game);
    } else {
     
      onAddToFavorites(game);
    }

    
    setIsFavoriteState(prevState => !prevState);
  };

  return (
    <button
      className={`fav-button ${isFavoriteState ? 'active' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavoriteState ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        color: isFavoriteState ? 'gold' : 'grey',
      }}
    >
      <span className="star">&#9733;</span>
    </button>
  );
}

ButtonFav.propTypes = {
  game: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default ButtonFav;
