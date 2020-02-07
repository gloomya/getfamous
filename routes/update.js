var express = require('express');
var router = express.Router();
var ssn;

/* POST changes. */
router.post('/', function(req, res, next) {
    ssn = req.session;
    var newname = req.body.username;
    var newemail = req.body.useremail;
    var newpass = req.body.userpass;

      
    // The name of the input field avatar
    // var useravatar = req.files.avatar;
    // var datetime = new Date();
    // var filename ='images/users/'+ ssn.username + datetime.toISOString().slice(0,10) + '.jpg';
    // ssn.avatar = filename;
    // Use the mv() method to place the file somewhere on your server
    // useravatar.mv(filename, function(err) {
    //     if (err)
    //     return res.status(500).send(err);

    //     console.log('File uploaded! Here: '+ filename);

    // });

  
    // bcrypt.hash(ssn.pass, 10, function(err, hash) {
    //   // Store hash in database
    // });
  
    
    var url = "mongodb+srv://gloomya:123Qazxc@clusternode-cc2bt.azure.mongodb.net/test?retryWrites=true&w=majority";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("firsty");
        var myquery = { email: ssn.email };
        var newvalues = { $set: { username: ssn.username, email: newemail, password: ssn.pass, avatar: ssn.avatar } };
        dbo.collection("users").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("document updated");
            db.close();
        });
    });
    ssn.email = newemail;

  res.redirect('profile',  {title: 'Profile', username: ssn.username, email: ssn.email, password: ssn.pass, avatar: ssn.avatar, projects: ssn.projects, fbprofile: ssn.fbprofile, fbfollowers: ssn.fbfollowers, fblikes: ssn.fblikes, instaprofile: ssn.instaprofile, instafollowers: ssn.instafollowers, instalikes: ssn.instalikes });
});

module.exports = router;

// $_SESSION["photo"] = "./images/" . basename($_FILES["myFile"]["name"]);
// 	copy($_FILES["myFile"]["tmp_name"], $_SESSION["photo"]);