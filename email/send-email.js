const nodemailer = require('nodemailer')
const constants = require('../api/constants');

// let emails = 'ngvv14@gmail.com, luis.renva@gmail.com, diego.s.ibarra@gmail.com, aguilavajz@gmail.com'
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
    to: constants.emails,
    subject: 'Changes in ' + cryptoName + '!!!!!!',
    text: 'Current ' + cryptoName + ' price::::: ' + price
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error ? error : 'Email sent: ' + info.response)
  });
};