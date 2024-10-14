const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const multer = require('multer');
const path = require('path');

// JWT Token Creation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registration
const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists) return res.status(400).json({ message: 'Student already exists' });

    const student = await Student.create({ name, email, password });
    if (student) {
        const token = generateToken(student._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ _id: student._id, name: student.name, email: student.email });
    } else {
        res.status(400).json({ message: 'Invalid student data' });
    }
};

// Login
const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (student && (await student.matchPassword(password))) {
        const token = generateToken(student._id);
        res.cookie('token', token, { httpOnly: true });
        res.json({ _id: student._id, name: student.name, email: student.email });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Read Profile
const getProfile = async (req, res) => {
    const student = req.student;
    res.json(student);
};

// Update Profile
const updateProfile = async (req, res) => {
    const student = req.student;
    const { name, email } = req.body;

    if (name) student.name = name;
    if (email) student.email = email;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
};

// File Upload Setup
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${req.student._id}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

// File Upload API
const uploadFile = upload.single('file');
const handleFileUpload = async (req, res) => {
    const student = req.student;
    student.profilePic = req.file.path;
    await student.save();
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
};

// File Read API
const readFile = async (req, res) => {
    const filePath = req.student.profilePic;
    if (!filePath) return res.status(404).json({ message: 'No file found' });

    res.sendFile(path.resolve(filePath));
};

// Delete File API
const deleteFile = async (req, res) => {
    const student = req.student;
    const filePath = student.profilePic;

    if (!filePath) return res.status(404).json({ message: 'No file to delete' });

    student.profilePic = null;
    await student.save();
    res.json({ message: 'File deleted successfully' });
};

module.exports = {
    registerStudent,
    loginStudent,
    getProfile,
    updateProfile,
    uploadFile,
    handleFileUpload,
    readFile,
    deleteFile,
};
