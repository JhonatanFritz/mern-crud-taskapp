import React from 'react';
import DataTable from 'react-data-table-component';
import IconButton from '../IconButton/IconButton';

const CustomDataTable = ({ data, editItem, viewItem, deleteItem }) => {

    const columns = [
        { name: 'Título', selector: 'title' },
        { name: 'Descripción', selector: 'description' },
        { name: 'Completado', selector: 'completed', cell: row => row.completed ? 'Sí' : 'No' },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <IconButton onClick={() => editItem(row)}>Editar</IconButton>
                    <IconButton onClick={() => viewItem(row)}>Ver</IconButton>
                    <IconButton onClick={() => deleteItem(row)}>Eliminar</IconButton>

                </>
            )
        }
    ];

    return <DataTable data={data} columns={columns} />;
}

export default CustomDataTable;
