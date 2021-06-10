import React from 'react';
import Form from '../form/Form';

const EditWorkout = ({ date, prefillData, setDate, removeEditForm }) => {
    const onSubmit = async (formData) => {
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
           
        };
        
        await fetch(`http://localhost:3001/workout/${date}`, requestOptions);
       
        // Callback to viewWorkout to stop showing the Edit form
        removeEditForm();
        // To re-render the home page and GET/show the updated list
        setDate('2000-01-01');
    };

    return (
        <div>
            <Form
                onFormSubmit={onSubmit}
                title="Edit Exercise"
                prefillData={prefillData}
                buttonName="Edit"
            />
            <button onClick={removeEditForm} className="exercise-list__add-exercise-cancel-button">Cancel</button>
        </div>
    );
};

export default EditWorkout;
