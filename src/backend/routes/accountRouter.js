const router = require('express').Router();
const passport = require('passport');
const accountController = require('../controllers/accountsController');
const userController = require('../controllers/userController');

// Validate an existing user and issue a JWT
router.post('/login', accountController.loginHandler);

// Register a new user
router.post('/register', userController.userRegisterHandler);

// update password
router.put('/password', passport.authenticate('jwt', { session: false }), accountController.updatePasswordHandler);

// protected Routes:
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      email: req.user.userEmail,
      firstName: req.user.userFirstName,
      lastName: req.user.userLastName,
      isAdmin: req.user.isAdmin,
    },
  });
});

module.exports = router;
