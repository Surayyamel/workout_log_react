import React, { Fragment } from 'react';
import Form from '../form/Form';

const AddWorkout = ({ onFormSubmit, date }) => {

    return (
        <Fragment>
            <Form onFormSubmit={onFormSubmit} date={date} title="Add Workout" defaultValues={[{name: 'name'}]} />
        </Fragment>
       
    );
}

export default AddWorkout;