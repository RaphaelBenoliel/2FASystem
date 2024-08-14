import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onAuthenticate }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the JWT token from local storage
        localStorage.removeItem('jwtToken');

        // Redirect to the login page after 3 seconds
        setTimeout(() => {
            onAuthenticate(false); // Update authentication status
            navigate('/login');
        }, 3000);
    }, [navigate, onAuthenticate]);

    return (
        <div className="logout-container">
            <div className="logout-content">
                <p className='notification'>You have successfully logged out!</p>
                <p>Thank you for using our system.</p>
                <p>Redirecting to login page...</p>
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
};

export default Logout;
