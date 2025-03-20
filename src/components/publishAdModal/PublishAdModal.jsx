import { useState } from 'react';
import PropTypes from 'prop-types';
import { gameService } from '../../services/api';
import './PublishAdModal.css';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function PublishAdModal({ onClose }) {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'accion',
    image: null,
    contactEmail: '',
    contactPhone: ''
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!formData.price) newErrors.price = 'El precio es obligatorio';
    if (isNaN(formData.price)) newErrors.price = 'El precio debe ser un número';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'El email de contacto es obligatorio';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      console.error('Usuario no autenticado');
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preparar los datos para enviar
      const gameData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: previewImage || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone || '',
        isNew: true,
        date: new Date().toISOString(),
        user_id: currentUser.id
      };
      
      // Enviar datos al servidor usando el servicio API
      await gameService.addGame(gameData);
      
      // Mostrar mensaje de éxito
      alert('¡Anuncio publicado con éxito! Aparecerá en la sección de novedades.');
      
      // Cerrar modal
      onClose();
      
      // Recargar la página para mostrar el nuevo anuncio
      window.location.href = '/novedades';
    } catch (error) {
      console.error('Error al publicar anuncio:', error);
      setErrors({
        ...errors,
        submit: 'Error al publicar el anuncio. Por favor, intenta de nuevo.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="publish-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Publicar Anuncio</h2>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="publish-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Título*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="Nombre del juego"
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Precio (€)*</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={errors.price ? 'error' : ''}
                  placeholder="0.00"
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="accion">Acción</option>
                  <option value="aventura">Aventura</option>
                  <option value="rpg">RPG</option>
                  <option value="estrategia">Estrategia</option>
                  <option value="deportes">Deportes</option>
                  <option value="simulacion">Simulación</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="image">Imagen</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Descripción*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={errors.description ? 'error' : ''}
                placeholder="Describe brevemente el juego"
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactEmail">Email*</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={errors.contactEmail ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.contactEmail && <span className="error-message">{errors.contactEmail}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="contactPhone">Teléfono</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="(Opcional)"
                />
              </div>
            </div>
            
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Vista previa" />
              </div>
            )}
            
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
              <button type="submit" className="submit-button" disabled={isSubmitting}>Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

PublishAdModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default PublishAdModal;

