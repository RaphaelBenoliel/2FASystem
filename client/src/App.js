import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Enable2FA from './components/Enable2FA';
// import Verify2FA from './components/Verify2FA';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import './styles.css';


const App = () => {
  const [hasTwoFA, setHasTwoFA] = useState(false);
  const [token, setToken] = useState('');
    useEffect(() => {
        // Check if the user is authenticated
        setToken(localStorage.getItem('jwtToken')); 
        if(token) {
          setHasTwoFA(true);
        }
        else{
          setHasTwoFA(false);
          
        }
        
    }, [hasTwoFA,token]);
    return (
        <Router>
            <div className="container">
                <h1>Two-Factor Authentication System</h1>
                {!hasTwoFA && (
                <nav>
                    <ul>
                        <li><Link to="/">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        {/* <li><Link to="/enable-2fa">Enable 2FA</Link></li>
                        <li><Link to="/verify-2fa">Verify 2FA</Link></li> */}
                        {/* <li><Link to="/dashboard">Dashboard</Link></li> Add link to Dashboard */}
                    </ul>
                </nav>
                 )}
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/enable-2fa" element={<Enable2FA />} />
                    {/* <Route path="/verify-2fa" element={<Verify2FA />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} /> {/* Add route for Dashboard */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
