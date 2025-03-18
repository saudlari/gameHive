import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContacForm.css';

function ContactForm({ gameId, gameTitle }) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mensaje al vendedor
    console.log('Mensaje enviado:', { 
      contactName, 
      contactEmail, 
      contactMessage, 
      gameId,
      gameTitle 
    });
    
    setMessageSent(true);
    // Reiniciar el formulario
    setContactName('');
    setContactEmail('');
    setContactMessage('');
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
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
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
