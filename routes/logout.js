var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy(function (err){
      if(err) {
          console.log(err);
      } else{
          res.redirect('login');
      }
  });
});

module.exports = router;