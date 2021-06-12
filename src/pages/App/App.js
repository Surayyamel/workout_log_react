import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import { FcGoogle } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import './App.scss';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    // Check to see if a user is logged in
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
            'https://fenton-workout-log-server.herokuapp.com/loggedin',
            requestOptions
        );

        // True or false
        const loggedInStatus = await response.json();

        setLoggedIn(loggedInStatus);
    };

    const renderButtons = () => {
        if (loggedIn) {
            return (
                <a href="https://fenton-workout-log-server.herokuapp.com/logout">
                    <button className="google-button__sign-out">Log out</button>
                </a>
            );
        } else {
            return (
                <div>
                    <p className="google-button__upper-text">To start tracking your weights...</p>
                    <a href="https://fenton-workout-log-server.herokuapp.com/auth/google">
                        <button className="google-button__sign-in">
                            <IconContext.Provider
                                value={{ className: 'google-button__icon' }}
                            >
                                <FcGoogle />
                            </IconContext.Provider>
                            <span className="google-button__sign-in-text">
                                Sign in with Google
                            </span>
                        </button>
                    </a>
                </div>
            );
        }
    };

    return (
        <div className="main-container">
            <div className="log-buttons-container">{renderButtons()}</div>
            <Home />
        </div>
    );
};

export default App;
