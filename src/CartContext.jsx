import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (game) => {
    setCart(prevCart => [...prevCart, { ...game, quantity: 1 }]);
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCart(prevCart => prevCart.map((item, i) => 
      i === index ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
