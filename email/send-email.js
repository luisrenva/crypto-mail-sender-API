const nodemailer = require('nodemailer')
var nodeoutlook = require('nodejs-nodemailer-outlook')
// const constants = require('../api/constants')

exports.sendEmail = (body) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PWD
    }
  });

  var mailOptions = {
    from: process.env.HOTMAIL_USER,
    to: process.env.EMAILS,
    // to: 'luis.renva@gmail.com, ngvv14@gmail.com',
    subject: 'Change in Crypto(s) !!!!!!',
    html: `Below the crypto(s) that meet the criterias: ` + `<br><br>`+ body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error ? error : 'Email sent: ' + info.response)
  });

  // nodeoutlook.sendEmail({
  //   pool: true,
  //   maxConnections: 8,
  //   maxMessages: 8,
  //   auth: {
  //     user: process.env.HOTMAIL_USER,
  //     pass: process.env.HOTMAIL_PWD
  //   },
  //   from: process.env.HOTMAIL_USER,
  //   to: 'luis.renva@gmail.com',
  //   subject: 'Change in Crypto(s) !!!!!!',
  //   text: body,
  //   onError: (e) => console.log(e),
  //   onSuccess: (i) => console.log('Successfull Delivered:: '+JSON.stringify(i, null, 4))
  // });

};