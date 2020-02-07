var express = require('express');
var router = express.Router();
var ssn;

/* GET login page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  res.render('login', { title: 'Login', err: ssn.err});
});

/* POST*/

router.post('/', function(req, res, next) {
  ssn = req.session;
  var semail = req.body.useremail;
  var spass = req.body.userpass;

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://gloomya:123Qazxc@clusternode-cc2bt.azure.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db ("famous");
      dbo.collection("users").findOne({email: semail, password: spass},function(err, data) {
            if (err) throw err;
            if (data != null) {
            ssn.email = data.email;
            ssn.username = data.username;
            ssn.avatar = data.avatar;
            ssn.projects = data.activity.projects;
            ssn.fbprofile = data.activity.fbprofile;
            ssn.fbfollowers = data.activity.fbfollowers;
            ssn.fblikes = data.activity.fblikes;
            ssn.instaprofile = data.activity.instaprofile;
            ssn.instafollowers = data.activity.instafollowers;
            ssn.instalikes = data.activity.instalikes;
            console.log("Projects: " + data.activity.projects);
            console.log("FB: " + data.activity.fbprofile);
            res.redirect('profile');              
            }
            else {
              ssn.err = "Email or password was incorrect or something weird happened..who knows";
              res.render('login', {err: ssn.err});
            }
            db.close();
      });
  });
});

module.exports = router;