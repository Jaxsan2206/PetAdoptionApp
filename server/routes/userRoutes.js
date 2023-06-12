const express = require("express"); 
const router = express.Router(); 
const userRoutes = require('../controllers/userController'); 

router.post('/login', userRoutes.login); 
router.post('/register', userRoutes.register); 
router.delete('/', userRoutes.deleteUser); 

module.exports = router; 