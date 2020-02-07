var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
// var ssn;
var sendmess;

/* GET contact page. */
router.get('/', function(req, res, next) {
  // ssn = req.session;
  res.render('contact', { title: 'Contact Us GETFAMOUS', senderror: sendmess });
});

/*POST send page */
router.post('/', function(req, res, next) {
  // ssn = req.session;
  var name = req.body.name;
  var email = req.body.mail;
  var message = req.body.message;
  //ssn.senderror = 'Here';

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    service: 'gmail',
    auth: {
        user: 'vickykoroleva@gmail.com',
        pass: '123Qazxc'
    }
});
  var mailOptions = {
    from: 'vickykoroleva@gmail.com',
    to: 'gloomya@gmail.com',
    subject: 'Contact form submitted',
    text: name + ' has just submitted a contact form on classproject.\n Please reply to ' + email  + '.\n The message from ' + name + ' looks like this:\n' + message  
  };
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        sendmess = 'An Error occured: ' + error;
        res.render('contact', {senderror: sendmess});
      } 
      else {
        sendmess = 'Thank you! Your message was sent successfully! We will get back to you as soon as possible!';
        res.render('contact', {senderror: sendmess});
      }
  });
  
});

module.exports = router;