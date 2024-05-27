import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    employeeFullName: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    employeeEmail: {
        type: String,
        required: true,
        unique: true
    },
    employeePhoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    employeeAadhar: {
        type: String,
        required: true,
        unique: true
    },
    employeePassword: {
        type: String,
        required: true
    },
    employeeAvatar: {
        type: String, // This will store the path or URL of the uploaded image
    },
    employeeTeamId: {
        type: String,
    },
    employeeTeamName: {
        type: String,
    },
    employeeManagerId: {
        type: String,
    },
    employeeManagerName: {
        type: String,
    },
    employeeRole: {
        type: String,
    },
    
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
