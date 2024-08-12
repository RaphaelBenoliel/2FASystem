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
                    <div className="app-links">
                    <p>Scan this QR code using one of the following apps:</p>
                        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noopener noreferrer">
                            <img src="/images/google-authenticator.png" alt="Google Authenticator" />
                            Google Authenticator
                        </a>
                        <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" rel="noopener noreferrer">
                            <img src="/images/apple.png" alt="Apple Store" />
                            Google Authenticator (iOS)
                        </a>
                        <a href="https://authy.com/download/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/authy.png" alt="Authy" />
                            Authy
                        </a>
                        
                    </div>
                </div>
            )}
            <p>{message}</p>
        </div>
    );
};

export default Enable2FA;
