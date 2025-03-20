import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchFilter.css';

function SearchFilter({ onFilterChange, categories }) {
  const [filters, setFilters] = useState({
    searchTerm: '',
    minPrice: '',
    maxPrice: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      minPrice: '',
      maxPrice: '',
      category: ''
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="search-filter-vertical">
      <h3 className="filter-title">Filtrar juegos</h3>
      
      <div className="filter-section">
        <label className="filter-label">Buscar por nombre</label>
        <input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          placeholder="Nombre del juego..."
          className="filter-input"
        />
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Categoría</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="filter-select"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-section">
        <label className="filter-label">Rango de precio</label>
        <div className="price-range-inputs">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Mínimo"
            className="price-input"
            min="0"
          />
          <span className="price-separator">a</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Máximo"
            className="price-input"
            min="0"
          />
        </div>
      </div>
      
      <button 
        className="reset-filter-button"
        onClick={handleReset}
      >
        Limpiar filtros
      </button>
    </div>
  );
}

SearchFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

SearchFilter.defaultProps = {
  categories: ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Simulación', 'Otros']
};

export default SearchFilter;
