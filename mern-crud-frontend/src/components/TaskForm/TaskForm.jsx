import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";

const TaskForm = ({ onSubmit, onCancel, selectedTask, setIsEditing }) => {
  const [task, setTask] = useState(
    selectedTask || { title: "", description: "", completed: false }
  );

  // Estado que controla si el formulario está vacío
  const [isFormEmpty, setIsFormEmpty] = useState(!selectedTask);

  useEffect(() => {
    // Cuando se selecciona una tarea para editar, actualiza el estado del formulario
    setTask(selectedTask || { title: "", description: "", completed: false });
    setIsFormEmpty(!selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });

    // Verifica si alguno de los campos no está vacío
    setIsFormEmpty(
      Object.values(task).some((field) => {
        if (typeof field === "string") {
          return field.trim() === "";
        }
        return field === null;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);

    // Limpia los campos después de crear o editar una tarea
    setTask({ title: "", description: "", completed: false });

    // Deshabilita el botón de guardar cuando el formulario está vacío
    setIsFormEmpty(true);
  };
  const handleCancel = () => {
    // Reiniciar el estado y la edición
    setTask({ title: "", description: "", completed: false });
    setIsEditing(false);
    // También puedes llamar a una función para limpiar la selección en el componente padre, si es necesario.
    onCancel(); // Esta función debe estar definida en tu componente padre y puede reiniciar la selección.
  };
  return (
    <div className={styles.form_container}>
      <span className={styles.form_title}>
        {selectedTask ? "Editar tarea" : "Crear nueva tarea"}
      </span>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>

        {selectedTask && (
          <label>
            Completado:
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
            />
          </label>
        )}

        <div className={styles.buttonContainer}>
          <button
            type="reset"
            onClick={handleCancel}
            className={styles.cancelButton}
            // Deshabilita el botón de cancelar cuando el formulario está vacío
            disabled={isFormEmpty}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            // Deshabilita el botón de guardar cuando el formulario está vacío
            disabled={isFormEmpty}
          >
            Guardar
          </button>
        </div>
      </form>
      <span className={styles.helpText}>
        * Doble click para marcar una tarea como completada
      </span>
    </div>
  );
};

export default TaskForm;
