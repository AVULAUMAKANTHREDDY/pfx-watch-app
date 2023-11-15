


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token !== undefined) {
            navigate("/");
        }
    }, []);

    const onGetEmail = (event) => {
        setEmail(event.target.value);
    };

    const onGetPassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const url = "http://localhost:4325/auth/login";
        const options = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                Cookies.set('jwt_token', data.token);
                navigate("/");
            } else {
                setShowSubmitError(true);
                setErrorMsg(data.message);
            }
        } catch (error) {
            setShowSubmitError(true);
            setErrorMsg("An error occurred while logging in.");
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="login-container">
            <form className="login-form-container">
                <div className="forms">
                    <div className="form-logo-container  ">
                        <img className="logo"  src='au.jpeg' alt="Description of the image" />
                    </div>
                    <div className="form-group">
                        <div className="label-form">

                            <label className="form-label" htmlFor="email">
                                Email
                            </label>

                            <div className="form-out">
                                <i class="fas fa-user"></i>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={email}
                                    onChange={onGetEmail}
                                    placeholder="email"
                                    id="email"
                                    required
                                /><br />

                            </div>
                        </div>
                        {showSubmitError && <p className="error-message">*{errorMsg}</p>}

                        <br />
                        <div className="form-count">

                            <label className="form-labels" htmlFor="password">
                                PASSWORD
                            </label>
                            <div>
                                <div className="form-out">
                                    <i class="fas fa-lock"></i>
                                  
                                    <input

                                        className="form-input"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={onGetPassword}
                                        placeholder="password" id="password"
                                        required

                                    />

                                </div>



                                <br />
                                {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                            </div>
                        </div>
                        <br />
                        <button className="button-icons" type="text" onClick={() => setShowPassword(!showPassword)} value={showPassword ? 'Show Password' : 'Hide Password'}>S/H Psw</button>
                        <br />
                        <br />
                        <button className="form-submit-button" type="submit" onClick={onSubmitForm}>Login</button>
                        <p><a className="link" href="/signup" >if you are not having an account signup</a></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
