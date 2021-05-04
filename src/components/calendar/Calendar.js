import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns'
import './Calendar.css';

const ReactCalendar = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());

    const formattedDate = format(date, 'dd MMM yyyy');

    useEffect(() => {
        onDateChange(formattedDate)
    }, [onDateChange, formattedDate])
   

    const onChange = (date) => {
        setDate(date);
    };

    const tileContent = (
        <div>
           
        </div>
    );

    return (
        <div>
            <Calendar onChange={onChange} value={date} tileContent={tileContent} />
        </div>
    );
};

export default ReactCalendar;
