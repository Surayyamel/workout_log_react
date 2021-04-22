import React, { useState, Fragment, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../../components/calendar/Calendar';
import AddWorkout from '../../components/AddWorkout/AddWorkout';
import ViewWorkout from '../../components/ViewWorkout/ViewWorkout';

const formattedDate = format(new Date(), 'dd MMM yyyy');
 
const Home = () => {
    const [date, setDate] = useState(formattedDate);
    const [formData, setFormData] = useState({});
    const [requestedWorkoutData, setRequestedWorkoutData] = useState(() => []);

    useEffect(() => {
        // Request to API for specific workout
        const getCurrentWorkout = async () => {
            const response = await fetch(
                `http://localhost:3001/workout/1/${date}`
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
    const onFormSubmit = (formData) => {
        // sets and weights inside formData
        setFormData(formData);
        console.log('Submitted!', formData);
    };

    
    const renderAddWorkout = () => {
        if (requestedWorkoutData.length === 0) {
            return <AddWorkout onFormSubmit={onFormSubmit} date={date}  />
        } else {
            return <ViewWorkout date={date} requestedWorkoutData={requestedWorkoutData} />
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



// Show:
// Calendar
// View Workout
// Form: - Edit from view workout
//       - Add new from clicked empty day


// Edit workout
// Pass the requested values as props into the state to pre-populate the fields