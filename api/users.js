var express = require('express')
const constants = require('./constants')
const cryptoService = require('./crypto')
var router = express.Router()

//TODO: create a json file to handle users instead bd for now
router.post('/addUser/:email', (req, res) => {
  constants.emails = constants.emails + req.body.email
  return res.send('*** User added::: ' +constants.emails)
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

module.exports = router;