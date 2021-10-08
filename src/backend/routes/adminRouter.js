const router = require('express').Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');

// Get list of users
router.get('/users', passport.authenticate('jwt', { session: false }), adminController.adminGetAllUsers);

// Delete user
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), adminController.adminDeleteUser);

// Get deals flagged for deletion
router.get('/deals/flagged', passport.authenticate('jwt', { session: false }), adminController.adminGetAllFlaggedDeals);

// Delete deal flagged for deletion
router.delete('/deals/:id', passport.authenticate('jwt', { session: false }), adminController.adminDeleteDeal);

// Create new user
router.post('/users', passport.authenticate('jwt', { session: false }), adminController.adminCreateUser);

// Update existing user account details
router.put('/users/:id', passport.authenticate('jwt', { session: false }), adminController.adminUpdateUser);

module.exports = router;
