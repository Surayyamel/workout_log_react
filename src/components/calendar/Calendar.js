import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns'
import './Calendar.css';

// Disable adding workouts for future dates?


const ReactCalendar = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());

    // DATEEEEE
    const formattedDate = format(date, 'yyyy-MM-dd');
    

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
