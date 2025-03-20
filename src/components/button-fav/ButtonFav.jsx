import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ButtonFav.css';


function ButtonFav({ game, onAddToFavorites, isFavorite }) {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  useEffect(() => {
    setIsFavoriteState(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = () => {
    setIsFavoriteState(prevState => !prevState);
    onAddToFavorites(game);
  };

  return (
    <button
      className={`fav-button ${isFavorite ? 'active' : ''}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        color: isFavoriteState ? 'gold' : 'grey'
       
      }}
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