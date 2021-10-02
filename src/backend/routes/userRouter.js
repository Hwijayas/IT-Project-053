const router = require('express').Router();
const passport = require('passport');
const dealController = require('../controllers/dealController');
const customerController = require('../controllers/customerController');

// Create a new deal
router.post('/deal', passport.authenticate('jwt', { session: false }), dealController.userCreateDeal);

// Update an existing deal
router.put('/deal/:id', passport.authenticate('jwt', { session: false }), dealController.userUpdateDeal);

// Delete an existing deal
router.delete('/deal/:id', passport.authenticate('jwt', { session: false }), dealController.flagDealDeletion);

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

// // Update status of deal deletion
// router.put('/deal/:id/flag', passport.authenticate('jwt', { session: false }), dealController.flagDealDeletion);

module.exports = router;
