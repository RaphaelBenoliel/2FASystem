import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Enable2FA from './Enable2FA';
import '../styles.css';


const Login = ({ onAuthenticate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [hasTwoFA, setHasTwoFA] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            onAuthenticate(true);
            navigate('/dashboard');
        }
    }, [navigate, onAuthenticate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username,
                password,
            });
            setQrCode(response.data.qrcode);
            setMessage(response.data.message);
            setMessageError('');
            setHasTwoFA(true);
           
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            setMessage('');
            setMessageError(error.response?.data?.message || 'Failed to login');
        }finally{
            setTimeout(() => {
                setLoading(false);
            }
            , 2000);
        }
    };

    const handle2FA = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/verify-2fa', {
                username,
                token,
            });

            setMessage(response.data.message);

            if (response.data.message === 'Token verified successfully') {
                localStorage.setItem('jwtToken', response.data.token);
                // Update authentication status
                setTimeout(() => {
                    onAuthenticate(true);
                    setLoading(false);
                    navigate('/dashboard');
                }, 2000);
            }
        } catch (error) {
            
            setMessageError(error.response?.data?.message || 'Invalid 2FA token');
            setMessage('Enter the valid 2FA token from your authenticator app');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        
        <div>
            {loading ? (
                <div className="loading-spinner"></div>): (

            <>
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
                {hasTwoFA &&(
                    <>
                        <Enable2FA route={qrCode} />
                        <input
                            type="text"
                            placeholder="6-Digit Code (e.g., 123456)"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                    </>
                )}
                <button type="submit">{hasTwoFA ? 'Verify 2FA' : 'Login'}</button>
            </form>
            {messageError&& (
                <div className='notification-error'>{messageError}</div>)}
            {message && (
                <div className='notification'>{message}</div>
            )}
            </>
            )}
        </div>
    );
};

export default Login;
