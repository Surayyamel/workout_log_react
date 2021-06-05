import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import { FcGoogle } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import './App.scss';

// write tests
// host fontend, backend and DB on heroku

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
                    <button className="google-button__sign-out">Log out</button>
                </a>
            );
        } else {
            return (
                <div>
                    <p className="google-button__upper-text">To start tracking your weights...</p>
                    <a href="http://localhost:3001/auth/google">
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
