const axios = require('axios')
const email = require('../email/send-email')
const fs = require('fs')

let text = ''
let index = 0
module.exports = {
  getBitCoin: () => {
    apiCall('btc', 40000, 69000)
  },
  getEtherumClassic: () => {
    apiCall('etc', 30, 77)
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
    apiCall('bch', 420, 1300)
  },
  getXRP: () => {
    apiCall('xrp', 0.25, 1.80)
  },
  getMana: () => {
    apiCall('mana', 0.10, 5.50)
  },
  createJson: (emails) => {
    //append data to a file. If the file does not exist, it's created
    fs.appendFile('emails.json', emails, (err) => {
      if (err) throw err;
      console.log('Saved!!!!!');
    });
  }
};

const apiCall = async (cryptoName, min, max) => {
  await axios.get('https://data.messari.io/api/v1/assets/' + cryptoName + '/metrics')
    .then((response) => {
      // console.log('******** Crypto name and price:: ' + cryptoName + '  ' + parseFloat(response.data.data.market_data.price_usd).toFixed(5))
      index++
      if (response.data.data.market_data.price_usd !== null && (response.data.data.market_data.price_usd >= max ||
        response.data.data.market_data.price_usd <= min)) {
        console.log('*************** Sending email to::: ' + response.data.data.name)
        text = text + `Current ` + response.data.data.name + ` price::::: ` +
          parseFloat(response.data.data.market_data.price_usd).toFixed(5) + `<br>`
      }
    }).catch((error) => {
      console.log('****** Error calling API ::::::' + error)
    })
  // console.log('Index :: '+index)
  if (index === 9 && text !== '') {
    email.sendEmail(text)
    index = 0
    text = ''
  }
}