import React, { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styles from './ItemFormModal.module.css';

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
        <ModalContainer isOpen={isOpen} onRequestClose={onRequestClose} title={item ? "Editar Tarea" : "Crear Tarea"}>
            <div className={styles.itemFormContainer}>
                <label className={styles.formLabel}>
                    Título:
                    <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Título" className={styles.formInput} />
                </label>
                <label className={styles.formLabel}>
                    Descripción:
                    <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Descripción" className={styles.formInput}></textarea>
                </label>
                <label className={styles.formLabel}>
                    Completado:
                    <input type="checkbox" name="completed" checked={formData.completed} onChange={handleInputChange} className={styles.formCheckbox} />
                </label>
                <button onClick={handleSubmit} className={styles.formButton}>Guardar</button>
            </div>
        </ModalContainer>
    );
}

export default ItemFormModal;
