import React from 'react';
import { useCart } from '../../CartContext';

const Carrito = () => {
  const { cart } = useCart();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
              />
              <span>{item.title} - ${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrito;
