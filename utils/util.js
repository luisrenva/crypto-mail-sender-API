module.exports = {
  getTime: (optionalString, date) => {
    var options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    return optionalString + date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleString('en-US', options)
  }
}