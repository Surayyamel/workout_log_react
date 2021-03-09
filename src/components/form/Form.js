import React, { useState, Fragment, useEffect } from 'react';

const Form = ({ title, onFormSubmit, date }) => {
    const [sets, setSets] = useState(0);
    const [weight, setWeight] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [checkedItems, setCheckedItems] = useState({
        'upper-body': false,
        'lower-body': false,
        fullbody: false,
        cardio: false,
        core: false,
    });

    const weightsArray = [];

    const checkboxes = [
        {
            name: 'upper-body',
            key: 'upper',
            label: 'Upper-body',
        },
        {
            name: 'lower-body',
            key: 'lower',
            label: 'Lower-body',
        },
        {
            name: 'fullbody',
            key: 'full',
            label: 'Full-body',
        },
        {
            name: 'cardio',
            key: 'cardio',
            label: 'Cardio',
        },
        {
            name: 'core',
            key: 'core',
            label: 'Core',
        },
    ];

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

    const handleSetsChange = (e) => {
        setSets(e.target.value);
    };

    const handleWeightChange = (e) => {
        const weightValue = Number(e.target.value);
        const id = Number(e.target.id);

        weightsArray.push({ id, weightValue });
    };

    const onSubmitBtnClick = () => {
        const filteredArray = getNewestUnique(weightsArray);
        setWeight(filteredArray);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Call callback to send form state to parent
        onFormSubmit({
            exerciseName: exerciseName,
            sets: sets,
            weight: weight,
            checked: checkedItems
        });
    };


    const onExerciseNameChange = (e) => {
        e.preventDefault();
        setExerciseName(e.target.value);
    };

    const onCheckboxChange = (e) => {
        setCheckedItems({ ...checkedItems, [e.target.name]: e.target.checked });
    };

    useEffect(() => {
        //console.log('checked items: ', checkedItems);
    }, [checkedItems]);

    return (
        <Fragment>
            <h1>{title}</h1>
            <h2>{date.toString()}</h2>

            <form>
                Exercise Type:
                {checkboxes.map((checkbox) => (
                    <label key={checkbox.key}>
                        {checkbox.label}
                        <input
                            type="checkbox"
                            name={checkbox.name}
                            checked={checkedItems[checkbox.name]}
                            onChange={onCheckboxChange}
                        />
                    </label>
                ))}
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
