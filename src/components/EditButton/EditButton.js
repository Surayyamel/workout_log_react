import React from 'react';
import { AiFillEdit } from "react-icons/ai"
import './EditButton.scss';


const EditButton = ({onEditClick, id, name, sets, reps, weight}) => {

    const onButtonClick = () => {
        onEditClick(id, name, sets, reps, weight)
    }
    
    return <button onClick={onButtonClick} className="exercise-list__button exercise-list__button--edit"><AiFillEdit/></button>
};

export default EditButton;