const router = require('express').Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ success: true, msg: 'You are successfully authenticated to this route!', user: req.user });
  console.log(req.user);
});

router.post('/login', adminController.adminLoginHandler);

router.post('/register', passport.authenticate('jwt', { session: false }), adminController.adminRegisterHandler);

router.get('/users', passport.authenticate('jwt', { session: false }), adminController.adminGetAllUsers);

router.delete('/users/:id', passport.authenticate('jwt', { session: false }), adminController.adminDeleteUser);

module.exports = router;
