import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Enable2FA from './Enable2FA';

const Login = ({ onAuthenticate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [hasTwoFA, setHasTwoFA] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            onAuthenticate(true); // Ensure the state is set correctly on reload
            navigate('/dashboard');
        }
    }, [navigate, onAuthenticate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password,
            });

            setMessage(response.data.message);
            setHasTwoFA(true);
            if (response.data.hasTwoFA) {
                setHasTwoFA(true);
            } else {
                localStorage.setItem('jwtToken', response.data.token);
                onAuthenticate(true); // Update authentication status
                navigate('/dashboard');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to login');
        }
    };

    const handle2FA = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/verify-2fa', {
                username,
                token,
            });

            setMessage(response.data.message);

            if (response.data.message === 'Token verified successfully') {
                localStorage.setItem('jwtToken', response.data.token);
                onAuthenticate(true); // Update authentication status
                navigate('/dashboard');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid 2FA token');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={hasTwoFA ? handle2FA : handleLogin}>
                {!hasTwoFA && (
                    <>
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
                    </>
                )}
                {hasTwoFA && (
                    <>
                        <Enable2FA route={username} />
                        <input
                            type="text"
                            placeholder="2FA Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                    </>
                )}
                <button type="submit">{hasTwoFA ? 'Verify 2FA' : 'Login'}</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
