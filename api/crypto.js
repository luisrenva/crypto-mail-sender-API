const axios = require('axios')
const email = require('../email/send-email')
const constants = require('./constants')
const fs = require('fs')
const util = require('../utils/util')

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
  resetCount: async () => {
    index = 0
    text = ''
  }
}

const apiCall = async (cryptoName, min, max) => {
  await axios.get('https://data.messari.io/api/v1/assets/' + cryptoName + '/metrics/market-data')
    .then((res) => {
      const response = res.data.data
      index++
      if (response.market_data.price_usd !== null && (response.market_data.price_usd >= max || response.market_data.price_usd <= min)) {
        console.log(util.createLogStatement('INFO', 'Crypto with email name : ' + response.Asset.name))
        text = text + `Current ` + response.Asset.name + ` price:   ` +
          parseFloat(response.market_data.price_usd).toLocaleString(undefined, { minimumFractionDigits: 5 }) + `<br>`
      }
    }).catch((error) => {
      console.error('*************************************************************************************************************************************************************************************')
      console.error('Error calling API : ' + cryptoName + '     ' +JSON.stringify(error, null, 4))
      console.error('**************************************************************************************************************************************************************************************')
    })

  if (index === 8 && text !== '') {
    console.log(util.createLogStatement('INFO', 'index 9 and text with something'))
    email.sendEmail(text)
  }
}