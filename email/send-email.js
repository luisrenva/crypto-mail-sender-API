const nodemailer = require('nodemailer')
// const constants = require('../api/constants')

exports.sendEmail = (price, cryptoName) => {
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
    // to: constants.emails,
    subject: 'Changes in ' + cryptoName + '!!!!!!',
    text: 'Current ' + cryptoName + ' price::::: ' + price
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error ? error : 'Email sent: ' + info.response)
  });
};