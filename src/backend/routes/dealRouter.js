const router = require('express').Router();
const passport = require('passport');
const dealController = require('../controllers/dealController');

// Create a new deal
router.post('/', passport.authenticate('jwt', { session: false }), dealController.Create);

// Get All deals
router.get('/', passport.authenticate('jwt', { session: false }), dealController.GetAll);

// Update an existing deal
router.put('/:id', passport.authenticate('jwt', { session: false }), dealController.Update);

// Update status of deal
router.put('/:id/status', passport.authenticate('jwt', { session: false }), dealController.UpdateStatus);

// Delete
router.delete('/:id', passport.authenticate('jwt', { session: false }), dealController.Delete);

module.exports = router;
