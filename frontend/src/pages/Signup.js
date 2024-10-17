import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Signup() {
    const navigate = useNavigate()
    const [signupInfo, setSignupInfo] = useState(
        {
            name: '',
            email: '',
            password: '',
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("All fields must be filled");
        }

        try {
            const url = "http://localhost:8080/auth/signup"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const { message, success, error } = result
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else if (error) {
                handleError(error)
            } else if (!success) {
                handleError(message)
            }

        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className="signup-form">
            <div className="text">
                SIGNUP
            </div>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <div className="fas fa-person"></div>
                    <input
                        type="text"
                        placeholder="Name"
                        name='name'
                        autoFocus
                        onChange={handleChange}
                        value={signupInfo.name}
                    />
                </div>
                <div className="field">
                    <div className="fas fa-envelope"></div>
                    <input
                        type="text"
                        placeholder="Email"
                        name='email'
                        onChange={handleChange}
                        value={signupInfo.email}
                    />
                </div>
                <div className="field">
                    <div className="fas fa-lock"></div>
                    <input type="password"
                        placeholder="Password"
                        name='password'
                        onChange={handleChange}
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <div className="link">
                    Already have an account?
                    <Link to="/login" > Login now</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup