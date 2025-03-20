import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Novedades from './pages/news/NewProduct';
import Carrito from './pages/carrito/Carrito'; // Ajusta la ruta según tu estructura de archivos
import { CartProvider } from './CartContext';

const Juegos = () => <div>Página de Juegos</div>;
const Ofertas = () => <div>Página de Ofertas</div>;

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/carrito" element={<Carrito />} /> {/* Ruta del carrito */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
