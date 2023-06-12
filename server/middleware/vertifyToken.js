const jwt = require('jsonwebtoken');  
require('dotenv').config(); 

const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"]; 
        if (typeof bearerHeader === undefined) throw new Error; 
        const bearerToken = bearerHeader.split(" ")[1]; 
        jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err) throw new Error; 
            res.locals.userId = data.userId; // https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
            next(); 
        }); 
    } catch (error) {
        res.status(403).json({message: 'access denied'})
    }
}; 

module.exports = verifyToken; 