const axios = require('axios')
const email = require('../email/send-email')

let dailyMail = 0

module.exports = {
  getBitCoin: () => {
    if (dailyMail === 11) {
      console.log('************** DailyMail :: ' + dailyMail + '**************')
      dailyMail = 0
    }
    console.log('**********************')
    console.log(dailyMail)
    console.log('**********************')
    dailyMail ++
    apiCall('btc', 40000, 66000)
  },
  getEtherumClassic: () => {
    apiCall('etc', 40, 77)
  },
  getDodgeCoin: () => {
    apiCall('doge', 0.10, 0.50)
  },
  getBSV: () => {
    apiCall('bsv', 113, 313)
  },
  getLTC: () => {
    apiCall('ltc', 120, 370)
  },
  getShib: () => {
    apiCall('shib', 0.000010, 0.10)
  },
  getBitCoinCash: () => {
    apiCall('bch', 480, 1300)
  },
  getXRP: () => {
    apiCall('xrp', 0.25, 1.80)
  },
  getMana: () => {
    apiCall('mana', 0.10, 1.63 )
  },
  // testEmail: () => {
  //   email.sendEmail('1', 'testing emails sender')
  // },
};

const apiCall = (cryptoName, min, max) => {
  console.log('************ Calling ' + cryptoName + '************');
  axios.get('https://data.messari.io/api/v1/assets/' + cryptoName + '/metrics')
    .then((response) => {
      if (response.data.data.market_data.price_usd >= max || response.data.data.market_data.price_usd <= min) {
        console.log('*************** Sending email to::: '+cryptoName)
        email.sendEmail(parseFloat(response.data.data.market_data.price_usd), response.data.data.symbol)
      }
    }).catch((error) => {
      console.log('****** Error calling API ::::::' + error)
    })
}