import React from 'react';
import Modal from 'react-modal';

const ModalContainer = ({ isOpen, onRequestClose, title, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
        >
            <h2>{title}</h2>
            {children}
        </Modal>
    );
}

export default ModalContainer;