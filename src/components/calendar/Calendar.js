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
                `${originURL}/workout/${date}/filled`,
                requestOptions
            );

            // Array of dates that have either an exercise or workout name
            const jsonData = await response.json();
            setFilledDatesArray(jsonData)

        };
        if (loggedIn) {
            fetchDates();
        }
       
        //.then((data) => setFilledDatesArray(data));
    }, [date, originURL, loggedIn]);


    // Convert ISO timestamp to Date object to string so Calendar date comparaison succeeds
    const datesFromStamps = filledDatesArray.map((date) => {
        return String(new Date(date)).substring(0, 15);
    });

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
                tileClassName={({ date }) => {
                    if (
                        datesFromStamps.includes(String(date).substring(0, 15))
                    ) {
                        return 'highlight';
                    }
                }}
            />
        </div>
    );
};

export default ReactCalendar;
