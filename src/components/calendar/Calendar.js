import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import './Calendar.css';

const ReactCalendar = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [filledDatesArray, setFilledDatesArray] = useState([]);
    
    const formattedDate = format(date, 'yyyy-MM-dd');

    useEffect(() => {
        // Callback from Home component, updates the date state
        onDateChange(formattedDate);
    }, [onDateChange, formattedDate]);

    const onChange = (date) => {
        setDate(date);
    };

    useEffect(() => {
        const fetchDates = async () => {
            const requestOptions = {
                method: 'GET',
                credentials: 'include'
            };
            const response = await fetch(
                `https://fenton-workout-log-server.herokuapp.com/workout/${date}/filled`,
                requestOptions
            );

            // Array of dates that have either an exercise or workout name
            const jsonData = await response.json();
            return jsonData;
        };
        fetchDates().then((data) => setFilledDatesArray(data))
    }, [date]);

  
    return (
        <div>
            <Calendar onChange={onChange} value={date} tileClassName={({ date }) => {
                if (filledDatesArray.includes(date.toISOString())) {
                    return 'highlight'
                }
            }} />
        </div>
    );
};

export default ReactCalendar;
