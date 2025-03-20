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

  return (
    <section className="favs">
      <h2>Juegos Favoritos</h2>

     <nav className="go-back"> <button className="go-back-button" onClick={handleGoBack}>Volver</button> </nav>
     

      <div className="games-container">
        {favoriteGames.length === 0 ? (
          <div className="no-favorites-message">
            No tienes juegos en tus favoritos.
          </div>
        ) : (
          <div className="games-grid">
            {favoriteGames.map(game => (
              <GameCard 
                key={game.id} 
                title={game.title} 
                price={game.price} 
                image={game.image} 
                description={game.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Favs;
