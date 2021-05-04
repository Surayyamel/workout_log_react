import React from 'react';
import { useForm } from 'react-hook-form';

function App({ onFormSubmit, date, title, defaultValues }) {

    

    // Loop over defaultValues, create an object with the insides and use that object inside the defaultValues obj of useForm


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            exerciseName: defaultValues.exerciseName,
            numberOfSets: defaultValues.numberOfSets || null,
            
        },
    });

    const onSubmit = (data) => {
        onFormSubmit(data);
    };

    // Watch to enable rerender when sets number is changed
    const watchNumberOfSets = watch('numberOfSets');

    // Return array of sets indexes. Using the spread assings the indexes (if use new Array, you get [empty x n])
    const setsNumbers = () => {
        return [...Array(parseInt(watchNumberOfSets || 0)).keys()];
    };

    const onReset = () => {
        reset();
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
            <select {...register('numberOfSets', {required: 'Please enter a valid number'})}>
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
                    <input {...register(`reps${i}`, {required: 'Please enter a valid number'})} type="number" min="0" />

                    <label>Weight:</label>
                    <input
                        {...register(`weight${i}`, {required: 'Please enter a valid number'})}
                        type="number"
                        min="0"
                    />
                </div>
            ))}

            <button type="submit">Add</button>
            <button type="reset" onClick={onReset}>
                Reset
            </button>
        </form>
    );
}

export default App;

//  {errors.exerciseName.message ? <span>{errors.exerciseName.message}</span> : ''}
//  {errors.exerciseName ? <p>{errors.exerciseName.message}</p> : ''}

// set0reps: defaultValues.set0reps || null,
//             set0weight: defaultValues.set0weight || null,
//             set1reps: defaultValues.set1reps || null,
//             set1weight: defaultValues.set1weight || null,
//             set2reps: defaultValues.set2reps || null,
//             set2weight: defaultValues.set2weight || null,
//             set3reps: defaultValues.set3reps || null,
//             set3weight: defaultValues.set3weight || null,
//             set4reps: defaultValues.set4reps || null,
//             set4weight: defaultValues.set4weight || null,
//             set5reps: defaultValues.set5reps || null,
//             set5weight: defaultValues.set5weight || null,
//             set6reps: defaultValues.set6reps || null,
//             set6weight: defaultValues.set6weight || null,
//             set7reps: defaultValues.set7reps || null,
//             set7weight: defaultValues.set7weight || null,
//             set8reps: defaultValues.set8reps || null,
//             set8weight: defaultValues.set8weight || null,
//             set9reps: defaultValues.set9reps || null,
//             set9weight: defaultValues.set9weight || null,