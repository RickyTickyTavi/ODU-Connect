import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Link, useHistory, useLocation } from "react-router-dom";
import Balloon_group from './images/Balloon_group.png';
import { useAppContext } from "./context.js";

const API = "https://411yellows20.cs.odu.edu/getuserlogin/";

function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [redirect, setRedirect] = useState(false);
    const [isValid, setIsValid] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmit] = useState(false);
    const [loading, setLoad] = useState(false);
    const [hasError, setError] = useState(false);
    const [error, setErrorMessage] = useState('');


    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/profile' />
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmit(true);
        let response = await fetch(API + username + "/" + password);
        let data = await response.json()
        // console.log(data)
        setIsValid(data.results)
        if (data.results.length > 0) {
            data.results.map((result) => {
                if (result.LogInSuccess) {
                    localStorage.setItem('localuser', result.UserId);
                    setRedirect(true);
                    userHasAuthenticated(true);
                }
                else {
                    setErrorMessage("Username or Password incorrect.");
                }
            })
        }
    }


    if (hasError) {
        return <div>Error: {hasError.message}</div>;
    } else {
        return (
            <div className="login-center">
                {renderRedirect()}
                <h1>Login</h1>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" disabled={loading}>Login</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>

            </div>
        );
    }
}

export default Login;