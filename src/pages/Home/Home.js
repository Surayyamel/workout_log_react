import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Calendar from '../../components/calendar/Calendar';
import AddWorkout from '../../components/AddWorkout/AddWorkout';
import ViewWorkout from '../../components/ViewWorkout/ViewWorkout';
import WorkoutName from '../../components/WorkoutName/WorkoutName';
import './Home.scss';

const formattedDate = format(new Date(), 'yyyy-MM-dd');

const Home = () => {
    const [date, setDate] = useState(formattedDate);
    const [requestedWorkoutData, setRequestedWorkoutData] = useState([]);
    
    // getCurrentWorkout inside the effect hook to remove the dependency issue
    useEffect(() => {
        const getCurrentWorkout = async () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
            };
            const response = await fetch(
                `https://fenton-workout-log-server.herokuapp.com/workout/${date}`,
                requestOptions
            );

            const jsonData = await response.json();

            setRequestedWorkoutData(() => jsonData);
        };
        getCurrentWorkout();
    }, [date]);

    // Callback for Calendar component, updates the currently selected date
    const onDateChange = (date) => {
        setDate(date);
    };

    // Callback for Form component on submit
    const onFormSubmit = async (formData) => {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };
        await fetch(`https://fenton-workout-log-server.herokuapp.com/workout/${date}`, requestOptions);

        // Force a rerender (because date is a string & cannot be todays date or will not rerender), to see the newly posted exercise.
        setDate('2000-01-01');
    };

    const renderAddWorkout = () => {
        if (Object.keys(requestedWorkoutData).length === 0) {
            // If there is no workout for selected date
            return (
                <div>
                    <WorkoutName date={date} />
                    <AddWorkout onFormSubmit={onFormSubmit} />
                </div>
            );
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
        <div className="main-content-container">
            <div className="calendar-container">
                <h1 className="calendar__main-title">Workout Log</h1>
                <Calendar onDateChange={onDateChange} />
            </div>

            <div className="workout-container">
                {renderAddWorkout()}
            </div>
        </div>
    );
};

export default Home;
