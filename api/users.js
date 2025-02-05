var express = require('express')
const constants = require('./constants')
const cryptoService = require('./crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

router.get('/getMinMaxValues', (req, res) => {
  console.log(JSON.stringify(constants, null, 4))
  return res.send(constants)
})

router.get('/healthy', (req, res) => {
  console.log('[crypto-sender] Healthy')
  return res.send('Healthy')
})

router.put('/updateParametes/:crypto', (req, res) => {
  const { crypto } = req.params
  console.log('Crypto:  '+crypto)
  const { min, max, email } = req.body
  console.log('min:  '+min)
  console.log('max:  '+max)
  console.log('email:  '+email)
  // here I call the crypto and pass the new min and max for updating parameters
  if (crypto === 'btc') { 
    constants.maxBTC = max
    constants.minBTC = min
  }
  if (crypto === 'etc') {
    constants.maxETC = max
    constants.minETC = min
  }
  if (crypto === 'doge') {
    constants.maxDOGE = max
    constants.minDOGE = min
  }
  if (crypto === 'bsv') {
    constants.maxBSV = max
    constants.minBSV = min
  }
  if (crypto === 'ltc') {
    constants.maxLTC = max
    constants.minLTC = min
  }
  if (crypto === 'Bitcoin-Cash') {
    constants.maxBitCoinCash = max
    constants.minBitCoinCash = min
  }

  if (crypto === 'decentraland') { //Mana
    constants.maxMana = max
    constants.minMana = min
  }

  if (crypto === 'xrp') {
    constants.maxXRP = max
    constants.minXRP = min
  }

  if (crypto === 'shib') {
    constants.maxShib = max
    constants.minShib = min
  }


  return res.send('********** DATA UPDATED **********')
})

// TODO: now create a method to get constant crypto values

router.post('/register', async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required")
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
    user.token = token

    // return new user
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
  // Our register logic ends here
})


// Login
router.post('/login', (req, res) => {
  // our login logic goes here
})

module.exports = router;