import React, { useState, useEffect, Fragment } from 'react';
import EditWorkout from '../EditWorkout/EditWorkout';
import AddWorkout from '../AddWorkout/AddWorkout';

const ViewWorkout = ({ date, requestedWorkoutData, onFormSubmit }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const exerciseArray = [];
    (function pushExercisesToArray(workout) {
        for (const exercise in workout) {
            exerciseArray.push(workout[exercise]);
        }
    })(requestedWorkoutData);
   

    const list = [];
    (function renderExerciseList() {
        exerciseArray.map((exercise, i) => {
            list.push(
                <Fragment key={i}>
                    <table>
                        <tbody>
                            <tr>
                                <th>{exercise.name}</th>
                            </tr>
                            <tr>
                                <td>Reps</td>
                                {exercise.reps.map((rep, i) => <td key={i}>{rep}</td>)}  
                            </tr>
                            <tr>
                                <td>Weight</td>
                                {exercise.weight.map((weight, i) => <td key={i}>{weight}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </Fragment>
            );
        });
    })()

    useEffect(() => {
        reset();
    }, [date]);

    const reset = () => {
        if (showEditForm) {
            setShowEditForm(false);
        }
    };

    const onEditClick = () => {
        setShowEditForm(true);
    };

    const onAddClick = () => {
        setShowAddForm(true);
    };

    const onAddSubmit = (data) => {
        onFormSubmit(data);
    };

    const renderForms = () => {
        if (showEditForm) {
            return (
                <EditWorkout
                    date={date}
                    requestedWorkoutData={requestedWorkoutData}
                />
            );
        } else if (showAddForm) {
            return (
                <div>
                    <div>{date}</div>
                    {list}
                    <AddWorkout date={date} onFormSubmit={onAddSubmit} />
                </div>
            );
        }
        return (
            <div>
                <div>{date}</div>
                {list}

                <button onClick={onEditClick}>Edit</button>
                <button onClick={onAddClick}>Add</button>
            </div>
        );
    };

    return <div>{renderForms()}</div>;
};

export default ViewWorkout;
