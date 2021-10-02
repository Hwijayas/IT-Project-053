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
              user: {
                email: newUser.userEmail,
                firstName: newUser.userFirstName,
                lastName: newUser.userLastName,
                isAdmin: newUser.isAdmin,
              },
              token: jwt.token,
              expiresIn: jwt.expires,
            });
          });
      } catch (err) {
        res.json({ success: false, msg: err });
      }
    });
};

module.exports.userRegisterHandler = userRegisterHandler;
