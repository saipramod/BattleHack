var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var braintree = require("braintree");
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/gallery', function(req, res) {
  res.render('gallery');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/home', function(req, res) {
  res.render('index');
});

router.get('/upload', function(req, res) {
  res.render('upload');
});

router.post('/addToDB', function(req, res) {
  console.log("I am inside db");

  var name = req.body.name;
  var email = req.body.email;
  var school = req.body.school;
  var grade = req.body.grade;
  var image = req.body.image;
  console.log("name is " + name);
  console.log("email is " + email);
  console.log("schoolname is " + school);
  console.log("type is " + grade);
  //console.log("image is " + image);

  var galleryEntry = {name : name,email : email ,school : school,grade:grade, image:image};
  //var galleryEntry = {name : name,email : email ,school : school,grade:grade};

  database.galleryEntries.insert(galleryEntry, function(err,datum) {

    if (err)
      console.log(err);
      if (datum) 
        res.send("allgood");      
      else
        res.send("duplicate");
  });

});

router.get('/retrieveAllFromDB', function(req, res) {
  console.log("route called");
  //return true;
  //var chunk;
  database.galleryEntries.find({}).sort({time : -1}).skip(0).exec(function(err, datum) {  
    console.log("trying to fetch" , datum);
    if (datum && datum[0] ) { 
      console.log("returning data chunk");
      //chunk = datum;
      res.send(datum);
      //return datum;
    };
  });
  
});
var gateway = braintree.connect({
  	environment: braintree.Environment.Sandbox,
  	merchantId: "<id>",
  	publicKey: "<id>",
  	privateKey: "<your key here>"
});

router.get('/MakePayment', function (req, res) {
  res.render("braintree.html");
});

router.post('/create_transaction', function (req, res) { 
	console.log("We are inside");
  console.log(req);
	var saleRequest = {
    amount: "1",
    creditCard: {
      number: req.body.number,
      cvv: req.body.cvv,
      expirationMonth: req.body.month,
      expirationYear: req.body.year
    },
    options: {
      submitForSettlement: true
    }
};
  
  gateway.transaction.sale(saleRequest, function (err, result) {
    console.log("I am in");
    if (result.success) {
      res.send(result.transaction.id);
    } else {
      res.send("1234");
    }
  });
});


router.post('/sendmail', function(req, res) {

smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    /*auth: {
        user: "info@yolobe.com",
        pass: "yolobe42"
    }*/
    auth: {
        user: "<your mail id here>",
        pass: "<your password here>"
    }
});

	fromwho  = req.body['name']   || 'none';
	email  = req.body['email'] || 'none';
	header = '<' + "a@b.com" +'>';
    console.log(req.body);

	var mailOptions = {
                from: header,
                //to: "info@yolobe.com",
                to: email,
                subject: "ThankYou for you payment",
                text: req.body['message']
            };
            smtpTransport.sendMail(mailOptions, function(err, response) {
                if (err) {
                    console.log(JSON.stringify(err));
                    //emailMsg.errorMsg = JSON.stringify(err);
                    //logger.error("error sending email: " + util.format(emailMsg));
                } else {
                    console.log("message sent");
                    //emailMsg.sent = true;
                    //logger.info("message sent: " + util.format(emailMsg));
                }
                
            });
	return true;
});

module.exports = router;
