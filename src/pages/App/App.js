import React, { useState, useEffect, Fragment } from 'react';
import Home from '../Home/Home';
// remove react-router

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        isLoggedIn();
    });

    const isLoggedIn = async () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(
            'http://localhost:3001/loggedin',
            requestOptions
        );
        const jsonData = await response.json();

        setLoggedIn(jsonData);
    };

    const renderButtons = () => {
        if (loggedIn) {
            return (
                <a href="http://localhost:3001/logout">
                    <button>Log out</button>
                </a>
            );
        } else {
            return (
                <a href="http://localhost:3001/auth/google">
                    <button>Log in with google</button>
                </a>
            );
        }
    };

    return (
        <Fragment>
            {renderButtons()}
            <Home />
        </Fragment>
    );
};

export default App;
