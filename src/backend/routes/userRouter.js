const router = require('express').Router();
const passport = require('passport');
const utils = require('../lib/utils');
const mongoose = require("mongoose")
const User = require('../models/user');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', function(req, res, next){

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
});

// Register a new user
router.post('/register', function(req, res, next){
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

});

module.exports = router;