import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './WorkoutName.scss';
import { trim } from 'lodash';

const WorkoutName = ({ date, loggedIn }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    // Input values for Add and Edit workout name forms
    const [workoutName, setWorkoutName] = useState('');
    const [editFormWorkoutName, setEditFormWorkoutName] = useState('');
    // Returned name from POST request, updated so as to force a rerender
    const [postedWorkoutName, setPostedWorkoutName] = useState('');
    // Returned name from GET request, displayed in the JSX
    const [requestedWorkoutName, setrequestedWorkoutName] = useState(null);
    const [workoutNameError, setWorkoutNameError] = useState('');

    const originURL = process.env.REACT_APP_ORIGIN_URL;

   
    // Error: deleting and adding back the same name does not re-render the page

    useEffect(() => {
        // isMounted fix to the state update on an unmounted component
        let isMounted = true;
        const getWorkoutName = async () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(
                `${originURL}/workout/${date}/name`,
                requestOptions
            );

            const { name } = await response.json();

            if (isMounted) {
                setrequestedWorkoutName(name || '');
                setEditFormWorkoutName(name || '');
            }
        };

        getWorkoutName();

        return () => {
            isMounted = false;
        };
    }, [date, postedWorkoutName, originURL, loggedIn]);

    const onWorkoutNameSubmit = async (e) => {
        e.preventDefault();

        // Clean input data - CANNOT BE EMPTY
        const trimmedName = trim(workoutName)

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                name: trimmedName,
            }),
        };
       
        if (!trimmedName.length) {
            setWorkoutNameError('Field cannot be empty');
            return;
        }

        const response = await fetch(
            `${originURL}/workout/${date}/name`,
            requestOptions
        );

        const jsonData = await response.json();

        // Update state to trigger a rerender and reset the input box
        if (jsonData === postedWorkoutName) {
            // If the same name is entered again, it will not re-render, force re-render with new value
            setPostedWorkoutName('');
        }
        setPostedWorkoutName(jsonData);
        setWorkoutName('');
    };

    const onWorkoutNameInputChange = (e) => {
        if (e.target.name === 'addInput') {
            if (validator.isAlphanumeric(e.target.value) || (e.target.value.includes(' ')) || (e.target.value === '')) {
                setWorkoutName(e.target.value);
                setWorkoutNameError('');
            } else {
                setWorkoutNameError('Please enter only letters and numbers');
            }
        } else if (e.target.name === 'editInput') {
            if (validator.isAlphanumeric(e.target.value) || (e.target.value.includes(' ')) || (e.target.value === '')) {
                setEditFormWorkoutName(e.target.value);
                setWorkoutNameError('');
            } else {
                setWorkoutNameError('Please enter only letters and numbers');
            }
        }    
    };

    const onWorkoutNameEditClick = () => {
        setShowEditForm(true);
    };

    const onEditFormSubmit = async (e) => {
        e.preventDefault();
        const trimmedEditName = trim(editFormWorkoutName)

        if (!trimmedEditName.length) {
            setWorkoutNameError('Field cannot be empty');
            return;
        }

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: trimmedEditName,
                date: date,
            }),
        };

        const response = await fetch(
            `${originURL}/workout/${date}/name`,
            requestOptions
        );
        const { name } = await response.json();
        setrequestedWorkoutName(name);
        setShowEditForm(false);
    };

    // Delete request for workout name
    const onWorkoutNameDelete = async () => {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
        };
        await fetch(`${originURL}/workout/${date}/name`, requestOptions);
        setrequestedWorkoutName(null);
    };

    const renderWorkoutName = () => {
        if (showEditForm) {
            return (
                <div className="workout-name__form-container">
                    <form
                        onSubmit={onEditFormSubmit}
                        autoComplete="off"
                    >
                        <input
                            name="editInput"
                            type="text"
                            pattern="[a-zA-Z0-9 ]+"
                            onChange={onWorkoutNameInputChange}
                            value={editFormWorkoutName}
                            className="workout-name__input"
                            required
                        />
                        <button className="workout-name__button workout-name__button--add">
                            Ok
                        </button>
                    </form>
                    <p>{workoutNameError}</p>
                </div>
                
                
            );
        } else if (requestedWorkoutName && requestedWorkoutName !== 'No name') {
            return (
                <div className="workout-name__title-container">
                    <h2 className="workout-name__title">
                        {requestedWorkoutName}
                    </h2>
                    <button
                        onClick={onWorkoutNameEditClick}
                        className="workout-name__button workout-name__button--edit"
                    >
                        <AiFillEdit />
                    </button>
                    <button
                        onClick={onWorkoutNameDelete}
                        className="workout-name__button workout-name__button--delete"
                    >
                        <AiFillDelete />
                    </button>
                </div>
            );
        } else {
            return (
                <div className="workout-name__form-container">
                    <form
                        onSubmit={onWorkoutNameSubmit}
                        className="workout-name__form"
                        autoComplete="off"
                    >
                        <input
                            placeholder="Workout name"
                            type="text"
                            pattern="[a-zA-Z0-9 ]+"
                            onChange={onWorkoutNameInputChange}
                            value={workoutName}
                            name="addInput"
                            required
                            className="workout-name__input"
                        />
                        <button
                            type="submit"
                            className="workout-name__button workout-name__button--add"
                        >
                            Add
                        </button>
                    </form>
                    <p>{workoutNameError}</p>
                </div>
            );
        }
    };

    return <div>{renderWorkoutName()}</div>;
};

export default WorkoutName;
