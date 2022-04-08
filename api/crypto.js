const axios = require('axios')
const email = require('../email/send-email')
const constants = require('./constants')
const fs = require('fs')

let text = ''
let index = 0
module.exports = {
  getBitCoin: () => {
    await apiCall('btc', constants.minBTC, constants.maxBTC)
  },
  getEtherumClassic: () => {
    await apiCall('etc', constants.minETC, constants.maxETC)
  },
  getDodgeCoin: () => {
    await apiCall('dogecoin', constants.minDOGE, constants.maxDOGE)
  },
  getBSV: () => {
    await apiCall('bsv', constants.minBSV, constants.maxBSV)
  },
  getLTC: () => {
    await apiCall('litecoin', constants.minLTC, constants.maxLTC)
  },
  getShib: () => {
    await apiCall('shib', constants.minShib, constants.maxShib)
  },
  getBitCoinCash: () => {
    await apiCall('Bitcoin-Cash', constants.minBitCoinCash, constants.maxBitCoinCash)
  },
  getXRP: () => {
    await apiCall('xrp', constants.minXRP, constants.maxXRP)
  },
  getMana: () => {
    await apiCall('decentraland', constants.minMana, constants.maxMana)
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
  await axios.get('https://data.messari.io/api/v1/assets/' + cryptoName + '/metrics/market-data')
    .then((response) => {
      // console.log('******** Crypto name and price:: ' + cryptoName + '  ' + parseFloat(response.data.data.market_data.price_usd).toFixed(5))
      index++
      if (response.data.data.market_data.price_usd !== null && (response.data.data.market_data.price_usd >= max ||
        response.data.data.market_data.price_usd <= min)) {
        console.log('*************** Crypto name ::: ' + response.data.data.name)
        text = text + `Current ` + response.data.data.name + ` price::::: ` +
          parseFloat(response.data.data.market_data.price_usd).toFixed(5) + `<br>`
      }
    }).catch((error) => {
      console.log('****** Error calling API ::::::  ' + cryptoName + '     '+JSON.stringify(error, null, 4))
    })
  if (index === 9 && text !== '') {
    console.log('********** index 9 sending email(s)**********')
    email.sendEmail(text)
    index = 0
    text = ''
  }
}