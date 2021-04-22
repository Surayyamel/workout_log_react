import React, { Fragment } from 'react';
import Form from '../form/Form';

const AddWorkout = ({ onFormSubmit, date }) => {

    // Import view workout component?

    return (
        <Fragment>
            <Form onFormSubmit={onFormSubmit} date={date} />
        </Fragment>
       
    );
}

export default AddWorkout;