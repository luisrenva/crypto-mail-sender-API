const nodemailer = require('nodemailer')
// const constants = require('../api/constants')

exports.sendEmail = (price, cryptoName) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    service: 'outlook',
    secureConnection: false,
    tls: {
        ciphers: 'SSLv3'                            // tls version
    },
    port: 587,
    maxConnections: 3,
    pool: true, 
    auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PWD
    }
  });

  var mailOptions = {
    from: process.env.HOTMAIL_USER,
    to: process.env.EMAILS,
    // to: 'luis.renva@gmail.com',
    subject: 'Changes in ' + cryptoName + '!!!!!!',
    // subject: 'test',
    text: 'Current ' + cryptoName + ' price::::: ' + price
    // text: 'test'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error ? error : 'Email sent: ' + info.response)
  });
};