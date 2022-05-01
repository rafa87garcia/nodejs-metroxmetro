// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || 'mongodb+srv://admin:admin@upgrade-nov-2021.kuhpa.mongodb.net/metroxmetro?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'secreto-para-desarrollo',
};

module.exports = config;
