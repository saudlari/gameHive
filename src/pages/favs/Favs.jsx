import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import GameCard from '../../components/gameCards/GameCards.jsx';
import './Favs.css';

function Favs() {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteGames(favorites);
  }, []);

  const handleGoBack = () => {
    navigate('/'); 
  };

  
  const handleRemoveFromFavorites = (gameToRemove) => {
    const updatedFavorites = favoriteGames.filter(game => game.id !== gameToRemove.id); 
    setFavoriteGames(updatedFavorites); 

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <section className="favs">
           <nav className="go-back">
        <button className="go-back-button" onClick={handleGoBack}>Volver</button>
      </nav>
      <h2 className="home-title tilt-warp">Juegos Favoritos</h2>

   

      <div className="games-container">
        {favoriteGames.length === 0 ? (
          <div className="no-favorites-message">
            No tienes juegos en tus favoritos.
          </div>
        ) : (
          <div className="games-grid">
            {favoriteGames.map(game => (
              <div key={game.id} className="favorite-game-card">
                <GameCard 
                  title={game.title} 
                  price={game.price} 
                  image={game.image} 
                  description={game.description}
                />
               
                <button 
                  className="remove-favorite-button"
                  onClick={() => handleRemoveFromFavorites(game)} 
                >
                  Eliminar de favoritos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
 
    </section>
  );
}

export default Favs;
