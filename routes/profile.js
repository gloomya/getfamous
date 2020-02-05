var express = require('express');
var router = express.Router();
var ssn;

/* POST profile page. */
router.post('/', function(req, res, next) {
  ssn = req.session;
  ssn.username = req.body.username;
  ssn.email = req.body.useremail;
  ssn.pass = req.body.userpass;
  ssn.projects = 0;
  ssn.fbprofile = 'unknown';
  ssn.fbfollowers = 0;
  ssn.fblikes = 0;
  ssn.instaprofile = 'unknown';
  ssn.instafollowers = 0;
  ssn.instalikes = 0;

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://gloomya:123Qazxc@clusternode-cc2bt.azure.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db ("famous");
      var myobj = { username: ssn.username, email: ssn.email, password: ssn.pass, activity: {projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes } };
      dbo.collection("users").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("document inserted");
          db.close();
      });
  });
  res.render('profile', {title: 'Profile', username: ssn.username, email: ssn.email, password: ssn.pass, projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes });
});


/* GET profile page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

module.exports = router;