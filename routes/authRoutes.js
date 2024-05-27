import express from 'express';
import employeeController from '../controllers/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', employeeController.register);
router.get('/all-emps', employeeController.getAllEmps);
router.post('/login', employeeController.login);
router.put('/update', authMiddleware, employeeController.upload.single('employeeAvatar'), employeeController.updateEmployee);



export default router;