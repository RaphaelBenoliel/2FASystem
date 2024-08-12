# Two-Factor Authentication System
Two-Factor Authentication (2FA) System for a web application to enhance security.

## Features

- **User Registration:** Allows new users to register an account.
- **User Login:** Users can log in with their username and password.
- **Enable 2FA:** Users can enable 2FA after logging in.
- **Verify 2FA:** Users are required to verify their 2FA token during login if 2FA is enabled.
- **Secure Routes:** The dashboard is accessible only after successful authentication.

## Installation

### 1. Clone the repository:

```
git clone https://github.com/yourusername/2FASystem.git
cd 2FASystem
```
### 2. Install server dependencies:

```
cd server
npm install
```

### 3. Install client dependencies:

```
cd ../client
npm install
```

### 4. Set up environment variables:

Create a \`.env\` file in both the \`client\` and \`server\` directories with the following variables:

#### For the server:

```
MONGO_URI=<your_mongo_db_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=3000
```

#### For the client:

```
REACT_APP_API_URL=http://localhost:3000
```

## Running the Application

### 1. Run the server:

```
cd server
npm run dev
```

### 2. Run the client:

```
cd client
npm start
```

The client will run on \`http://localhost:3001\` by default, and the server on \`http://localhost:3000\`.

## Running Tests

To run the tests for the backend:

```
cd server
npm run test
```

## Styles and Design

The application features a clean and modern design with consistent styles across all pages. All pages, including the Login, Register and Dashboard, share a unified look and feel.

## Technologies Used

- **Frontend:** React, React Router
- **Backend:** Node.js, Express, Mongoose, JWT
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), Speakeasy (for TOTP)
- **Styling:** CSS (with a focus on clean and responsive design)
- **Testing:** Jest, Supertest

## Troubleshooting

- Ensure that MongoDB is running and accessible via the \`MONGO_URI\` in the server's \`.env\` file.
- If you encounter issues with JWT, make sure that the \`JWT_SECRET\` is consistent and properly set in your environment variables.

## Future Enhancements

- **Password Reset:** Implement a password reset feature with email verification.
- **User Profile:** Allow users to manage their profile and 2FA settings.
- **Role-Based Access Control:** Implement roles and permissions for different user types.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
