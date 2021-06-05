import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import './Calendar.css';

// Disable adding workouts for future dates?

const ReactCalendar = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [filledDatesArray, setFilledDatesArray] = useState([]);
    
    const formattedDate = format(date, 'yyyy-MM-dd');

    useEffect(() => {
        onDateChange(formattedDate);
    }, [onDateChange, formattedDate]);

    const onChange = (date) => {
        setDate(date);
    };

    useEffect(() => {
        const fetchDates = async () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(
                `http://localhost:3001/workout/${date}/filled`,
                requestOptions
            );
            const jsonData = await response.json();
            return jsonData;
        };
        fetchDates().then((data) => setFilledDatesArray(data))
    }, [date]);

  
    return (
        <div>
            <Calendar onChange={onChange} value={date} tileClassName={({ date, view }) => {
                if (filledDatesArray.includes(date.toISOString())) {
                    return 'highlight'
                }
            }} />
        </div>
    );
};

export default ReactCalendar;
