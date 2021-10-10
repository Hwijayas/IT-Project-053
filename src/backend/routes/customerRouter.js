const router = require('express').Router();
const passport = require('passport');
const customerController = require('../controllers/customerController');

// Register the customer
router.post('/customers', passport.authenticate('jwt', { session: false }), customerController.Create);

// Update an existing customer
router.put('/customers/:id', passport.authenticate('jwt', { session: false }), customerController.Update);

// Delete an existing deal
router.delete('/customers/:id', passport.authenticate('jwt', { session: false }), customerController.Delete);

module.exports = router;
