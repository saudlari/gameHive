import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/gameCards/GameCards.jsx';
import GameModal from '../components/gameModal/GameModal.jsx';
import '../pages/Home.css';

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/games');
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Error al cargar los juegos. Por favor, intenta más tarde.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  if (loading) return <div>Cargando juegos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home">
      <h2 className="home-title">Juegos Destacados</h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard
            key={game.id}
            title={game.title}
            price={game.price}
            image={game.image}
            description={game.description}
            onClick={() => handleGameClick(game)}
          />
        ))}
      </div>
      
      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default Home;
