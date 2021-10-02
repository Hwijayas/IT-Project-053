const deal = require('../models/deal');
const User = require('../models/user');

const NOT_ADMIN = 'Unauthorized, Access to Admin only';

// // Function to register admin
// const adminRegisterHandler = (req, res) => {
//   Admin.find({ adminEmail: req.body.adminEmail })
//     .exec()
//   // eslint-disable-next-line consistent-return
//     .then((admin) => {
//       if (admin.length >= 1) {
//         return res.status(422).json({
//           message: 'Admin already exists',
//         });
//       }
//       const saltHash = utils.genPassword(req.body.password);
//
//       const { salt } = saltHash;
//       const { hash } = saltHash;
//
//       const newAdmin = new Admin({
//         _id: new mongoose.Types.ObjectId(),
//         adminEmail: req.body.adminEmail,
//         adminFirstName: req.body.firstName,
//         adminLastName: req.body.lastName,
//         hash,
//         salt,
//       });
//       try {
//         newAdmin.save()
//           .then(() => {
//             const jwt = utils.issueJWT(admin, true);
//             res.json({
//               success: true,
//               userEmail: admin.adminEmail,
//               firstName: admin.adminFirstName,
//               lastName: admin.adminLastName,
//               token: jwt.token,
//               expiresIn: jwt.expires,
//             });
//           });
//       } catch (err) {
//         res.json({ success: false, msg: err });
//       }
//     });
// };

// // Function to log in the admin
// const adminLoginHandler = (req, res, next) => {
//   Admin.findOne({ adminEmail: req.body.adminEmail })
//   // eslint-disable-next-line consistent-return
//     .then((admin) => {
//       if (!admin) {
//         return res.status(401).json({ success: false, msg: 'could not find user' });
//       }
//
//       // Function defined at bottom of app.js
//       const isValid = utils.validPassword(req.body.password, admin.hash, admin.salt);
//
//       if (isValid) {
//         const tokenObject = utils.issueJWT(admin, true);
//
//         res.status(200).json({
//           success: true,
//           adminEmail: admin.adminEmail,
//           token: tokenObject.token,
//           expiresIn: tokenObject.expires,
//         });
//       } else {
//         res.status(401).json({ success: false, msg: 'you entered the wrong password' });
//       }
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

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

// module.exports.adminRegisterHandler = adminRegisterHandler;
// module.exports.adminLoginHandler = adminLoginHandler;
module.exports.adminGetAllUsers = adminGetAllUsers;
module.exports.adminDeleteUser = adminDeleteUser;
module.exports.adminGetAllFlaggedDeals = adminGetAllFlaggedDeals;
module.exports.adminDeleteDeal = adminDeleteDeal;
