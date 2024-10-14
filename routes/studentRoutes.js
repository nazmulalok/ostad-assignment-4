const express = require('express');
const router = express.Router();
const {
    registerStudent,
    loginStudent,
    getProfile,
    updateProfile,
    uploadFile,
    handleFileUpload,
    readFile,
    deleteFile,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/upload', protect, uploadFile, handleFileUpload);
router.get('/read-file', protect, readFile);
router.delete('/delete-file', protect, deleteFile);

module.exports = router;
