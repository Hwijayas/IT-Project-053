const mongoose = require("mongoose")

// import user model
const User = require('../models/user');

// Function to add a new User into the DB
var addUser = function(req, res) {
    User.find({userEmail: req.body.userEmail})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: "User already exists"
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                userEmail: req.body.userEmail,
                userFirstName: req.body.firstName,
                userLastName: req.body.lastName,
                userPw: req.body.userPw
            })

            user.save()
            .then(result => {
                res.status(201).json({
                    message: "user successfully added"
                })
            })
            .catch(err => {
                console.log(err);
            })
            res.status(201)
        }
    })
}

module.exports.addUser = addUser;