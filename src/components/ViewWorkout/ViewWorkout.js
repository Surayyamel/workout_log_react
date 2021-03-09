import React, { useEffect } from 'react';

const ViewWorkout = ({ workoutData }) => {

    useEffect(() => {
        console.log(workoutData)
    }, [workoutData]);


    return (
        <div>Workout</div>
    );
};

export default ViewWorkout;