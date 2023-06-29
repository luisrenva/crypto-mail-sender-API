module.exports = {
  getTime: (optionalString, date) => {
    return optionalString + date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
  }
}

