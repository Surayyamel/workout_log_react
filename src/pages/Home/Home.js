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
    const [requestedWorkoutData, setRequestedWorkoutData] = useState(() => []);

    // getCurrentWorkout inside the effect hook to remove the dependency issue
    useEffect(() => {
        const getCurrentWorkout = async () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(
                `http://localhost:3001/workout/${date}`,
                requestOptions
            );

            const jsonData = await response.json();

            setRequestedWorkoutData(() => jsonData);
        };
        getCurrentWorkout();
    }, [date]);

    // Callback for Calendar component
    const onDateChange = (date) => {
        setDate(date);
    };

    // Callback for Form component on submit
    const onFormSubmit = async (formData) => {
        console.log('submitting form');
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };
        await fetch(`http://localhost:3001/workout/${date}`, requestOptions);

        // Force a rerender (because date is a string cannot be todays date or will not rerender) to see the newly posted exercise.
        setDate('2000-01-01');
    };

    const renderAddWorkout = () => {
        if (Object.keys(requestedWorkoutData).length === 0) {
            return (
                <div>
                    <WorkoutName date={date} />
                    <AddWorkout onFormSubmit={onFormSubmit} date={date} />
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

    // Put each block inside a div for styling

    return (
        <div className="main-content-container">
            <div className="calendar-container">
                <h1 className="calendar__main-title">Workout Log</h1>
                {/* First block */}
                <Calendar onDateChange={onDateChange} />
            </div>

            <div className="workout-container">
                {/* Second block */}
                {renderAddWorkout()}
            </div>
        </div>
    );
};

export default Home;
