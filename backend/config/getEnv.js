module.exports = require('dotenv').config({
    path : process.argv[2] === 'testing' ? './.env/.env.testing' : './.env/.env.production'
});