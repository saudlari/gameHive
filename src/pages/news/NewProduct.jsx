import { useState, useEffect } from 'react';
import { gameService } from '../../services/api.js';
import GameCard from '../../components/gameCards/GameCards.jsx';
import GameModal from '../../components/gameModal/GameModal.jsx';
import SearchFilter from '../../components/searchFilter/SearchFilter.jsx';
import '../home/Home.jsx'; 

function NewProduct() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchNewGames = async () => {
      try {
        const allGames = await gameService.getAllGames();
        
 
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const newGames = allGames.filter(game => 
          // Adaptado para la nueva estructura de datos
          game.is_new || (game.created_at && new Date(game.created_at) > sevenDaysAgo)
        );
        

        newGames.sort((a, b) => {
          if (!a.created_at) return 1;
          if (!b.created_at) return -1;
          return new Date(b.created_at) - new Date(a.created_at);
        });
        
        const uniqueCategories = [...new Set(newGames.map(game => 
          game.category ? game.category : 'Otros'
        ))];
        
        setGames(newGames);
        setFilteredGames(newGames);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching new games:', err);
        setError('Error al cargar las novedades. Por favor, intenta más tarde.');
        setLoading(false);
      }
    };

    fetchNewGames();
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

  if (loading) return <div className="loading">Cargando novedades...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home">
      <h2 className="home-title">Novedades</h2>
      
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
              No se encontraron novedades con los filtros seleccionados.
            </div>
          ) : (
            <div className="games-grid">
              {filteredGames.map(game => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  price={game.price}
                  image={game.image}
                  description={game.description}
                  category={game.category}
                  onClick={() => handleGameClick(game)}
                  isNew={true}
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

export default NewProduct;
