import React, { useState, Fragment, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../../components/calendar/Calendar';
import Form from '../../components/form/Form';
import ViewWorkout from '../../components/ViewWorkout/ViewWorkout';

const formattedDate = format(new Date(), 'dd MMM yyyy');

const Home = () => {
    const [date, setDate] = useState(formattedDate);
    const [formData, setFormData] = useState({});
    const [requestedWorkoutData, setRequestedWorkoutData] = useState(() => []);

    useEffect(() => {
        // Request to API for specific workout
        const getCurrentWorkout = async () => {
        const response = await fetch(`http://localhost:3001/workout/1/${date}`);
        const jsonData = await response.json();

        setRequestedWorkoutData(() => jsonData)
        };

        getCurrentWorkout();
        
    }, [date]);

    const onDateChange = (date) => {
        setDate(date);
    };

    const onFormSubmit = (formData) => {
        console.log('Submitted!');
        // sets and weights inside formData
        setFormData(formData);
    };

    const renderAddWorkout = () => {
        if (requestedWorkoutData.length === 0) {
            return <Form title={'Add Workout'} onFormSubmit={onFormSubmit} date={date} />
        } else {
            return <ViewWorkout workoutData={requestedWorkoutData} />
        }
    };

    return (
        <Fragment>
            <Calendar onDateChange={onDateChange} />
            {renderAddWorkout()}
        </Fragment>
    );
};

export default Home;



// Show:
// Calendar
// View Workout
// Form: - Edit from view workout
//       - Add new from clicked empty day
