const express = require('express');
const router = express.Router();
const { register, login, enable2FA, verify2FA } = require('./controllers/userController');

router.get('/', (req, res) => {
    res.send('Welcome to the 2FA system');
});

router.post('/register', register);
router.post('/login', login);
router.post('/enable-2fa', enable2FA);
router.post('/verify-2fa', verify2FA);

module.exports = router;
