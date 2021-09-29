const mongoose = require('mongoose');
const utils = require('../lib/utils');
const User = require('../models/user');

// Function to add a new User into the DB
const userRegisterHandler = (req, res) => {
  User.find({ userEmail: req.body.userEmail })
    .exec()
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.length >= 1) {
        return res.status(422).json({
          success: false,
          msg: 'User already exists',
        });
      }
      const saltHash = utils.genPassword(req.body.password);

      const { salt } = saltHash;
      const { hash } = saltHash;

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        userEmail: req.body.userEmail,
        userFirstName: req.body.firstName,
        userLastName: req.body.lastName,
        hash,
        salt,
      });

      try {
        newUser.save()
          .then(() => {
            const jwt = utils.issueJWT(user);
            res.json({
              success: true,
              user: user.userEmail,
              token: jwt.token,
              expiresIn: jwt.expires,
            });
          });
      } catch (err) {
        res.json({ success: false, msg: err });
      }
    });
};

// Function to log in the user
const userLoginHandler = (req, res, next) => {
  User.findOne({ userEmail: req.body.userEmail })
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(401).json({ success: false, msg: 'could not find user' });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          user: user.userEmail,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({ success: false, msg: 'you entered the wrong password' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.userRegisterHandler = userRegisterHandler;
module.exports.userLoginHandler = userLoginHandler;
