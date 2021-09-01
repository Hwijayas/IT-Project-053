const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are successfully authenticated to this route!' });
});

// Validate an existing user and issue a JWT
router.post('/login', userController.userLoginHandler);

// Register a new user
router.post('/register', userController.userRegisterHandler);

// Create a new deal
router.post('/createDeal', userController.userCreateDeal);

// Update an existing deal
router.post('/updateDeal', userController.userUpdateDeal);

// Delete an existing deal
router.post('/deleteDeal', userController.userDeleteDeal);

module.exports = router;
