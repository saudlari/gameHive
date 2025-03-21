import { useState, useEffect } from 'react';
import { gameService } from '../../services/api.js';
import GameCard from '../../components/gameCards/GameCards.jsx';
import GameModal from '../../components/gameModal/GameModal.jsx';
import SearchFilter from '../../components/searchFilter/SearchFilter.jsx';
import './Home.css';

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [categories, setCategories] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToFavorites = (game) => {
    const updatedFavorites = [...favorites, game];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await gameService.getAllGames();
        setGames(response);
        setFilteredGames(response);
        

        const uniqueCategories = [...new Set(response.map(game => 
          game.category ? game.category : 'Otros'
        ))];
        setCategories(uniqueCategories);
        
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

  const handleFilterChange = (filters) => {
    let result = [...games];
    
  
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm)
      );
    }
    
 
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      result = result.filter(game => game.price >= minPrice);
    }
    

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      result = result.filter(game => game.price <= maxPrice);
    }
    

    if (filters.category) {
      result = result.filter(game => 
        game.category && game.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    setFilteredGames(result);
  };

  if (loading) return <div className="loading">Cargando juegos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home">
      <h2 className="home-title tilt-warp">Juegos Destacados</h2>
      
      <div className="page-content">
        <div className="filter-sidebar">
          <SearchFilter 
            onFilterChange={handleFilterChange} 
            categories={categories}
          />
        </div>
        
        <div className="games-container">
          {filteredGames.length === 0 ? (
            <div className="no-games-message">
              No se encontraron juegos con los filtros seleccionados.
            </div>
          ) : (
            <div className="games-grid">
              {filteredGames.map(game => (
                <GameCard
                 GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  price={game.price}
                  image={game.image}
                  description={game.description}
                  category={game.category}
                  isFavorite={favorites.some(fav => fav.id === game.id)}  
                  onAddToFavorites={handleAddToFavorites}
                  onClick={() => handleGameClick(game)}
                  isNew={game.is_new}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedGame && (
        <GameModal 
          game={{
            ...selectedGame,
            contactEmail: selectedGame.contact_email,
            contactPhone: selectedGame.contact_phone
          }} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default Home;