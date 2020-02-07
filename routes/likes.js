var express = require('express');
var router = express.Router();

/* GET likes page. */
router.get('/', function(req, res, next) {
  res.render('likes', { title: 'Get more Likes GETFAMOUS' });
});

module.exports = router;