const router = require('express').Router();
const passport = require('passport');
const customerController = require('../controllers/customerController');

// Register the customer
router.post('/', passport.authenticate('jwt', { session: false }), customerController.Create);

// Get the customer
router.get('/', passport.authenticate('jwt', { session: false }), customerController.GetAll)

// Update an existing customer
router.put('/:id', passport.authenticate('jwt', { session: false }), customerController.Update);

// Delete an existing deal
router.delete('/:id', passport.authenticate('jwt', { session: false }), customerController.Delete);

module.exports = router;
