import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import './Calendar.css';

const ReactCalendar = ({ onDateChange }) => {
    const [selectedDate, setDate] = useState(new Date());
    const [filledDatesArray, setFilledDatesArray] = useState([]);

    const originURL = process.env.REACT_APP_ORIGIN_URL;

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(
                `${originURL}/workout/${selectedDate}/filled`,
                requestOptions
            );

            // Array of dates that have either an exercise or workout name
            const jsonData = await response.json();
            return jsonData;
        };
        fetchDates().then((data) => setFilledDatesArray(data))
    }, [selectedDate, originURL]);

    console.log(filledDatesArray)

    return (
        <div>
            <Calendar onChange={onChange} value={selectedDate} tileClassName={({ date }) => {
                console.log('date', date)
                console.log('dateToISO', date.toISOString())
                if (filledDatesArray.includes(date.toISOString())) {
                    console.log(('highlight'))
                    return 'highlight'
                }
            }} />
        </div>
    );
};

export default ReactCalendar;
