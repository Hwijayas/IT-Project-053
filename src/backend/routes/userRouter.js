const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/userController.js');

userRouter.post('/addUser', userController.addUser);

module.exports = userRouter;