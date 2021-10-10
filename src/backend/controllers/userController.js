const mongoose = require('mongoose');
const utils = require('../lib/utils');
const User = require('../models/user');

const NOT_ADMIN = 'Unauthorized, Access to Admin only';

// Function to add a new User into the DB
const Create = (req, res) => {
  User.find({ userEmail: req.body.userEmail })
    .exec()
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

// Function to get all users
// from https://stackoverflow.com/questions/14103615/mongoose-get-full-list-of-users by user soulcheck
const GetAll = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  const users = await User.find({});
  if (users != null) {
    return res.send(users);
  }
  return res.status(400).json({
    message: 'Error',
  });
};

// Function to update user account
const Update = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (user != null && !user.isAdmin) {
      const { newEmail } = req.body;
      const { newFirstName } = req.body;
      const { newLastName } = req.body;

      User.findOneAndUpdate({ _id: req.params.id },
        { userEmail: newEmail, userFirstName: newFirstName, userLastName: newLastName },
        { new: true }, (error, userFound) => {
          if (error) {
            console.log(error);
          } else {
            res.status(200).json({
              success: true,
              msg: 'user details changed!',
              user: {
                userEmail: userFound.userEmail,
                firstName: userFound.userFirstName,
                lastName: userFound.userLastName,
              },
            });
          }
        });
    } else if (user != null && user.isAdmin) {
      res.status(405).json({ success: false, msg: 'not allowed to update admin details' });
    } else {
      res.status(404).json({ success: false, msg: 'user not found!' });
    }
  });
};

// Function to delete user
const Delete = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  // prevent self delete
  if (req.user._id === req.param.id) {
    return res.status(401).json({
      message: 'DELETING SELF, NOT SAFE',
    });
  }

  const userId = req.params.id;
  User.findOneAndDelete({ _id: userId }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (user != null) {
      res.status(200).json({ success: true, msg: 'User deleted!' });
    } else {
      res.status(404).json({ success: false, msg: 'User not found!' });
    }
  });
};

// Function to log in the user
const Login = (req, res, next) => {
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
          user: {
            email: user.userEmail,
            firstName: user.userFirstName,
            lastName: user.userLastName,
            isAdmin: user.isAdmin,
          },
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

// Function to update password - user
const UpdatePassword = async (req, res, next) => {
  try {
    const isValid = utils.validPassword(req.body.password, req.user.hash, req.user.salt);

    if (!isValid) {
      res.status(401).json({ success: false, msg: 'you entered the wrong old password' });
    } else {
      // get new hash and salt
      const saltHash = utils.genPassword(req.body.newPassword);

      const { salt } = saltHash;
      const { hash } = saltHash;

      const user = await User.findByIdAndUpdate(req.user._id, { hash, salt }, { new: true });

      if (user === null) {
        res.status(400).json({ success: false, msg: 'Error' });
      }

      // new token
      const jwt = utils.issueJWT(user);
      res.status(200).json({
        success: true, msg: 'updated password', token: jwt.token,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.Create = Create;
module.exports.GetAll = GetAll;
module.exports.Update = Update;
module.exports.Delete = Delete;
module.exports.Login = Login;
module.exports.UpdatePassword = UpdatePassword;
