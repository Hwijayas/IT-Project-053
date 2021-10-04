const mongoose = require('mongoose');
const deal = require('../models/deal');
const User = require('../models/user');
const utils = require('../lib/utils');

const NOT_ADMIN = 'Unauthorized, Access to Admin only';

// Function to register admin
const adminRegisterHandler = (req, res) => {
  User.find({ userEmail: req.body.userEmail })
    .exec()
  // eslint-disable-next-line consistent-return
    .then((admin) => {
      if (admin.length >= 1) {
        return res.status(422).json({
          message: 'Admin already exists',
        });
      }
      const saltHash = utils.genPassword(req.body.password);

      const { salt } = saltHash;
      const { hash } = saltHash;

      const newAdmin = new User({
        _id: new mongoose.Types.ObjectId(),
        userEmail: req.body.userEmail,
        userFirstName: req.body.firstName,
        userLastName: req.body.lastName,
        hash,
        salt,
      });
      try {
        newAdmin.save()
          .then(() => {
            const jwt = utils.issueJWT(admin, true);
            res.json({
              success: true,
              userEmail: newAdmin.adminEmail,
              firstName: newAdmin.adminFirstName,
              lastName: newAdmin.adminLastName,
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
const adminGetAllUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  const users = await User.find({});
  const userMap = {};
  users.forEach((user) => {
    userMap[user._id] = user;
  });
  return res.send(userMap);
};

// Function to delete user
const adminDeleteUser = (req, res) => {
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

// Function to get all deals that are flagged for deletion
const adminGetAllFlaggedDeals = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  deal.find({ delStatus: true }, (err, deals) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else {
      res.send(deals);
    }
  });
};

const adminDeleteDeal = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

  const dealId = req.params.id;
  deal.findOneAndDelete({ _id: dealId, delStatus: true }, (err, dealFound) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (dealFound != null) {
      res.status(200).json({ success: true, msg: 'Deal deleted!' });
    } else {
      res.status(404).json({ success: false, msg: 'Deal not found!' });
    }
  });
};

// Function to create a user account
const adminCreateUser = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      message: NOT_ADMIN,
    });
  }

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

// Function to update user account
const adminUpdateUser = (req, res) => {
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

      User.findOneAndUpdate({ _id: req.params.id }, { userEmail: newEmail, userFirstName: newFirstName, userLastName: newLastName }, 
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

module.exports.adminGetAllUsers = adminGetAllUsers;
module.exports.adminDeleteUser = adminDeleteUser;
module.exports.adminGetAllFlaggedDeals = adminGetAllFlaggedDeals;
module.exports.adminDeleteDeal = adminDeleteDeal;
module.exports.adminCreateUser = adminCreateUser;
module.exports.adminUpdateUser = adminUpdateUser;
module.exports.adminRegisterHandler = adminRegisterHandler;
