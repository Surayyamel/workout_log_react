import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import './Calendar.css';

const ReactCalendar = ({ onDateChange }) => {
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
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(
                `${originURL}/workout/${date}/filled`,
                requestOptions
            );

            // Array of dates that have either an exercise or workout name
            const jsonData = await response.json();
            return jsonData;
        };

        fetchDates().then((array) => setFilledDatesArray(array));
    }, [date, originURL]);

    const formattedArray = filledDatesArray.map((day) => {
        return day.split('T')[0];
    });

    console.log(formattedArray);

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
                tileClassName={({ date }) => {
                    if (
                        formattedArray.includes(
                            date.toISOString().split('T')[0]
                        )
                    ) {
                        console.log(date)
                        return 'highlight';
                    }
                }}
            />
        </div>
    );
};

export default ReactCalendar;
