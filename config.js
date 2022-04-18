require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  URL_DB: process.env.URL_DB,
  JWT_SECRET: process.env.JWT_SECRET
}

module.exports = config;