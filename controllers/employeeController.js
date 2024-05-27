import Employee from '../models/employeeModel.js';
import authService from '../services/authService.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
});

const register = async (req, res) => {
    try {
        const newEmployee = await authService.registerEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { employeeEmail, employeePassword } = req.body;
        const { employee, token } = await authService.loginEmployee(employeeEmail, employeePassword);
        res.json({ employee, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { employeeEmail } = req; // Assuming you're using some authentication middleware
        const updates = req.body;
        if (req.file) {
            updates.employeeAvatar = req.file.path;
        }
        const employee = await Employee.findOneAndUpdate({ employeeEmail }, updates, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllEmps = async (req, res) => {
    try {
        const employees = await authService.getAllEmps();
        res.status(200).json( employees );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { register, login, updateEmployee, upload,getAllEmps };