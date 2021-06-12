import React from 'react';
import { AiFillDelete } from "react-icons/ai"
import './DeleteButton.scss';

const DeleteButton = ({ exerciseId, setDate }) => {
    const onDeleteClick = async () => {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({id: exerciseId}),
        };
       
        await fetch(`https://fenton-workout-log-server.herokuapp.com/workout`, requestOptions);

        // To re-render the home page and GET/show the updated list
        setDate('2000-01-01');
    };


    return (
        <div>
            <button onClick={onDeleteClick} className="exercise-list__button exercise-list__button--delete"><AiFillDelete/></button>
        </div>
    );
};

export default DeleteButton;