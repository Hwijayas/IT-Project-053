const mongoose = require("mongoose")
const utils = require('../lib/utils');
const User = require('../models/user');


// Function to add a new User into the DB
const userRegisterHandler = function(req, res) {
    User.find({userEmail: req.body.userEmail})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: "User already exists"
            })
        } else {
            const saltHash = utils.genPassword(req.body.password);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                userEmail: req.body.userEmail,
                userFirstName: req.body.firstName,
                userLastName: req.body.lastName,
                hash: hash,
                salt: salt
            });

            try {

                newUser.save()
                    .then((user) => {

                        const jwt = utils.issueJWT(user)
                        res.json({ success: true, user: user, token: jwt.token, expiresIn:jwt.expires });
                    });

            } catch (err) {

                res.json({ success: false, msg: err });

            }
        }
    })
}

// Function to log in the user
const userLoginHandler =  function(req, res, next){

    User.findOne({ userEmail: req.body.userEmail })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
}


module.exports.userRegisterHandler = userRegisterHandler;
module.exports.userLoginHandler = userLoginHandler;