import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.employeeEmail = decoded.employeeEmail;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
// Middleware to verify JWT token
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token == null) return res.sendStatus(401); // If there is no token

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // If token is not valid
//         req.user = user;
//         next();
//     });
// };
export default authMiddleware;
