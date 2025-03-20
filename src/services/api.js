import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const gameService = {
  getAllGames: async () => {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  },
  
  getGame: async (id) => {
    const response = await axios.get(`${API_URL}/games/${id}`);
    return response.data;
  },
  
  // Método para agregar un nuevo juego
  addGame: async (gameData) => {
    // Convertir los nombres de campos de camelCase a snake_case para el backend
    const formattedData = {
      title: gameData.title,
      description: gameData.description,
      price: parseFloat(gameData.price),
      category: gameData.category,
      image: gameData.image,
      contact_email: gameData.contactEmail,
      contact_phone: gameData.contactPhone || '',
      is_new: gameData.isNew,
      user_id: localStorage.getItem('userId') || '1' // ID de usuario por defecto
    };
    
    const response = await axios.post(`${API_URL}/games`, formattedData);
    return response.data;
  },
  
  // Método para actualizar un juego existente
  updateGame: async (id, gameData) => {
    const response = await axios.put(`${API_URL}/games/${id}`, gameData);
    return response.data;
  },
  
  // Método para eliminar un juego
  deleteGame: async (id) => {
    await axios.delete(`${API_URL}/games/${id}`);
    return true;
  }
};
