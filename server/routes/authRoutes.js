const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), 
  (req,res) => res.redirect(`${process.env.CLIENT_ORIGIN}/?auth=success`)
);
router.get('/failure', (req,res) => res.status(401).send('Authentication failed'));
router.get('/logout', (req,res) => { req.logout(()=>{}); res.redirect(process.env.CLIENT_ORIGIN||'/'); });
router.get('/user', (req,res) => req.isAuthenticated() ? res.json(req.user) : res.status(401).json({ message:'Not logged in' }));

module.exports = router;
