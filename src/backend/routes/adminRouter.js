const router = require('express').Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are successfully authenticated to this route!', admin: req.admin });
  console.log(req.admin);
});

router.post('/login', adminController.adminLoginHandler);

router.post('/register', passport.authenticate('jwt', { session: false }), adminController.adminRegisterHandler);

router.get('/users', passport.authenticate('jwt', { session: false }), adminController.adminGetAllUsers);

router.delete('/users/:id', passport.authenticate('jwt', { session: false }), adminController.adminDeleteUser);

router.get('/deals/flagged', passport.authenticate('jwt', { session: false }), adminController.adminGetAllFlaggedDeals);

router.delete('/deals/:id', passport.authenticate('jwt', { session: false }), adminController.adminDeleteDeal);

module.exports = router;