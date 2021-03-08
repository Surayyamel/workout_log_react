import React, { Fragment } from 'react';
import Calendar from '../../components/calendar/Calendar';
import Form from '../../components/form/Form';

const Home = () => {
    return (
        <Fragment>
            <Calendar />
            <Form title={'Add Workout'} />
           
        </Fragment>
    );
}

export default Home;

// Show:
// Calendar
// View Workout
// Form: - Edit from view workout
//       - Add new from clicked empty day