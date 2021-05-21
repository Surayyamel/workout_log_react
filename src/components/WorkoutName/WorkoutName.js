import React, { useState, useEffect } from 'react';

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
                date: date,
            }),
        };
        const response = await fetch(
            `http://localhost:3001/workout/${date}/name`,
            requestOptions
        );
        const { name } = await response.json();
        setrequestedWorkoutName(name);
        setShowEditForm(false);
    };

    const renderWorkoutName = () => {
        if (showEditForm) {
            return (
                <div>
                    <input
                        name="editInput"
                        onChange={onWorkoutNameInputChange}
                        value={editFormWorkoutName}
                    />
                    <button onClick={onEditFormSubmit}>Ok</button>
                </div>
            );
        } else if (requestedWorkoutName && requestedWorkoutName !== 'No name') {
            return (
                <div>
                    <h2>{requestedWorkoutName}</h2>
                    <button onClick={onWorkoutNameEditClick}>Edit</button>
                </div>
            );
        } else {
            return (
                <div>
                    <form onSubmit={onWorkoutNameSubmit}>
                        <input
                            placeholder="Workout name"
                            type="text"
                            onChange={onWorkoutNameInputChange}
                            value={workoutName}
                            name="addInput"
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
            );
        }
    };

    return <div>{renderWorkoutName()}</div>;
};

export default WorkoutName;
