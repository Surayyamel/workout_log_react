import React from 'react';

const ViewWorkout = ({ requestedWorkoutData }) => {

    const workoutNames = requestedWorkoutData.map((workoutData, index) => {
        return (
            <div key={index}>
                <div>{workoutData.name}</div>
            </div>
        );
    });

    return (
        <div>
            {workoutNames}
            <button>Edit</button>
        </div>
    );
};

export default ViewWorkout;
