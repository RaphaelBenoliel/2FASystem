const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/User');
const qrcode = require('qrcode');

// Register a new user
const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login a user with 2FA
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Use promise-based findOne method
        const user = await User.findOne({ username: username });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // const hasTwoFA = Boolean(user.twoFASecret);

        // if (hasTwoFA) {
        //     return res.status(200).json({ message: '2FA enabled, please enter the token', hasTwoFA });
        // }
        const secret = speakeasy.generateSecret({ length: 20 });
        user.twoFASecret = secret.base32;

        await user.save();

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return res.status(500).json({ message: 'Error generating QR code' });
            }

            console.log('2FA Secret:', secret.base32);  // Log the generated secret
            res.status(200).json({ message: 'In order to Login, You need enter the 2FA 6 digit code', qrcode: data_url });
        });

        // Generate JWT token
        // const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Enable 2FA
const enable2FA = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const secret = speakeasy.generateSecret({ length: 20 });
        user.twoFASecret = secret.base32;

        await user.save();

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return res.status(500).json({ message: 'Error generating QR code' });
            }

            console.log('2FA Secret:', secret.base32);  // Log the generated secret
            res.status(200).json({ message: '2FA enabled', qrcode: data_url });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const verify2FA = async (req, res) => {
    const { username, token } = req.body;

    try {
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verified = speakeasy.totp.verify({
            secret: user.twoFASecret,
            encoding: 'base32',
            token,
        });

        if (!verified) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Generate JWT token upon successful 2FA verification
        const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Token verified successfully', token: jwtToken });
    } catch (error) {
        console.error('Error verifying 2FA:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Verify 2FA Token
// const verify2FA = async (req, res) => {
//     const { username, token } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         console.log('User Secret:', user.twoFASecret); // Log the stored secret
//         console.log('Token Provided:', token);         // Log the provided token

//         // Verify the TOTP token
//         const verified = speakeasy.totp.verify({
//             secret: user.twoFASecret,
//             encoding: 'base32',
//             token,
//             window: 1 // Allow some time skew
//         });

//         console.log('Verification result:', verified); // Log the verification result

//         if (!verified) {
//             return res.status(400).json({ message: 'Invalid token' });
//         }

//         res.status(200).json({ message: 'Token verified successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


// // Login with 2FA
// const login = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user || !bcrypt.compareSync(password, user.password)) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         const jwtToken = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

//         res.status(200).json({
//             message: 'Login successful',
//             token: jwtToken,
//             hasTwoFA: !!user.twoFASecret // Send this information to the client
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


module.exports = { register, enable2FA, verify2FA, login };
