import React, { useState } from 'react';
import EditWorkout from '../EditWorkout/EditWorkout';
import AddWorkout from '../AddWorkout/AddWorkout';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import WorkoutName from '../WorkoutName/WorkoutName';
import './ViewWorkout.scss';

const ViewWorkout = ({ date, requestedWorkoutData, onFormSubmit, setDate }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: 'id',
        name: '',
        sets: 0,
        reps: [],
        weight: [],
    });

    // Sort exercise list into array from requestedWorkoutData object
    const exerciseArray = [];
    (function pushExercisesToArray(workout) {
        for (const exercise in workout) {
            exerciseArray.push(workout[exercise]);
        }
        // Add the exercise id 
        for (let i = 0; i < exerciseArray.length; i++) {
            const keys = Object.keys(workout);
            exerciseArray[i].id = keys[i];
        }
    })(requestedWorkoutData);

    // Callback from EditButton component
    const onEditClick = (exerciseId, name, sets, reps, weight) => {
        setEditFormData({
            id: exerciseId,
            name: name,
            sets: sets,
            reps: reps,
            weight: weight,
        });
        setShowEditForm(true);
    };

    // Render exercise list from the exerciseArray
    const list = [];
    (function renderExerciseList() {
        exerciseArray.map((exercise, i) => {
            return list.push(
                <div key={i} className="exercise-list__container">
                    <h4 className="exercise-list__name">{exercise.name}</h4>
                    <table className="exercise-list__table">
                        <tbody>
                            <tr>
                                <td className="exercise-list__table">Reps</td>
                                {exercise.reps.map((rep, i) => (
                                    <td
                                        key={i}
                                        className="exercise-list__table"
                                    >
                                        {rep}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="exercise-list__table">Weight</td>
                                {exercise.weight.map((weight, i) => (
                                    <td
                                        key={i}
                                        className="exercise-list__table"
                                    >
                                        {weight}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <div className="exercise-list__buttons-container">
                        <EditButton
                            onEditClick={onEditClick}
                            exerciseId={exercise.id}
                            name={exercise.name}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            weight={exercise.weight}
                        />
                        <DeleteButton exerciseId={exercise.id} setDate={setDate} />
                    </div>
                </div>
            );
        });
    })();

    // Called in EditWorkout after Edit form is submitted
    const removeEditForm = () => {
        if (showEditForm) {
            setShowEditForm(false);
        }
    };

    // Show add exercise form
    const onAddClick = () => {
        setShowAddForm(true);
    };

    // Submit add exercise form
    const onAddSubmit = (data) => {
        setShowAddForm(false);
        onFormSubmit(data);
    };

    const onCancelAddClick = () => {
        setShowAddForm(false);
    };

    // Show EditForm, AddForm or the exercise list
    const renderForms = () => {
        if (showEditForm) {
            return (
                <div>
                    <EditWorkout
                        date={date}
                        prefillData={editFormData}
                        setDate={setDate}
                        removeEditForm={removeEditForm}
                    />
                </div>
            );
        } else if (showAddForm) {
            return (
                <div>
                    <WorkoutName date={date} />
                    <div>
                        <AddWorkout date={date} onFormSubmit={onAddSubmit} />
                        <button onClick={onCancelAddClick} className="exercise-list__add-exercise-cancel-button">Cancel</button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <WorkoutName date={date} />
                <div className="exercise-list__main-container">
                    {list}
                    <div className="exercise-list__add-exercise-button-container">
                        <button
                            onClick={onAddClick}
                            className="exercise-list__button--add-exercise"
                        >
                            Add exercise
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return <div>{renderForms()}</div>;
};

export default ViewWorkout;
