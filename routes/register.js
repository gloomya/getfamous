var express = require('express');
var router = express.Router();
var ssn;

/* GET register page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  res.render('register', { title: 'Sign Up GETFAMOUS', err: ssn.regerr });
});

module.exports = router;