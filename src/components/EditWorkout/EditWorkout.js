import React from 'react';
import Form from '../form/Form';
import { format } from 'date-fns';


const EditWorkout = ({ date, prefillData, setDate }) => {
 
    const onSubmit = async (formData) => {
        // This is to send the put request
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };
        await fetch(`http://localhost:3001/workout/1/${date}`, requestOptions);

        // To re-render the home page and GET/show the updated list
        setDate(format(new Date(), 'dd MM yyyy'));
    }

    return (
        <div>
            <Form onFormSubmit={onSubmit} date={date} title="Edit Workout" prefillData={prefillData} />
        </div>
    );
}

export default EditWorkout;