import React from 'react';
import { AiFillEdit } from "react-icons/ai"
import './EditButton.scss';


const EditButton = ({onEditClick, exerciseId, name, sets, reps, weight}) => {

    const onButtonClick = () => {
        onEditClick(exerciseId, name, sets, reps, weight)
    }
    
    return <button onClick={onButtonClick} className="exercise-list__button exercise-list__button--edit"><AiFillEdit/></button>
};

export default EditButton;