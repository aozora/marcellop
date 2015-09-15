'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');


//// setup csrf middleware
//function csrf(req, res, next) {
//   var token = req.csrfToken();
//
//   res.header('x-xsrf-token', token);
//   res.locals.token = token;
//   next();
//}

/**
 * Index
 */
router.get('/', /*csrf,*/ function(req, res) {
  res.render('index');
});


/**
 * Contact
 */
router.use('/contact', /*csrf,*/ function(req, res) {

   var mailOpts, smtpTrans;

   //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
   var mailConfig = config().mail.options;
   var service = mailConfig.service;
   var user = mailConfig.auth.user;
   var pass = mailConfig.auth.pass;

   smtpTrans = nodemailer.createTransport('SMTP', {
      service: service,
      auth: {
         user: user,
         pass: pass
      }
   });

   //Mail options
   mailOpts = {
      from: req.body.email,
      to: 'marcello.palmitessa@gmail.com',
      subject: '[Contact Me]',
      text: req.body.message,
      headers: {
         'X-SMTPAPI': {
            "to": [
               "marcello.palmitessa@gmail.com"
            ]
         }
      }
   };

   smtpTrans.sendMail(mailOpts, function (error, responseStatus) {
      //Email not sent
      if (error) {
//         console.dir(mailOpts);
//         console.dir(error);

         res.json(500, {
            success: false
         });
      }
      //Yay!! Email sent
      else {
//         console.log(responseStatus.message); // response from the server
//         console.log(responseStatus.messageId); // Message-ID value used

         res.json(200, {
            success: true
         });
      }
   });

   //res.render('index');
});

module.exports = router;
