import React, { useState, useEffect, Fragment } from 'react';
import EditWorkout from '../EditWorkout/EditWorkout';
import AddWorkout from '../AddWorkout/AddWorkout';
import EditButton from '../EditButton/EditButton';

const ViewWorkout = ({ date, requestedWorkoutData, onFormSubmit }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        sets: 0,
        reps: [],
        weight: []
    })

    const exerciseArray = [];
    (function pushExercisesToArray(workout) {
        for (const exercise in workout) {
            exerciseArray.push(workout[exercise]);
        }
    })(requestedWorkoutData);
   

    const onEditClick = (name, sets, reps, weight) => {
        //console.log(name, sets, reps, weight)
        setEditFormData({
            name: name, 
            sets: sets, 
            reps: reps, 
            weight: weight
        })
        
        setShowEditForm(true);
    };

   
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
                    <EditButton onEditClick={onEditClick} name={exercise.name} sets={exercise.sets} reps={exercise.reps} weight={exercise.weight}/>
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
                    prefillData={editFormData}
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

                
                <button onClick={onAddClick}>Add</button>
            </div>
        );
    };

    return <div>{renderForms()}</div>;
};

export default ViewWorkout;
