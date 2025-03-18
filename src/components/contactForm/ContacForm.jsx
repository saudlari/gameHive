import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContacForm.css';

function ContactForm({ gameId, gameTitle }) {
  const [showForm, setShowForm] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  
  const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);
    
    const reset = () => {
      setValues(initialState);
    };
    
    const handleInputChange = ({ target }) => {
      setValues({
        ...values,
        [target.id]: target.value
      });
    };
    
    return [values, handleInputChange, reset];
  };
  
  const [formValues, handleInputChange, resetForm] = useForm({
    name: '',
    email: '',
    message: ''
  });
  
  const { name, email, message } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mensaje al vendedor
    console.log('Mensaje enviado:', { 
      name, 
      email, 
      message, 
      gameId,
      gameTitle 
    });
    
    setMessageSent(true);
    resetForm();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setMessageSent(false);
  };

  return (
    <div className="vendor-contact">
      <button 
        className="contact-button" 
        onClick={toggleForm}
      >
        {showForm ? 'Ocultar formulario de contacto' : 'Contactar al vendedor'}
      </button>
      
      {showForm && !messageSent && (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleInputChange}
              required
              placeholder={`Estoy interesado en ${gameTitle}...`}
            ></textarea>
          </div>
          <button type="submit" className="send-button">Enviar mensaje</button>
        </form>
      )}
      
      {messageSent && (
        <div className="message-sent">
          <p>¡Mensaje enviado con éxito! El vendedor se pondrá en contacto contigo pronto.</p>
        </div>
      )}
    </div>
  );
}

ContactForm.propTypes = {
  gameId: PropTypes.number.isRequired,
  gameTitle: PropTypes.string.isRequired
};

export default ContactForm;
