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
       
        // Callback to view workout
        removeEditForm();
        // To re-render the home page and GET/show the updated list
        setDate('2000-01-01');
    };

    return (
        <div>
            <Form
                onFormSubmit={onSubmit}
                date={date}
                title="Edit Exercise"
                prefillData={prefillData}
            />
        </div>
    );
};

export default EditWorkout;
