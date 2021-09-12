const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const dealController = require('../controllers/dealController');
const customerController = require('../controllers/customerController');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are successfully authenticated to this route!' });
  console.log(req.user);
});

// Validate an existing user and issue a JWT
router.post('/login', userController.userLoginHandler);

// Register a new user
router.post('/register', userController.userRegisterHandler);

// Create a new deal
router.post('/deal', passport.authenticate('jwt', { session: false }), dealController.userCreateDeal);

// Update an existing deal
router.put('/deal/:id', passport.authenticate('jwt', { session: false }), dealController.userUpdateDeal);

// Delete an existing deal
router.delete('/deal/:id', passport.authenticate('jwt', { session: false }), dealController.userDeleteDeal);

// Update status of deal
router.put('/deal/:id/status', passport.authenticate('jwt', { session: false }), dealController.updateDealStatus);

// Register the customer
router.post('/customer', passport.authenticate('jwt', { session: false }), customerController.userAddsCustomer);

module.exports = router;
