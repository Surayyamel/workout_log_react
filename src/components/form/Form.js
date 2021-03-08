import React, { useState, Fragment } from 'react';

const Form = ({title}) => {
    const [sets, setSets] = useState(0);

    const handleSetsChange = (e) => {
        setSets(e.target.value)
    }

    // Render weight input boxes depending on how many sets
    const renderWeightInputs = () => {
        const setsArray = [];
        for (let i = 1; i <= sets; i++) {
            setsArray.push((
                <div key={i}><input name="weight_input" type="number" min="0" /></div>
            ))
        }
        return setsArray;
    }

    // Show weights label if any sets
    const renderWeightLabel = () => {
        if (sets > 0) {
            return <label>Weight:</label>
        }
    }

    return (
        <Fragment>
            <h1>{title}</h1>
            <form>
                <label>
                    Workout Name:
                    <input name="workout_name" type="text"/>
                </label>
                <br />
                <label>
                    Exercise Name:
                    <input name="exercise_name" type="text"/>
                </label>
                <label>
                    Sets:
                    <input name="sets" type="number" min="0" value={sets} onChange={handleSetsChange} />
                </label>
                {renderWeightLabel()}
                {renderWeightInputs()}
            
            </form>
        </Fragment>
    );
}

export default Form;