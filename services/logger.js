const red   = (message) => { console.log(`\x1b[31m${message} \x1b[0m`); }
const white = (message) => { console.log(`\x1b[1m${message} \x1b[0m`); }
const green = (message) => { console.log(`\x1b[32m${message} \x1b[0m`); }

module.exports = { red, white, green}