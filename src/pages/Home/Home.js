import React, { useState, Fragment, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../../components/calendar/Calendar';
import AddWorkout from '../../components/AddWorkout/AddWorkout';
import ViewWorkout from '../../components/ViewWorkout/ViewWorkout';

const formattedDate = format(new Date(), 'dd MM yyyy');

const Home = () => {
    const [date, setDate] = useState(formattedDate);
    // Data collected from the Form submission
    const [formData, setFormData] = useState(() => {});
    // Data received from the DB request
    const [requestedWorkoutData, setRequestedWorkoutData] = useState(() => []);

    const getCurrentWorkout = async () => {
        const requestOptions = {
            method: 'GET',
        };
        const response = await fetch(
            `http://localhost:3001/workout/1/${date}`,
            requestOptions
        );

        const jsonData = await response.json();

        setRequestedWorkoutData(() => jsonData);
    };

    useEffect(() => {
        // Request to API for specific workout
        getCurrentWorkout();
    }, [date, setRequestedWorkoutData, formData]);

    // Callback for Calendar component
    const onDateChange = (date) => {
        setDate(date);
    };

    // Callback for Form component on submit
    const onFormSubmit = async (formData) => {
        setFormData(() => formData);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };
        await fetch(`http://localhost:3001/workout/1/${date}`, requestOptions);

        // Rerender to see the newly posted exercise
        setDate(format(new Date(), 'dd MM yyyy'));
    };

    const renderAddWorkout = () => {
        if (Object.keys(requestedWorkoutData).length === 0) {
            return <AddWorkout onFormSubmit={onFormSubmit} date={date} />;
        } else {
            return (
                <ViewWorkout
                    date={date}
                    requestedWorkoutData={requestedWorkoutData}
                    onFormSubmit={onFormSubmit}
                    setDate={setDate}
                />
            );
        }
    };

    return (
        <Fragment>
            <h1>Workout Log</h1>
            <Calendar onDateChange={onDateChange} />
            {renderAddWorkout()}
        </Fragment>
    );
};

export default Home;