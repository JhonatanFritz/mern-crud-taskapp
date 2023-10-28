import React from 'react';

const IconButton = ({ Icon, onClick, className = '', children, ...props }) => {
    return (
        <button onClick={onClick} className={`icon-button ${className}`} {...props}>
            {Icon ? <Icon /> : null}
            {children}
        </button>
    );
}


export default IconButton;