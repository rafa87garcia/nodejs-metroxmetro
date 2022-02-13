require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  URL_DB: process.env.URL_DB
}

module.exports = config;