const User = require('../models/userModel'); 
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');  
require('dotenv').config(); 

const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const user = await User.findByEmail(email); 
        const isCorrectPass = await bcrypt.compare(password, user.password_set)
        if (!isCorrectPass) throw new Error; 
        const token = jwt.sign(
        {
            userId: user.userid, 
            username: user.username, 
            email: user.email
        }, 
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: '1h'
        })
        res.status(201).json({ 'token': token }); 
    } catch (error) {
        res.status(500).json({'message': 'could not find user'})
    }
}

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body; 
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_LENGTH)); 
        const hashedPass = await bcrypt.hash(password, salt); 
        const createdUser = await User.createUser(email, username, hashedPass)
        res.status(201).json(createdUser)
    } catch (error) {
        res.status(500).json({'message': 'failed to register'})
    }
}

const deleteUser = async (req, res) => {
    try {
        const { email } = req.body; 
        const deletedMsg = await User.deleteUser(email)
        res.status(201).json({ 'message': deletedMsg })
    } catch (error) {
        res.status(500).json({'message': 'failed to delete'})
    }
}

module.exports = { login, register, deleteUser }