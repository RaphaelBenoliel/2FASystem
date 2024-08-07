const app = require('./app');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Optional: Handle graceful shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process terminated');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});
