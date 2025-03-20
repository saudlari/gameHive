import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext';
import './Header.css';
import logoGameHive from '/gameHive.jpeg';
import PublishButton from '../buttons/PublishButton.jsx';

const Header = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const navigate = useNavigate();
  
  // Estado para el usuario actual
  const [currentUser, setCurrentUser] = useState(null);
  
  // Comprobar si hay un usuario autenticado al cargar el componente
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
  
  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logoGameHive} alt="GameHive" className="logo-image" />
          <h1 className="site-title">GameHive</h1>
        </Link>
      </div>
      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to="/juegos" className="nav-link">Mis Juegos</Link></li>
          <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
          <li className="nav-item"><Link to="/novedades" className="nav-link">Novedades</Link></li>
          <li className="nav-item">
            <Link to="/cart" className="cart-icon">
              🛒 {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
          </li>
          <li className="nav-item"><PublishButton /></li>
          
          {currentUser ? (
            <li className="nav-item user-menu">
              <span className="user-name">Hola, {currentUser.name}</span>
              <div className="user-dropdown">
                <button onClick={handleLogout} className="logout-button">
                  Cerrar sesión
                </button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="login-link">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
