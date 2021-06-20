import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import { FcGoogle } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import './App.scss';
require('dotenv').config();

const originURL = process.env.REACT_APP_ORIGIN_URL;

const App = () => {
    const [loggedIn, setLoggedIn] = useState("out");
    try {
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
                `${originURL}/loggedin`,
                requestOptions
            );

            // True or false
            const loggedInStatus = await response.json();

            setLoggedIn(loggedInStatus);
        };
    } catch (error) {
        console.error(error);
    }

    const renderButtons = () => {
        if (loggedIn === "in") {
            return (
                <a href={`${originURL}/logout`}>
                    <button className="google-button__sign-out" onClick={() => console.log('log out click')}>Log out</button>
                </a>
            );
        } else {
            return (
                <div>
                    <p className="google-button__upper-text">
                        To start tracking your weights...
                    </p>
                    <a href={`${originURL}/auth/google`}>
                        <button className="google-button__sign-in" onClick={() => console.log('log in click')}>
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

    const showHome = () => {
        if (loggedIn === "in") {
            return <Home loggedIn={loggedIn} />
        } else {
            return (
                <div className="header-text__container">
                    <p className="header-text__sentance">Ready to keep track of your workouts and weights? Sign in now!</p>
                    
                </div>
            );
        }
    }

    return (
        <div className="main-container">
        <div className="log-buttons-container">{renderButtons()}</div>
            {showHome()}
        </div>
    );
};

export default App;
