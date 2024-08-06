const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Dummy user database
const users = [];

// Register a new user
const register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully' });
};

// Login a user
const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
    res.status(200).json({ message: 'Login successful', token });
};

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Enable 2FA for a user
const enable2FA = (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFASecret = secret.base32;

    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating QR code' });
        }

        res.status(200).json({ message: '2FA enabled', qrcode: data_url });
    });
};

// Verify 2FA token
const verify2FA = (req, res) => {
    const { username, token } = req.body;
    const user = users.find(u => u.username === username);
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

    res.status(200).json({ message: 'Token verified successfully' });
};

module.exports = { register, login, enable2FA, verify2FA };

