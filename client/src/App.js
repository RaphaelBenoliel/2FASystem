import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Enable2FA from './components/Enable2FA';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import './styles.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setIsAuthenticated(!!token); // Convert token to boolean
    }, []);

    const handleAuthentication = (authStatus) => {
        setIsAuthenticated(authStatus);
    };

    return (
        <Router>
            <div className="container">
                <h1>Two-Factor Authentication System</h1>
                <nav>
                    <ul>
                        {!isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                              <Link to="/logout">Logout</Link> 
                            </li>
                        )}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login onAuthenticate={handleAuthentication} />} />
                    <Route path="/enable-2fa" element={<Enable2FA />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/logout" element={<Logout onAuthenticate={handleAuthentication} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
