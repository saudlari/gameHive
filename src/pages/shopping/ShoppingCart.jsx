import React from 'react';
import { useCart } from '../../CartContext';
import './ShoppingCart.css';


const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (index, newQuantity) => {
    updateQuantity(index, parseInt(newQuantity));
  };

  const handleCheckout = () => {
    // Aquí puedes implementar la lógica para procesar el pago
    // Por ahora, solo mostraremos una alerta
    alert('¡Gracias por tu compra! Procesando el pago...');
    // Aquí podrías redirigir a una página de pago o mostrar un formulario
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const maxItems = 20; // Puedes ajustar este número según tus necesidades
  const progressPercentage = (totalItems / maxItems) * 100;

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Carrito de Compras</h1>
      <div className="carrito-summary">
        <div className="carrito-total-items">
          <span className="carrito-total-number">{totalItems}</span>
          <span className="carrito-total-text">artículos en tu carrito</span>
        </div>
        <div className="carrito-progress-bar">
          <div 
            className="carrito-progress-fill" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
        <p className="carrito-capacity">
          {totalItems} de {maxItems} artículos máximos
        </p>
      </div>
      {cart.length === 0 ? (
        <p className="carrito-empty">Tu carrito está vacío</p>
      ) : (
        <>
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
                  <div className="carrito-item-quantity">
                    <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </div>
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
          
          <div className="carrito-checkout">
            <div className="carrito-total">
              <span className="carrito-total-label">Total:</span>
              <span className="carrito-total-amount">${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="carrito-checkout-btn"
              onClick={handleCheckout}
            >
              Comprar ahora
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;