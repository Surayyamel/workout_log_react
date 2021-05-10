import React from 'react';
import { format } from 'date-fns';

const DeleteButton = ({ id, setDate }) => {
    const onDeleteClick = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id}),
        };
        
        await fetch(`http://localhost:3001/workout/1/`, requestOptions);

        // To re-render the home page and GET/show the updated list
        setDate(format(new Date(), 'dd MM yyyy'));
    };


    return (
        <div>
            <button onClick={onDeleteClick}>Delete</button>
        </div>
    );
};

export default DeleteButton;