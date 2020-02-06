var express = require('express');
var router = express.Router();
var ssn;

/* GET settings page. */
router.get('/', function(req, res, next) {
  res.render('setup', { title: 'Settings'});
});

module.exports = router;