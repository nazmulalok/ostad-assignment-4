const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/api/students', studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
