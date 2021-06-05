import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import './WorkoutName.scss';

const WorkoutName = ({ date }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    // Input values for add and edit workout name forms
    const [workoutName, setWorkoutName] = useState('');
    const [editFormWorkoutName, setEditFormWorkoutName] = useState('');
    // Returned name from POST request, updated so as to force a rerender
    const [postedWorkoutName, setPostedWorkoutName] = useState('');
    // Returned name from GET request, displayed in the JSX
    const [requestedWorkoutName, setrequestedWorkoutName] = useState(null);

    useEffect(() => {
        // isMounted fix to state update on unmounted component
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
                `http://localhost:3001/workout/${date}/name`,
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
    }, [date, postedWorkoutName]);

    const onWorkoutNameSubmit = async (e) => {
        e.preventDefault();

        // Clean input data - CANNOT BE EMPTY

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                name: workoutName,
            }),
        };

        const response = await fetch(
            `http://localhost:3001/workout/${date}/name`,
            requestOptions
        );

        const jsonData = await response.json();

        // Update state to trigger a rerender and reset the input box
        setPostedWorkoutName(jsonData);
        setWorkoutName('');
    };

    const onWorkoutNameInputChange = (e) => {
        if (e.target.name === 'addInput') {
            setWorkoutName(e.target.value);
        } else if (e.target.name === 'editInput') {
            setEditFormWorkoutName(e.target.value);
        }
    };

    const onWorkoutNameEditClick = () => {
        setShowEditForm(true);
    };

    const onEditFormSubmit = async () => {
        // Make a put request
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: editFormWorkoutName,
                date: date
            })
        };
        const response = await fetch(
            `http://localhost:3001/workout/${date}/name`,
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
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await fetch(`http://localhost:3001/workout/${date}/name`, requestOptions);
        setrequestedWorkoutName(null);
    }

    const renderWorkoutName = () => {
        if (showEditForm) {
            return (
                <div className="workout-name__form-container">
                    <input
                        name="editInput"
                        onChange={onWorkoutNameInputChange}
                        value={editFormWorkoutName}
                        className="workout-name__input"
                    />
                    <button onClick={onEditFormSubmit} className="workout-name__button workout-name__button--add">Ok</button>
                </div>
            );
        } else if (requestedWorkoutName && requestedWorkoutName !== 'No name') {
            return (
                <div className="workout-name__title-container">
                    <h2 className="workout-name__title">{requestedWorkoutName}</h2>
                    <button onClick={onWorkoutNameEditClick} className="workout-name__button workout-name__button--edit"><AiFillEdit/></button>
                    <button onClick={onWorkoutNameDelete}className="workout-name__button workout-name__button--delete"><AiFillDelete/></button>
                </div>
            );
        } else {
            return (
                <div className="workout-name__form-container">
                    <form onSubmit={onWorkoutNameSubmit} className="workout-name__form">
                        <input
                            placeholder="Workout name"
                            type="text"
                            onChange={onWorkoutNameInputChange}
                            value={workoutName}
                            name="addInput"
                            required
                            className="workout-name__input"
                        />
                        <button type="submit" className="workout-name__button workout-name__button--add">Add</button>
                    </form>
                </div>
            );
        }
    };

    return <div>{renderWorkoutName()}</div>;
};

export default WorkoutName;
