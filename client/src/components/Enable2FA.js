/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Enable2FA = ({ route }) => {
    const [message, setMessage] = useState('');
    const [qrCode, setQrCode] = useState(route);

    return (
        <div>
            {qrCode && (
                <div className="qr-container">
                    <img src={qrCode} alt="QR Code" />
                    <p>Scan this QR code using one of the following apps:</p>

                    <div className="app-links">
                    
                        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noopener noreferrer">
                            <img src="/images/google-authenticator.png" alt="Google Authenticator" />
                          
                        </a>
                        <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" rel="noopener noreferrer">
                            <img src="/images/apple.png" alt="Apple Store" />
                           
                        </a>
                        <a href="https://authy.com/download/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/authy.png" alt="Authy" />
                           
                        </a>
                        
                    </div>
                </div>
            )}
            <p>{message}</p>
        </div>
    );
};

export default Enable2FA;
