import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = Cookies.get("jwt_token");
        if (token !== undefined) {
            navigate("/");
        }
    }, []);

    const onGetUserName = (event) => {
        setUserName(event.target.value);
    };

    const onGetEmail = (event) => {
        setEmail(event.target.value);
    };

    const onGetGender = (event) => {
        setGender(event.target.value);
    };

    const onGetPhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const onGetPassword = (event) => {
        setPassword(event.target.value);
    };

    const onGetConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const url = "http://localhost:4325/auth/signup";
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                userName,
                email,
                gender,
                phoneNumber,
                password,
                confirmPassword,
            }),
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                navigate("/");
            } else {
                setShowSubmitError(true);
                setErrorMsg(data.message);
            }
        } catch (error) {
            setShowSubmitError(true);
            setErrorMsg("An error occurred while signing up.");
        }

        setUserName("");
        setEmail("");
        setGender("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="signup-container">
            <form className="signup-form-container">
                <div className="forms">
                    <div className="form-logo-container">
                        <img
                            className="logo"
                            src="au.jpeg"
                            alt="Description of the image"
                        />
                    </div>
                    <div className="form-group">
                        <div className="arrengement">
                            <div>
                                <div className="label-form">
                                    <label className="form-label" htmlFor="userName">
                                        User Name
                                    </label>
                                    <div className="form-out">
                                        <i className="fas fa-user"></i>
                                        <input
                                            className="form-input"
                                            type="text"
                                            value={userName}
                                            onChange={onGetUserName}
                                            placeholder="user name"
                                            id="userName"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="form-count">
                                    <label className="form-labels" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="form-out">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            className="form-input"
                                            type="text"
                                            value={email}
                                            onChange={onGetEmail}
                                            placeholder="email"
                                            id="email"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="arrengement">
                            <div>
                                <div className="form-count">
                                    <label className="form-labels" htmlFor="gender">
                                        Gender
                                    </label>
                                    <div className="form-out">
                                        <i className="fas fa-venus-mars"></i>
                                        <input
                                            className="form-input"
                                            type="text"
                                            value={gender}
                                            onChange={onGetGender}
                                            placeholder="gender"
                                            id="gender"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="form-count">
                                    <label className="form-labels" htmlFor="phoneNumber">
                                        Phone Number
                                    </label>
                                    <div className="form-out">
                                        <i className="fas fa-phone"></i>
                                        <input
                                            className="form-input"
                                            type="text"
                                            value={phoneNumber}
                                            onChange={onGetPhoneNumber}
                                            placeholder="phone number"
                                            id="phoneNumber"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="arrengement">
                            <div>
                                <div className="form-count">
                                    <label className="form-labels" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="form-out">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            className="form-input"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={onGetPassword}
                                            placeholder="password"
                                            id="password"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="form-count">
                                    <label className="form-labels" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <div className="form-out">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            className="form-input"
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={onGetConfirmPassword}
                                            placeholder="confirm password"
                                            id="confirmPassword"
                                            required
                                        />
                                    </div>
                                    <br />
                                    {showSubmitError && (
                                        <p className="error-message">*{errorMsg}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            className="button-icons"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide Password" : "Show Password"}
                        </button>
                        <br />
                        <br />
                        <button
                            className="form-submit-button"
                            type="submit"
                            onClick={onSubmitForm}
                        >
                            Sign Up
                        </button>
                        <p>
                            <a className="link" href="/login">
                                Already have an account Login
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

