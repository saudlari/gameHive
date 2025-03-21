import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './Header.css';
import isologoGameHive from '/isotipo-solo-dibujo.png';
import logoGameHive from '/logotipo-solo-letra.png';
import PublishButton from '../buttons/PublishButton.jsx';

const Header = () => {
  const { getTotalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const itemCount = getTotalItems();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={isologoGameHive} alt="GameHive" className="logo-image" />
          <img src={logoGameHive} alt="GameHive" />
        </Link>
      </div>
      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to="/juegos" className="nav-link">Mis Juegos</Link></li>
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
