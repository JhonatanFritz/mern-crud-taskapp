import React from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <ModalContainer isOpen={isOpen} onRequestClose={onRequestClose} title="Confirmar eliminación">
            <p>¿Estás seguro de que deseas eliminar este ítem?</p>
            <button onClick={onConfirm}>Confirmar</button>
            <button onClick={onRequestClose}>Cancelar</button>
        </ModalContainer>
    );
}

export default ConfirmModal;