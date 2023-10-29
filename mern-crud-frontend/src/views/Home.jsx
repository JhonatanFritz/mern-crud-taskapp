import React, { useState, useEffect } from "react";
import CustomDataTable from "../components/DataTable/DataTable";
import Header from "../components/Header/Header";
import Taskform from "../components/TaskForm/TaskForm";
import Modal from "../components/ItemFormModal/ItemFormModal";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import styles from "./Home.module.css"; // Importa los estilos

const Home = () => {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Agrega un estado para controlar si estás editando una tarea
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tasks = await getTasks();

        // Revierte el orden de las tareas para tener las más recientes primero
        tasks = tasks.reverse();

        setData(tasks);
      } catch (error) {
        console.error(
          "Hubo un error al obtener las tareas:",
          error.response.data
        );
      }
    };
    fetchData();
  }, []);



  const handleDelete = (item) => {
    setCurrentItem(item);
  };

  const handleSave = async (editedItem) => {
    if (editedItem._id) {
      // Si el item tiene un ID, entonces es una actualización
      // Realiza la actualización en el servidor
      await updateTask(editedItem._id, editedItem);

      // Actualiza la lista de tareas local
      setData((prevData) => {
        // Encuentra la tarea editada y reemplaza sus datos
        return prevData.map((task) =>
          task._id === editedItem._id ? editedItem : task
        );
      });
      setIsEditing(false); // Sal del modo de edición después de guardar los cambios en la tarea editada
      setSelectedTask(null); // Limpia la tarea seleccionada
    } else {
      // De lo contrario, es un nuevo item
      const createdTask = await createTask(editedItem);

      // Agrega la tarea creada en la parte superior y actualiza el estado
      setData((prevData) => [createdTask, ...prevData]);
    }
    setShowEditModal(false);
  };

  const onCancel = () => {
    setSelectedTask(null); // Restablece la tarea seleccionada
    setIsEditing(false); // Sal del modo de edición
  };

  const handleConfirmDelete = async () => {
    if (currentItem && currentItem._id) {
      await deleteTask(currentItem._id);
      const tasks = await getTasks();
      setData(tasks);
    }
  };

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1; // Si a no está completada y b está completada, muestra a primero
      } else if (a.completed && !b.completed) {
        return 1; // Si a está completada y b no está completada, muestra b primero
      }
      return 0; // Mismo estado, no se cambia el orden
    });
  };

  const toggleTaskCompletion = async (taskId) => {
    // Primero, actualiza el estado local
    const updatedTasks = data.map((task) => {
      if (task._id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setData(updatedTasks);

    // Luego, envía una solicitud al servidor para actualizar la base de datos
    try {
      await updateTask(taskId, { completed: !taskId.completed }); //{completed: !taskId.completed} es el objeto que se envía al servidor, en este caso se envía el valor contrario al que tiene la tarea en la base de datos
    } catch (error) {
      console.error("Error al actualizar la tarea en la base de datos:", error);
    }
  };
  const handleEditTask = (taskData) => {
    setSelectedTask(taskData); // Establece la tarea seleccionada primero
    setIsEditing(true); // Luego, activa el modo de edición
  };
  const onDelete = (task) => {
    // Aquí debes implementar la lógica para eliminar la tarea.
    // Por ejemplo, puedes hacer una solicitud al servidor para eliminar la tarea.
    deleteTask(task._id) // Suponiendo que deleteTask sea una función que realiza la eliminación en el servidor.
      .then(() => {
        // Después de eliminar con éxito, actualiza la lista de tareas.
        const updatedTasks = data.filter((t) => t._id !== task._id);
        setData(updatedTasks);
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
      });
  };
  return (
    <div className={styles.container}>
      <Header /> {/* Encabezado en la parte superior */}
      <div className={styles.content}>
        <div className={styles.formcontainer}>
          <Taskform
            onSubmit={handleSave}
            isEditing={!!isEditing} // Convierte el valor a booleano
            initialValues={selectedTask}
            selectedTask={selectedTask}
            setIsEditing={setIsEditing}
            onCancel={onCancel}
          />
        </div>
        <div className={styles.tablecontainer}>
          {/* Muestra aquí la tabla y otros elementos */}
          <CustomDataTable
            data={data} // Supongo que `data` es tu lista de tareas
            deleteItem={onDelete} // Asegúrate de tener una función `handleDelete` definida en `Home.jsx`
            sortTasks={sortTasks} // Asegúrate de tener una función `sortTasks` definida en `Home.jsx`
            onToggleComplete={toggleTaskCompletion}
            onEdit={handleEditTask} // Asegúrate de tener una función `toggleTaskCompletion` definida en `Home.jsx`
          />
        </div>
      </div>
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

export default Home;
