import React from 'react';
import Form from '../form/Form';

const AddWorkout = ({ onFormSubmit }) => {
    return (
        <Form
            onFormSubmit={onFormSubmit}
            title="Add Exercise"
            buttonName="Add"
        />
    );
};

export default AddWorkout;
