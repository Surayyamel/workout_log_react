import React, { useState } from 'react';

const Form = ({ onFormSubmit, date }) => {
    const [inputFields, setInputFields] = useState([
        { exerciseName: '', sets: 0, reps: [], weight: [] },
    ]);

    // Change event for exercise name and sets
    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    };

    // Removes field when user clicks "+"
    const handleAddFields = () => {
        setInputFields([
            ...inputFields,
            { exerciseName: '', sets: 0, reps: [], weight: [] },
        ]);
    };

    // Removes field when user clicks "-"
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    
    const handleRepsAndWeightChange = (e, index) => {
        const name = e.target.name;
        const value = Number(e.target.value);
        const id = Number(e.target.id);

        const values = [...inputFields];

        values[index][name] = [
            ...values[index][name],
            { id: id, [name]: value },
        ];

        setInputFields(values);

    };

    const renderRepsAndWeightInputs = (sets, index) => {
        const setsArray = [];
        for (let i = 1; i <= sets; i++) {
            setsArray.push(
                <div key={i}>
                    Reps:
                    <input
                        id={i}
                        name="reps"
                        type="number"
                        min="0"
                        onChange={(e) => handleRepsAndWeightChange(e, index)}
                    />
                    Weight:
                    <input
                        id={i}
                        name="weight"
                        type="number"
                        min="0"
                        onChange={(e) => handleRepsAndWeightChange(e, index)}
                    />
                </div>
            );
        }

        return setsArray;
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const finalValues = [];

        inputFields.map((inputField) => {
            // Array for weights
            const uniqueArray = [];
            // Array for reps
            const uniqueArray2 = [];
            
            const reversedWeight = inputField.weight.reverse();
            const reversedReps = inputField.reps.reverse();
            
            reversedWeight.map((weights) => {
                let i = uniqueArray.findIndex((x) => x.id === weights.id);
                if (i <= -1) {
                    uniqueArray.push({
                        id: weights.id,
                        weight: weights.weight,
                    });
                }
            });

            reversedReps.map((rep) => {
                let i = uniqueArray2.findIndex((x) => x.id === rep.id);
                if (i <= -1) {
                    uniqueArray2.push({
                        id: rep.id,
                        reps: rep.reps,
                    });
                }
            });

            const values = inputField;
            values.weight = uniqueArray;
            values.reps = uniqueArray2;

            finalValues.push(values)

            return;
        });

        setInputFields(finalValues);
     
        onFormSubmit(finalValues);

    };

    return (
        <div className="App">
            <h1>Add Workout</h1>
            <h2>{date.toString()}</h2>
            <form onSubmit={onSubmit}>
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <label>
                            Exercise Name:
                            <input
                                type="text"
                                name="exerciseName"
                                value={inputField.exerciseName}
                                onChange={(event) =>
                                    handleInputChange(index, event)
                                }
                            />
                        </label>
                        <label>
                            Sets:
                            <input
                                type="number"
                                name="sets"
                                min="0"
                                value={inputField.sets}
                                onChange={(event) =>
                                    handleInputChange(index, event)
                                }
                            />
                        </label>
                        <label>
                            {renderRepsAndWeightInputs(inputField.sets, index)}
                        </label>
                        <button
                            type="button"
                            onClick={() => handleRemoveFields(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAddFields()}>
                    +
                </button>
                <button>Send</button>
            </form>
        </div>
    );
};

export default Form;

// Create componenent to list all current exercises for that user/date