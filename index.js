const cron = require('node-cron')
const express = require('express')
const crypto = require('./api/crypto')
const util = require('./utils/util')
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
//* * * * *
//0 */1 * * * * *
const scheduleTime = process.env.ENVIRONMENT === 'PROD' ? '0 0 */4 * * * *' : '*/2 * * * *'
const date = new Date()
console.log(util.getTime('Starting app at: ', date))


cron.schedule(scheduleTime, async () => {
  console.log(util.createLogStatement('INFO', 'Executing crypto calls'))
  // crypto.createJson() TODO: create a Json file and read emails from there
  await crypto.getBitCoin()
  await crypto.getEtherumClassic()
  await crypto.getDodgeCoin()
  // await crypto.getBSV()
  await crypto.getLTC()
  await crypto.getShib()
  await crypto.getBitCoinCash()
  await crypto.getXRP()
  await crypto.getMana()
  await crypto.resetCount()
})


const port = process.env.PORT || 4000
console.log('*********************************************************************************************')
console.log('Emails::::  ' + process.env.EMAILS)
console.log('*********************************************************************************************')
// starting the server
app.listen(port, () => {
  console.log('*********************************')
  console.log(`listening on port ${port}`)
  console.log('*********************************')
})
