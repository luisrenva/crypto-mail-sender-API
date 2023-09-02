module.exports = {
  getTime: (optionalString, date) => {
    return optionalString + getDateFormatted(date)
  },

  createLogStatement: (level, message) => {
    const date = new Date()
    return ('[' + 'crypto-mail-sender' + ']' + ' ' + '[' + level + ']' + ' ' + getDateFormatted(date) + '  ' + message)
  }
}


const getDateFormatted = (date) => {
  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }
  return date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleString('en-US', options)
}