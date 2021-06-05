import React, { Fragment } from 'react';
import Form from '../form/Form';

const AddWorkout = ({ onFormSubmit, date }) => {
    // Add a callback to refresh the date change in Home to rerender the page at the current date?

    return (
        <Fragment>
            <Form
                onFormSubmit={onFormSubmit}
                title="Add Exercise"
                buttonName="Add"
            />
        </Fragment>
    );
};

export default AddWorkout;
