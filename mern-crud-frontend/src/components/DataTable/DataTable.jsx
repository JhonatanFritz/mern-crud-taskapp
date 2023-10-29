import React from "react";
import { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./CustomDataTable.module.css"; // Importa los estilos CSS Modules
import Modal from "../ItemFormModal/ItemFormModal";

const CustomDataTable = ({
  data,
  onEdit,
  deleteItem,
  sortTasks,
  onToggleComplete,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };
  

  const sortedTasks = sortTasks(data); // Ordena las tareas según el criterio de ordenamiento
  return (
    <div className={`${styles["card-container"]} ${styles.datatable}`}>
      {" "}
      {/* Aplica el estilo al contenedor */}
      {sortedTasks.map((row) => (
        <TaskCard
          key={row._id}
          title={row.title}
          description={row.description}
          completed={row.completed}
          onEdit={() => onEdit(row)}
          onDelete={() => deleteItem(row)}
          onToggleComplete={() => onToggleComplete(row._id)}
          onTaskView={() => handleViewTask(row)} // Pasa la función handleViewTask como una prop
          task={row}
        />
      ))}
      {showModal && (
        <Modal>
          <h2>Detalles de la Tarea</h2>
          <p>Título: {selectedTask.title}</p>
          <p>Descripción: {selectedTask.description}</p>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default CustomDataTable;
