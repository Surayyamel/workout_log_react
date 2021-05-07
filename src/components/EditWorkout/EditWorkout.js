// On Edit click, change, workoutNames to prefilled Form. 
// Create a new Edit component, import Form into it and pass the requestedData as props to prefill the Form state

import React, { useState } from 'react';
import Form from '../form/Form';

const EditWorkout = ({ date, prefillData }) => {
 
    const onSubmit = (formData) => {
        // This is to send the put request

        console.log(formData)
      
    }

    return (
        <div>
            <Form onFormSubmit={onSubmit} date={date} title="Edit Workout" prefillData={prefillData} />
        </div>
    );
}

export default EditWorkout;