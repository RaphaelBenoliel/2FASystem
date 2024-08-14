import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Welcome to the Dashboard</h2>
            <p className='notification'>You are successfully logged in!</p>
        </div>
    );
};

export default Dashboard;
