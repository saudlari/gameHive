import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Intenta recuperar el carrito del localStorage al iniciar
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guarda el carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Añadir un juego al carrito
  const addToCart = (game) => {
    setCart(prevCart => {
      // Verifica si el juego ya está en el carrito
      const existingItemIndex = prevCart.findIndex(item => item.id === game.id);
      
      if (existingItemIndex >= 0) {
        // Si ya existe, incrementa la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Si no existe, añádelo con cantidad 1
        return [...prevCart, { ...game, quantity: 1 }];
      }
    });
  };

  // Eliminar un juego del carrito
  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  // Actualizar la cantidad de un juego
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
      return updatedCart;
    });
  };

  // Obtener el número total de artículos
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener el precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getTotalItems,
      getTotalPrice,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
