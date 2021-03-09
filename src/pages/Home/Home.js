import React, { useState, Fragment, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../../components/calendar/Calendar';
import Form from '../../components/form/Form';
import ViewWorkout from '../../components/ViewWorkout/ViewWorkout';

const Home = () => {
    const formattedDate = format(new Date, 'dd MMM yyyy');
    
    const [date, setDate] = useState(formattedDate);
    const [formData, setFormData] = useState({});
    const [workoutName, setWorkoutName] = useState('');
    const [requestedWorkoutData, setRequestedWorkoutData] = useState(() => []);

   

    useEffect(() => {
        // GET request to db 
        getCurrentWorkout();
    }, [date])

    useEffect(() => {
        console.log(requestedWorkoutData)
    }, [requestedWorkoutData])

    const onDateChange = (date) => {
        setDate(date);
    };

    const onFormSubmit = (formData) => {
        console.log('Submitted!')
        setFormData(formData)
    };

    const onWorkoutNameEnter = (workoutName) => {
        setWorkoutName(workoutName);
    };

    // Request to API for specific workout
    const getCurrentWorkout = async () => {
        const response = await fetch(`http://localhost:3001/workout/1/${date}`);
        const jsonData = await response.json();

        setRequestedWorkoutData(() => jsonData)
    };


    const renderAddWorkout = () => {
        if (requestedWorkoutData.length === 0) {
            return <Form title={'Add Workout'} onFormSubmit={onFormSubmit} onWorkoutNameEnter={onWorkoutNameEnter} date={date} />
        } else {
            return <ViewWorkout />
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
