import React from 'react';


const EditButton = ({onEditClick, name, sets, reps, weight}) => {
    //console.log(name, sets, reps, weight)

    const onButtonClick = () => {
        onEditClick(name, sets, reps, weight)
    }
    
    return <button onClick={onButtonClick}>Edit</button>
};

export default EditButton;