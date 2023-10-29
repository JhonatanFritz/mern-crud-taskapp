import React from "react";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton/IconButton";
import styles from "./TaskCard.module.css"; // Importa los estilos CSS Modules

const TaskCard = ({
  title,
  description,
  completed,
  onEdit,
  task,
  onTaskView,
  onDelete,
  onToggleComplete,
}) => {
  const cardClassName = completed ? styles.completed : styles.notcompleted;
  const handleViewClick = () => {
    onTaskView(task); // Llama a la función proporcionada desde el padre
  };
  
  const handleDoubleClick = () => {
    if (!completed) {
      onToggleComplete();
    }
  };
  const handleEditClick = () => {
    onEdit({ title, description, completed });
  };

  return (
    <div
      className={`${styles.card} ${cardClassName}`}
      onDoubleClick={handleDoubleClick}
    >
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p>{completed ? "Completado: Sí" : "Completado: No"}</p>
      <div className={styles["action-buttons"]}>
        <IconButton
          icon={faEdit}
          onClick={onEdit}
          className={`${styles.button} ${styles.buttonEdit}`}
        />

        <IconButton
          icon={faEye}
          onClick={handleViewClick}
          className={`${styles.button} ${styles.buttonView}`}
        />
        <IconButton
          icon={faTrash}
          onClick={onDelete}
          className={`${styles.button} ${styles.buttonDelete}`}
        />
      </div>
    </div>
  );
};

export default TaskCard;
