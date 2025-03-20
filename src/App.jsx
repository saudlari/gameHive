import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Favs from './pages/favs/Favs';
import Novedades from './pages/news/NewProduct';
import ShoppingCart from './pages/shopping/ShoppingCart';
import Login from './pages/login/Login';

//const Favs = () => <div>Página de Juegos</div>;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/juegos" element={<Favs />} />
              <Route path="/novedades" element={<Novedades />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
