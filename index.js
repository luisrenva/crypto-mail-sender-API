const cron = require('node-cron')
const express = require('express')
const crypto = require('./api/crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./api/users')
process.env.ENVIRONMENT = 'PROD'
require('./env')


const app = express()
app.use(cors())


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// *************** REGISTER OUR ROUTES ********************
// all of our routes will be prefixed with /api
app.use('/api', routes)
// Schedule tasks to be run on the server.
cron.schedule('0 0 */4 * * * *', async () => {
  // cron.schedule('0 */1 * * * * *', async () => {
  const date = new Date();
  console.log('Time date:  ' + date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes())
  // crypto.createJson() TODO: create a Json file and read emails from there
  await crypto.getBitCoin()
  await crypto.getEtherumClassic()
  await crypto.getDodgeCoin()
  await crypto.getBSV()
  await crypto.getLTC()
  await crypto.getShib()
  await crypto.getBitCoinCash()
  await crypto.getXRP()
  await crypto.getMana()
})


const port = process.env.PORT || 3000
console.log('*********************************')
console.log('Emails::::  ' +process.env.EMAILS)
console.log('*********************************')
// starting the server
app.listen(port, () => {
  console.log('*********************************')
  console.log(`listening on port ${port}`)
  console.log('*********************************')
});
