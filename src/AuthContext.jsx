import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    
    if (userId && userName) {
      setCurrentUser({
        id: userId,
        name: userName
      });
    }
  }, []);
  
  // Función para iniciar sesión
  const login = (userId, userName) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    setCurrentUser({
      id: userId,
      name: userName
    });
  };
  
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setCurrentUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
