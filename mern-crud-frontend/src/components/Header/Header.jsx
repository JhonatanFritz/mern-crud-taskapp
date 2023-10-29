// Header.js

import React from 'react';
import styles from './Header.module.css'; // Importa los estilos CSS Modules

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                TaskApp
            </div>
        </header>
    );
}

export default Header;
