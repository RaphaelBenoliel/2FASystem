import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [hasTwoFA, setHasTwoFA] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password,
            });

            setMessage(response.data.message);

            if (response.data.hasTwoFA) {
                setMessage('2FA enabled, please enter the token');
                setHasTwoFA(true);
            } else {
                // Store the token and redirect to dashboard
                localStorage.setItem('jwtToken', response.data.token);
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
                // Store the token and redirect to dashboard
                localStorage.setItem('jwtToken', response.data.token);
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
                {hasTwoFA && (
                    <input
                        type="text"
                        placeholder="2FA Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                )}
                <button type="submit">{hasTwoFA ? 'Verify 2FA' : 'Login'}</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
