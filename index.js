import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import nodemailer from 'nodemailer';


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const db = process.env.MONGO_URI || 'mongodb://localhost:27017/ams';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/', authRoutes);

app.post('/send-mail', async (req, res) => {
    const { subject, text } = req.body;
    // Create a transporter object using the SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        //service: 'gmail', // Use Gmail as the email service provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS // Your email password or app password
        }
    });
    // Email message configuration
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.EMAIL_USER, // Receiver address (you can change this to any other email address)
        subject: subject, // Email subject
        text: text // Email content
    };
    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        // Handle errors
        console.error('Error sending mail:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// const db = process.env.MONGO_URI || 'mongodb://localhost:27017/ams';

// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/', authRoutes);


// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
