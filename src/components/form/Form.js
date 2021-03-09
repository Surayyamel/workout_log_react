import React, { useState, Fragment, useEffect } from 'react';

const Form = ({ title, onFormSubmit, onWorkoutNameEnter, date }) => {
    const [sets, setSets] = useState(0);
    const [weight, setWeight] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [workoutName, setWorkoutName] = useState('');

    const weightsArray = [];

    useEffect(() => {
        onWorkoutNameEnter(workoutName)
    }, [workoutName]);

    const handleSetsChange = (e) => {
        setSets(e.target.value);
    };

    const handleWeightChange = (e) => {
        const weightValue = Number(e.target.value);
        const id = Number(e.target.id);

        weightsArray.push({ id, weightValue });
    };

    // Get the most recent unique values from weightsArray
    const getNewestUnique = (arr) => {
        let reversed = arr.reverse();
        let uniqueArray = [];

        reversed.forEach((weight) => {
            let i = uniqueArray.findIndex((x) => x.id === weight.id);
            if (i <= -1) {
                uniqueArray.push({ id: weight.id, weight: weight.weightValue });
            }
        });
        return uniqueArray;
    };

    const onWorkoutNameChange = (e) => {
        e.preventDefault();
        setWorkoutName(e.target.value);
    };

    const onExerciseNameChange = (e) => {
        e.preventDefault();
        setExerciseName(e.target.value);
    };

    const onSubmitBtnClick = () => {
        const filteredArray = getNewestUnique(weightsArray);
        setWeight(filteredArray);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Call callback to send form state to parent
        onFormSubmit({ exerciseName: exerciseName, sets: sets, weight: weight });
    };

    // Render weight input boxes depending on how many sets
    const renderWeightInputs = () => {
        const setsArray = [];
        for (let i = 1; i <= sets; i++) {
            setsArray.push(
                <div key={i}>
                    <input
                        id={i}
                        name="weight_input"
                        type="number"
                        min="0"
                        onChange={handleWeightChange}
                    />
                </div>
            );
        }
        return setsArray;
    };

    // Show weights label if any sets
    const renderWeightLabel = () => {
        if (sets > 0) {
            return <label>Weight:</label>;
        }
    };

    return (
        <Fragment>
            <h1>{title}</h1>
            <h2>{date.toString()}</h2>

            <form>
                <label>
                    Workout Name:
                    <input
                        name="workout_name"
                        type="text"
                        autoComplete="off"
                        onChange={onWorkoutNameChange}
                    />
                </label>
            </form>

            <form onSubmit={onSubmit}>
                <label>
                    Exercise Name:
                    <input
                        name="exercise_name"
                        type="text"
                        autoComplete="off"
                        onChange={onExerciseNameChange}
                    />
                </label>
                <label>
                    Sets:
                    <input
                        name="sets"
                        type="number"
                        min="0"
                        value={sets}
                        onChange={handleSetsChange}
                    />
                </label>
                {renderWeightLabel()}
                {renderWeightInputs()}
                <button onClick={onSubmitBtnClick}>Submit</button>
            </form>
        </Fragment>
    );
};

export default Form;
