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
 
  addGame: async (gameData) => {
  
    const formattedData = {
      title: gameData.title,
      description: gameData.description,
      price: parseFloat(gameData.price),
      category: gameData.category,
      image: gameData.image,
      contact_email: gameData.contactEmail,
      contact_phone: gameData.contactPhone || '',
      is_new: gameData.isNew,
      user_id: localStorage.getItem('userId') || '1' 
    };
    
    const response = await axios.post(`${API_URL}/games`, formattedData);
    return response.data;
  },
  

  updateGame: async (id, gameData) => {
    const response = await axios.put(`${API_URL}/games/${id}`, gameData);
    return response.data;
  },
  
 
  deleteGame: async (id) => {
    await axios.delete(`${API_URL}/games/${id}`);
    return true;
  }
};
