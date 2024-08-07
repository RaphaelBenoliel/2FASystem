const request = require('supertest');
const app = require('../app'); // Import your Express app (not the server)
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const mongoose = require('mongoose'); // Import mongoose for connection handling

describe('User Authentication', () => {
    let server;

    beforeAll(async () => {
        // Start the server on a test port
        server = app.listen(3005, () => {
            console.log(`Test server running on port 3005`);
        });

        // Clear existing test data for the username
        await User.deleteMany({ username: 'testuser' });
        await User.deleteMany({ username: 'newuser' }); // Make sure to delete 'newuser' if exists

        // Create a test user with a hashed password
        const hashedPassword = bcrypt.hashSync('testpassword', 10);
        const user = new User({
            username: 'testuser',
            password: hashedPassword,
            twoFASecret: speakeasy.generateSecret({ length: 20 }).base32,
        });
        await user.save();
    });

    afterAll(async () => {
        // Clean up test data
        await User.deleteMany({ username: 'testuser' });
        await User.deleteMany({ username: 'newuser' });

        // Close mongoose connection
        await mongoose.connection.close();

        // Stop the server and wait for it to close
    await new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err);
            console.log('Test server closed');
            resolve();
        });
    });
    });

    test('Register a new user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'newuser', // Ensure this username is not used in another test
                password: 'newpassword'
            });

        expect(response.statusCode).toBe(201); // Ensure status code is 201 (Created)
        expect(response.body.message).toBe('User registered successfully'); // Check for success message
    });

    test('Login a user with valid credentials', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'testuser',
                password: 'testpassword' // Make sure this matches the test setup
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toContain('2FA enabled');
    });

    test('Enable 2FA for a user', async () => {
        const response = await request(app)
            .post('/api/enable-2fa')
            .send({
                username: 'testuser'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('2FA enabled');
        expect(response.body.qrcode).toBeTruthy();
    });

    test('Verify 2FA token', async () => {
        // Generate a valid 2FA token for the test
        const user = await User.findOne({ username: 'testuser' });
        const validToken = speakeasy.totp({
            secret: user.twoFASecret,
            encoding: 'base32'
        });

        const response = await request(app)
            .post('/api/verify-2fa')
            .send({
                username: 'testuser',
                token: validToken
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Token verified successfully');
    });
});
