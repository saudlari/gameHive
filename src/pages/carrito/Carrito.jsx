import React from 'react';
import { useCart } from '../../CartContext';
import './Carrito.css';   

const Carrito = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className="carrito-empty">Tu carrito está vacío</p>
      ) : (
        <div className="carrito-items">
          {cart.map((item, index) => (
            <div key={index} className="carrito-item">
              <img 
                src={item.image} 
                alt={item.title} 
                className="carrito-item-image"
              />
              <div className="carrito-item-details">
                <h2 className="carrito-item-title">{item.title}</h2>
                <p className="carrito-item-price">${item.price}</p>
                <button 
                  className="carrito-item-remove" 
                  onClick={() => handleRemove(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carrito;