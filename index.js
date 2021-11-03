const cron = require('node-cron')
const express = require('express')
const crypto = require('./api/crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./api/users')

const app = express()
app.use(cors())
let count = 0

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('------------- Running: ' + count++ + '------------- ')
})
// Schedule tasks to be run on the server.
cron.schedule('0 0 */2 * * * *', () => {
  console.log('********** 2 hours call  **********')
  crypto.getBitCoin()
  crypto.getEtherumClassic()
  crypto.getDodgeCoin()
  crypto.getBSV()
  crypto.getLTC()
  crypto.getShib()
  crypto.getBitCoinCash()
  crypto.getXRP()
  crypto.getMana()
  // crypto.testEmail()
})


const port = process.env.PORT || 3000
// starting the server
app.listen(port, () => {
  console.log('*********************************')
  console.log(`listening on port ${port}`)
  console.log('*********************************')
});
