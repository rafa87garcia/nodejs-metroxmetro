const express = require('express');
const app = express();
const config = require('./config');

// Control de errores
app.use((err, _req, res, _next) => {
  return res
      .status(err.status || 500)
      .json(err.message || 'Error inesperado en el servidor');

});

app.listen(config.PORT, () => {
  console.log("Node server listening on port 3000");
});