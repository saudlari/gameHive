import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext';
import './Header.css';
import logoGameHive from '/gameHive.jpeg';
import PublishButton from '../buttons/PublishButton.jsx';

const Header = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
