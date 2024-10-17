import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify'

function Login() {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo }
        copyLoginInfo[name] = value
        setLoginInfo(copyLoginInfo)
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo

        if (!email || !password) {
            return handleError('All fields is required!')
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })

            const result = await response.json()
            const { message, success, jwtToken, name, error } = result
            if (success) {
                handleSuccess(message)
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                handleError(error)
            } else if (!success) {
                handleError(message)
            }
            console.log(result);

        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className="login-form">
            <div className="text">
                LOGIN
            </div>
            <form onSubmit={handleLogin}>
                <div className="field">
                    <div className="fas fa-envelope"></div>
                    <input name='email' type="text" placeholder="Email" value={loginInfo.email} autoFocus onChange={handleChange} />
                </div>
                <div className="field">
                    <div className="fas fa-lock"></div>
                    <input name='password' type="password" placeholder="Password" value={loginInfo.password} onChange={handleChange} />
                </div>
                <button type='submit'>LOGIN</button>
                <div className="link">
                    Not a member?
                    <Link to="/signup"> Signup now</Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login