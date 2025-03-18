import axios from 'axios';

const API_URL = 'http://localhost:3001';

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
    const response = await axios.post(`${API_URL}/games`, gameData);
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
