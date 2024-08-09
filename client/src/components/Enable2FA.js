/* eslint-disable no-unused-vars */
// import React, { useState,useEffect } from 'react';
// import axios from 'axios';

// const Enable2FA = ({route}) => {
//     console.log(route);
//     const [username, setUsername] = useState('');
//     const [message, setMessage] = useState('');
//     const [qrCode, setQrCode] = useState('');
//     setUsername(route);
//     useEffect(() => {
//         const enable2FA = async () => {
//             try {
//                 const response = await axios.post('http://localhost:3000/api/enable-2fa', {
//                     username,
//                 });
//                 setMessage(response.data.message);
//                 setQrCode(response.data.qrcode);
//             } catch (error) {
//                 console.error('Enable 2FA Error:', error.response?.data || error.message);
//                 setMessage(error.response?.data?.message || 'Failed to enable 2FA');
//             }
//         }
//         enable2FA();
//     }
//     , );


        

// //      // Enable2FA.js
// // const handleEnable2FA = async (e) => {
// //     e.preventDefault();
// //     try {
// //         const response = await axios.post('http://localhost:3000/api/enable-2fa', {
// //             username,
// //         });
// //         setMessage(response.data.message);
// //         setQrCode(response.data.qrcode);
// //     } catch (error) {
// //         console.error('Enable 2FA Error:', error.response?.data || error.message);
// //         setMessage(error.response?.data?.message || 'Failed to enable 2FA');
// //     }
// // };

//     return (
//         <div>
//             {/* <h2>Enable 2FA</h2>
//             <form onSubmit={handleEnable2FA}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Enable 2FA</button>
//             </form> */}
//             {qrCode && (
//                 <div className="qr-container">
//                     <p>Scan this QR code using one of the following apps:</p>
//                     <img src={qrCode} alt="QR Code" />
//                     <div className="app-links">
//                         <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noopener noreferrer">
//                             <img src="/images/google-authenticator.png" alt="Google Authenticator" />
//                             Google Authenticator
//                         </a>
//                         <a href="https://apps.apple.com/us/app/google-authenticator/id388497605" target="_blank" rel="noopener noreferrer">
//                             <img src="/images/apple.png" alt="Apple Store" />
//                             Google Authenticator (iOS)
//                         </a>
//                         <a href="https://authy.com/download/" target="_blank" rel="noopener noreferrer">
//                             <img src="/images/authy.png" alt="Authy" />
//                             Authy
//                         </a>
//                     </div>
//                 </div>
//             )}
//             <p>{message}</p>
//         </div>
//     );
// };

// export default Enable2FA;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enable2FA = ({ route }) => {
    const [username, setUsername] = useState(route);  
    const [message, setMessage] = useState('');
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
          // Update username when route changes
        const enable2FA = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/enable-2fa', {
                    username,
                });
                // setMessage(response.data.message);
                setQrCode(response.data.qrcode);
            } catch (error) {
                console.error('Enable 2FA Error:', error.response?.data || error.message);
                setMessage(error.response?.data?.message || 'Failed to enable 2FA');
            }
        };

        if (username) {
            enable2FA();  // Only call if username is set
        }
    }, [ username], );  // Dependency array includes username

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
