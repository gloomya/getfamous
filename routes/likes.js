var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ssn;
var numlikes, newlikes, newprojects, dblikes, dbprojects;

/* POST profile page. */
router.post('/', function(req, res, next) {
  ssn = req.session;
  numlikes = parseInt(req.body.number);

  console.log(numlikes)

  
      var url = "mongodb+srv://gloomya:123Qazxc@clusternode-cc2bt.azure.mongodb.net/test?retryWrites=true&w=majority";
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("famous");

      //   dbo.collection("users").findOne({ email: ssn.email },function(err, data) {
      //     if (err) throw err;
      //         dbprojects = data.activity.projects;
      //         dblikes = data.activity.fblikes;      
      //         console.log("Projects DB: " + data.activity.projects + "VAR: " + dbprojects);
      //         console.log("FB Likes DB: " + data.activity.fblikes + "VAR: " + dblikes);
      //         console.log("Session projects: " + ssn.projects);
      //         newlikes = parseInt(dblikes) + parseInt(numlikes);
      //         newprojects = parseInt(dbprojects) + 1;

      //         console.log("New FB Likes: " + newlikes);
      //         console.log("New projects: " + newprojects);
      //   });

        ssn.projects++;
        ssn.fblikes = ssn.fblikes + parseInt(numlikes);

        

        var myquery = { email: ssn.email };
        console.log("LIIIIKESSS: " + newlikes);
        console.log("New session FB Likes: " + ssn.fblikes);
        console.log("New Session projects: " + ssn.projects);
        var newvalues = { $set: { activity: {projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes} } };
        dbo.collection("users").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("likes updated");
            db.close();
        });
    });

    setTimeout(function() {
        res.redirect('profile');
    }, 3000);
    
    


  
});

module.exports = router;