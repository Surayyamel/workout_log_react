import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import './Calendar.css';

const ReactCalendar = ({ onDateChange, loggedIn }) => {
    const [date, setDate] = useState(new Date());
    const [filledDatesArray, setFilledDatesArray] = useState([]);

    const originURL = process.env.REACT_APP_ORIGIN_URL;

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
                credentials: 'include',
            };
            const response = await fetch(
                `${originURL}/workout/${formattedDate}/filled`,
                requestOptions
            );

            try {
                // Array of dates (strings) that have either an exercise or workout name
                const jsonData = await response.json();
                setFilledDatesArray(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDates();
    }, [formattedDate, originURL, loggedIn]);

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
                tileClassName={({ date }) => {
                    if (
                        filledDatesArray.includes(String(date).substring(0, 15))
                    ) {
                        return 'highlight';
                    }
                }}
            />
        </div>
    );
};

export default ReactCalendar;
