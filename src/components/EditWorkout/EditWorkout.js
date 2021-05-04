// On Edit click, change, workoutNames to prefilled Form. 
// Create a new Edit component, import Form into it and pass the requestedData as props to prefill the Form state

import React, { useState } from 'react';
import Form from '../form/Form';

const EditWorkout = ({ date, requestedWorkoutData }) => {
    const [workoutData, setWorkoutData] = useState(requestedWorkoutData);

    // grab the requestedData as props and pre-fill the form
    // On submit we want to send a put request

    const onSubmit = (formData) => {
        setWorkoutData(formData)
    }

    return (
        <div>
            <Form onFormSubmit={onSubmit} date={date} title="Edit Workout" defaultValues={requestedWorkoutData} />
        </div>
    );
}

export default EditWorkout;