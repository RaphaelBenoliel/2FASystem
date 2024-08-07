

const express = require('express');
const { register, login, enable2FA, verify2FA } = require('./controllers/UserController');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome to the 2FA system');
});
router.post('/api/register', register);
router.post('/api/login', login);
router.post('/api/enable-2fa', enable2FA);
router.post('/api/verify-2fa', verify2FA);

module.exports = router;
