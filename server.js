const express = require('express');
const app = express();
const config = require('./config');


app.listen(config.PORT, () => {
  console.log("Node server listening on port 3000");
});