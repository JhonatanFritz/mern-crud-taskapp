import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import styles from './CustomDataTable.module.css'; // Importa los estilos CSS Modules

const CustomDataTable = ({ data, onEdit,deleteItem, sortTasks, onToggleComplete }) => {
    const sortedTasks = sortTasks(data); // Ordena las tareas según el criterio de ordenamiento
    return (
        <div className={`${styles["card-container"]} ${styles.datatable}`}> {/* Aplica el estilo al contenedor */}
        
            {sortedTasks.map((row) => (
                <TaskCard
                    key={row._id}
                    title={row.title}
                    description={row.description}
                    completed={row.completed}
                    onEdit={() => onEdit(row)} // Utiliza la prop onEdit
                    onDelete={() => deleteItem(row)}
                    onToggleComplete={() => onToggleComplete(row._id)}
                />
            ))}
        </div>
    );
}

export default CustomDataTable;
