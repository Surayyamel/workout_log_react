import React from 'react';
import { useForm } from 'react-hook-form';

function App({ onFormSubmit, date, title, prefillData }) {
    const defaultValues = {
        exerciseName: '',
        numberOfSets: 0,
    };

    if (prefillData) {
        defaultValues.exerciseName = prefillData.name;
        defaultValues.numberOfSets = prefillData.sets;
        prefillData.reps.map((rep, i) => {
            return defaultValues[`reps${i}`] = rep;
        });
        prefillData.weight.map((weight, i) => {
            return defaultValues[`weight${i}`] = weight;
        });
    }

    // Initialise form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: defaultValues,
    });

    const onSubmit = (data) => {
        if (prefillData) {
            data.id = Number(prefillData.id);
        }
        onFormSubmit(data);

    };

    // Watch to enable rerender when sets number is changed
    const watchNumberOfSets = watch('numberOfSets');

    // Return array of sets indexes. Using the spread assings the indexes (if use new Array, you get [empty x n])
    const setsNumbers = () => {
        return [...Array(parseInt(watchNumberOfSets || 0)).keys()];
    };

   
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{title}</h3>
            <label>Exercise Name:</label>
            <input
                id="exerciseName"
                {...register('exerciseName', {
                    required: 'Please enter exercise name',
                })}
            />
            <br />
            {errors.exerciseName && errors.exerciseName.message}
            <br />
            <label>Number of Sets:</label>
            <select
                {...register('numberOfSets', {
                    required: 'Please enter a valid number',
                })}
            >
                {['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                    return (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    );
                })}
            </select>

            {setsNumbers().map((i) => (
                <div key={i}>
                    <h5>Set {i + 1}</h5>
                    <label>Reps:</label>
                    <input
                        {...register(`reps${i}`, {
                            required: 'Please enter a valid number',
                        })}
                        type="number"
                        min="0"
                    />

                    <label>Weight:</label>
                    <input
                        {...register(`weight${i}`, {
                            required: 'Please enter a valid number',
                        })}
                        type="number"
                        min="0"
                    />
                </div>
            ))}

            <button type="submit">Add</button>
            
        </form>
    );
}

export default App;
