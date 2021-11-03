var express = require('express')
const constants = require('./constants')
var router = express.Router()

//TODO: create a json file to handle users instead bd for now
router.post('/addUser/:email', (req, res) => {
  constants.emails = constants.emails + req.body.email
  return res.send('*** User added::: ' +constants.emails)
})

//TODO: Handle users and save on json file
router.post('/addUserInputs', (req, res) => {
  const min = req.body.min
  const max = req.body.max
  const email = req.body.email
  return res.send('Inserted successfully')
})

router.get('/healthy', (req, res) => {
  return res.send('Healthy')
})

module.exports = router;