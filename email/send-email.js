const nodemailer = require('nodemailer')
const util = require('../utils/util')

exports.sendEmail = (body) => {
  console.log(util.createLogStatement('INFO', 'Sending email'))
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP 
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PWD
    }
  })

  var mailOptions = {
    from: process.env.HOTMAIL_USER,
    to: process.env.ENVIRONMENT === 'PROD' ? process.env.EMAILS : 'lerv.1984@gmail.com',
    subject: 'Change in Crypto(s) !!!!!!',
    html: `Below the crypto(s) that meet the criterias: ` + `<br><br>`+ body
  }

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error ? 'Error sending emailL '+ error : 'Email sent: ' + info.response)
  })
}