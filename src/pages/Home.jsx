import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCards.jsx';
import '../pages/Home.css';

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
