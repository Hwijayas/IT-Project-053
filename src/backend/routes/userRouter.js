const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// Create new user
router.post('/', userController.Create);

// Get list of users
router.get('/', passport.authenticate('jwt', { session: false }), userController.GetAll);

// Validate an existing user and issue a JWT
router.post('/login', userController.Login);

// Update password
router.put('/password', passport.authenticate('jwt', { session: false }), userController.UpdatePassword);

// Protected Routes:
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

// Update existing user account details
router.put('/:id', passport.authenticate('jwt', { session: false }), userController.Update);

// Delete user
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.Delete);

module.exports = router;
