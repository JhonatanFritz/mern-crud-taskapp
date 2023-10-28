import React, { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';

const ItemFormModal = ({ isOpen, onRequestClose, item, onSave }) => {
    const [formData, setFormData] = useState(item || {});

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const finalValue = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onRequestClose();
    };

    return (
        <ModalContainer isOpen={isOpen} onRequestClose={onRequestClose} title={item ? "Editar Item" : "Crear Item"}>
            <label>
                Título:
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Título" />
            </label>
            <label>
                Descripción:
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Descripción"></textarea>
            </label>
            <label>
                Completado:
                <input type="checkbox" name="completed" checked={formData.completed} onChange={handleInputChange} />
            </label>
            <button onClick={handleSubmit}>Guardar</button>
        </ModalContainer>
    );
}

export default ItemFormModal;
