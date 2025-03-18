import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';

const Inicio = () => <div>Página de Inicio</div>;
const Juegos = () => <div>Página de Juegos</div>;
const Ofertas = () => <div>Página de Ofertas</div>;
const Novedades = () => <div>Página de Novedades</div>;
const Carrito = () => <div>Página del Carrito</div>;

function App() {
  return (
    <Router>
     
        <Header />
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
     
    </Router>
  );
}

export default App;
