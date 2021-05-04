import React, { useState, Fragment, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../../components/calendar/Calendar';
import AddWorkout from '../../components/AddWorkout/AddWorkout';
import ViewWorkout from '../../components/ViewWorkout/ViewWorkout';

const formattedDate = format(new Date(), 'dd MM yyyy');

const Home = () => {
    const [date, setDate] = useState(formattedDate);
    // Data collected from the Form submission
    const [formData, setFormData] = useState({});
    // Data received from the DB request
    const [requestedWorkoutData, setRequestedWorkoutData] = useState(() => []);

    useEffect(() => {
        // Request to API for specific workout
        const getCurrentWorkout = async () => {
            const requestOptions = {
                method: 'GET',
            }
            const response = await fetch(
                `http://localhost:3001/workout/1/${date}`, requestOptions
            );
            const jsonData = await response.json();

            setRequestedWorkoutData(() => jsonData);
        };

        getCurrentWorkout();
    }, [date, setRequestedWorkoutData]);

    // Callback for Calendar component
    const onDateChange = (date) => {
        setDate(date);
    };

    // Callback for Form component
    const onFormSubmit = async (formData) => {
        console.log('MAKING A POST REQUEST')
        setFormData(formData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };
        const response = await fetch(`http://localhost:3001/workout/1/${date}`, requestOptions)
            .then(res => res.json())
            .then(data => console.log(data))
            // redirect/click to the date and it will request the workout to show
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

// Edit workout
// Pass the requested values as props into the state to pre-populate the fields
