import React from 'react';


const EditButton = ({onEditClick, id, name, sets, reps, weight}) => {

    const onButtonClick = () => {
        onEditClick(id, name, sets, reps, weight)
    }
    
    return <button onClick={onButtonClick}>Edit</button>
};

export default EditButton;