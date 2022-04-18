const mongoose = require('mongoose');
const config = require('./config');

const connectDB = mongoose.connect(config.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { connectDB }