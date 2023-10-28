import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable/DataTable';
import ItemFormModal from '../components/ItemFormModal/ItemFormModal';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../services/taskService';

const Home = () => {
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getTasks();
                setData(tasks);
            } catch (error) {
                console.error("Hubo un error al obtener las tareas:", error.response.data);
            }
        };
        fetchData();
    }, []);
    

    const handleEdit = (item) => {
        setCurrentItem(item);
        setShowEditModal(true);
    };
    
    const handleDelete = (item) => {
        setCurrentItem(item);
        setShowConfirmModal(true);
    };
    
    const handleSave = async (editedItem) => {
        if (editedItem._id) { // Si el item tiene un ID, entonces es una actualización
            await updateTask(editedItem._id, editedItem);
        } else { // De lo contrario, es un nuevo item
            await createTask(editedItem);
        }
        const tasks = await getTasks();
        setData(tasks);
        setShowEditModal(false);
    };
    
    const handleConfirmDelete = async () => {
        if (currentItem && currentItem._id) {
            await deleteTask(currentItem._id);
            const tasks = await getTasks();
            setData(tasks);
        }
        setShowConfirmModal(false);
    };
    

    return (
        <div>
            <DataTable data={data} editItem={handleEdit} viewItem={() => { }} deleteItem={handleDelete} />
            <ItemFormModal isOpen={showEditModal} onRequestClose={() => setShowEditModal(false)} item={currentItem} onSave={handleSave} />
            <ConfirmModal isOpen={showConfirmModal} onRequestClose={() => setShowConfirmModal(false)} onConfirm={handleConfirmDelete} />
        </div>
    );
    
}

export default Home;