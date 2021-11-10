var express = require('express')
const constants = require('./constants')
const cryptoService = require('./crypto')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
var router = express.Router()

//TODO: create a json file to handle users instead bd for now
router.post('/addUser/:email', (req, res) => {
  constants.emails = constants.emails + req.body.email
  return res.send('*** User added::: ' + constants.emails)
})

//TODO: Handle users and save on json file
router.post('/addUserInputs', (req, res) => {
  const { min, max, email } = req.body
  return res.send('Inserted successfully')
})

router.get('/healthy', (req, res) => {
  return res.send('Healthy')
})

router.put('/updateParametes/:crypto', (req, res) => {
  let crypto = req.body.crypto
  const { min, max, email } = req.body
  // here I call the crypto and pass the new min and max for updating parameters
  if (crypto === 'btc') {
    // cryptoService.getBitCoin(crypto, min, max)    
  }

  return 'Data updated'
})

router.post('/register', async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    // const oldUser = await User.findOne({ email });

    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10)

    // Create user in our database
    // const user = await User.create({
    //   firstName,
    //   lastName,
    //   email: email.toLowerCase(), // sanitize: convert email to lowercase
    //   password: encryptedPassword,
    // });

    let user = {
      _id: 'testId',
      token: '',
      password: encryptedPassword
    }
    // Create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email
      },
      'secret',
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user)
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
})


// Login
router.post('/login', (req, res) => {
  // our login logic goes here
});

module.exports = router;