const express = require('express');
const routers = express.Router();
const AuthController = require('../controllers/auth.controller');
const path = require('path');

routers.post('/signup', AuthController.Signup);

routers.post('/signIn', AuthController.SignIn);

routers.get('/signInPage', (req, res, next) => {
    const loginPath = path.resolve(path.join(__dirname, '..', 'views', 'html', 'login.html'));
    res.sendFile(loginPath)
    
    // res.json({msg: 'hello'})
})


module.exports = routers;