import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Favs from './pages/favs/Favs';
import Novedades from './pages/news/NewProduct';

//const Favs = () => <div>Página de Juegos</div>;
const Ofertas = () => <div>Página de Ofertas</div>;
const Carrito = () => <div>Página del Carrito</div>;

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juegos" element={<Favs />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
