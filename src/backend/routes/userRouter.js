const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const dealController = require('../controllers/dealController');
const customerController = require('../controllers/customerController');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      "email": req.user.userEmail,
      "firstName": req.user.userFirstName,
      "lastName": req.user.userLastName,
    },
  });
});

// Validate an existing user and issue a JWT
router.post('/login', userController.userLoginHandler);

// Register a new user
router.post('/register', userController.userRegisterHandler);

// update password
router.put('/password', passport.authenticate('jwt', { session: false }), userController.userUpdatePasswordHandler);

// Create a new deal
router.post('/deal', passport.authenticate('jwt', { session: false }), dealController.userCreateDeal);

// Update an existing deal
router.put('/deal/:id', passport.authenticate('jwt', { session: false }), dealController.userUpdateDeal);

// Delete an existing deal
router.delete('/deal/:id', passport.authenticate('jwt', { session: false }), dealController.userDeleteDeal);

// View All deals
router.get('/deal', passport.authenticate('jwt', { session: false }), dealController.viewDeals);

// Update status of deal
router.put('/deal/:id/status', passport.authenticate('jwt', { session: false }), dealController.updateDealStatus);

// Register the customer
router.post('/customer', passport.authenticate('jwt', { session: false }), customerController.userAddsCustomer);

// Update an existing customer
router.put('/customer/:id', passport.authenticate('jwt', { session: false }), customerController.userUpdateCustomer);

// Delete an existing deal
router.delete('/customer/:id', passport.authenticate('jwt', { session: false }), customerController.userDeleteCustomer);

// Update status of deal deletion
router.put('/deal/:id/flag', passport.authenticate('jwt', { session: false }), dealController.flagDealDeletion);

module.exports = router;
