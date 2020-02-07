var express = require('express');
// var bcrypt = require('bcrypt');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ssn;
var uemail, upass, uname, exemail, exname;

/* POST profile page. */
router.post('/', function(req, res, next) {
  ssn = req.session;
  uname = req.body.username;
  uemail = req.body.useremail;
  upass = req.body.userpass;
  ssn.avatar = 'images/users/avatar.svg';
  ssn.projects = 0;
  ssn.fbprofile = 'unknown';
  ssn.fbfollowers = 0;
  ssn.fblikes = 0;
  ssn.instaprofile = 'unknown';
  ssn.instafollowers = 0;
  ssn.instalikes = 0;

  // bcrypt.hash(ssn.pass, 10, function(err, hash) {
  //   // Store hash in database
  // });

  
  var url = "mongodb+srv://gloomya:123Qazxc@clusternode-cc2bt.azure.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db ("famous");

      dbo.collection("users").findOne({         
        $or: [{
              email: uemail
              }, {
              username: uname
          }]}, function(err, data) {
              if (err) throw err;
              if(!data) {
                    ssn.username = uname;
                    ssn.email = uemail;
                    ssn.pass = upass;
                    var myobj = { username: ssn.username, email: ssn.email, password: ssn.pass, avatar: ssn.avatar, activity: {projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes } };
                    dbo.collection("users").insertOne(myobj, function (error, res) {
                        if (error) throw error;
                        console.log("document inserted");
                        db.close();
                    });
                    res.render('profile', {title: 'Profile', username: ssn.username, email: ssn.email, password: ssn.pass, avatar: ssn.avatar, projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes });

                } else {
                  ssn.regerr = "Username or Email is already taken, please sign in with different one.";
                  res.redirect('register'); 
                }

  
      
      });
  });
});


/* GET profile page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  if(ssn.email) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://gloomya:123Qazxc@clusternode-cc2bt.azure.mongodb.net/test?retryWrites=true&w=majority";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db ("famous");
        dbo.collection("users").findOne({email: ssn.email },function(err, data) {
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
                  console.log("FB Likes: " + data.activity.fblikes);
                  res.render('profile', {title: 'Profile', username: ssn.username, email: ssn.email, password: ssn.pass, avatar: ssn.avatar, projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes });
           
              }
              else {
                ssn.ordererr = "Something weird happened..who knows";
                res.render('profile', {ordererr: ssn.ordererr});
              }
              db.close();
        });
    });
  } else 
  {
    ssn.err = "Please login first";
    res.redirect('login');
  }
});

module.exports = router;