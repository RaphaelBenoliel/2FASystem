import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateUsername = (username) => {
        const usernameRegex = /^[A-Za-z][A-Za-z0-9.]{4,20}$/;
        return usernameRegex.test(username);
    };
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 20;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Input validation
        if (!validateUsername(username)) {
            setMessageError('Username must be 5-21 chars, starts with a letter, may include numbers or dots.');
            return;
        }

        if (!validatePassword(password)) {
            setMessageError('Password must be 8-20 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setMessageError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                username,
                password,
            });
            setLoading(false);
            setMessageError('');
            setMessage(response.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessageError(error.response?.data?.message || 'Registration failed');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Register</button>
                    </form>
                    {messageError && (
                        <div className="notification-error">{messageError}</div>
                    )}
                    {message && (
                        <div className="notification">{message}</div>
                    )}
                </>
            )}
        </div>
    );
};

export default Register;
