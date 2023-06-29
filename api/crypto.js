const axios = require('axios')
const email = require('../email/send-email')
const constants = require('./constants')
const fs = require('fs')

let text = ''
let index = 0
module.exports = {
  getBitCoin: async () => {
    await apiCall('btc', constants.minBTC, constants.maxBTC)
  },
  getEtherumClassic: async () => {
    await apiCall('etc', constants.minETC, constants.maxETC)
  },
  getDodgeCoin: async () => {
    await apiCall('dogecoin', constants.minDOGE, constants.maxDOGE)
  },
  getBSV: async () => {
    await apiCall('bsv', constants.minBSV, constants.maxBSV)
  },
  getLTC: async () => {
    await apiCall('litecoin', constants.minLTC, constants.maxLTC)
  },
  getShib: async () => {
    await apiCall('shib', constants.minShib, constants.maxShib)
  },
  getBitCoinCash: async () => {
    await apiCall('Bitcoin-Cash', constants.minBitCoinCash, constants.maxBitCoinCash)
  },
  getXRP: async () => {
    await apiCall('xrp', constants.minXRP, constants.maxXRP)
  },
  getMana: async () => {
    await apiCall('decentraland', constants.minMana, constants.maxMana)
  },
  createJson: (emails) => {
    //append data to a file. If the file does not exist, it's created
    fs.appendFile('emails.json', emails, (err) => {
      if (err) throw err
      console.log('Saved!!!!!')
    })
  },
  getTime: (optionalString, date) => {
    return optionalString + 'Time date:  ' + date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
  }
}

const apiCall = async (cryptoName, min, max) => {
  await axios.get('https://data.messari.io/api/v1/assets/' + cryptoName + '/metrics/market-data')
    .then((res) => {
      const response = res.data.data
      // console.log('******** Crypto name and price:: ' + cryptoName + '  ' + parseFloat(response.data.data.market_data.price_usd).toFixed(5))
      index++
      if (response.market_data.price_usd !== null && (response.market_data.price_usd >= max || response.market_data.price_usd <= min)) {
        console.log('*************** Crypto with email name ::: ' + response.Asset.name + '****************')
        text = text + `Current ` + response.Asset.name + ` price:   ` +
          parseFloat(response.market_data.price_usd).toLocaleString(undefined, { minimumFractionDigits: 5 }) + `<br>`
      }
    }).catch((error) => {
      console.log('*******************************************************************************************')
      console.log('Error calling API ::::::  ' + cryptoName + '     '+JSON.stringify(error, null, 4))
      console.log('*******************************************************************************************')
    })
  if (index === 9 && text !== '') {
    email.sendEmail(text)
    index = 0
    text = ''
  }
}

