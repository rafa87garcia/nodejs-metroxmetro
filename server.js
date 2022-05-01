
const express = require('express');
const passport = require('passport');
require('./authentication/passport')
const config = require('./config');
const landRouter = require('./Routers/land.router');
const userRouter = require('./Routers/user.router');
const favoriteRouter = require('./Routers/favorite.router');
const propertyRouter = require('./Routers/property.router');
const { isAuthenticated } = require('./middlewares/auth.middleware');

const db = require('./db');

const server = express();


// Enabled body
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(passport.initialize());

server.get('/', (_req, res) => {
  res.status(200).send("Server running")
});

server.use('/lands', landRouter);
server.use('/properties', propertyRouter);
server.use('/favorites', favoriteRouter);
server.use('/users', userRouter);

server.use('*', (_req, _res, next) => {
  const error = new Error('Ruta no encotrada');
  error.status = 404;
  return next(error);
});

// Control de errores
server.use((err, _req, res, _next) => {
  return res
    .status(err.status || 500)
    .json(err.message || 'Error inesperado en el servidor');

});

db.connectDB.then(() => {
  console.log("Conection to database.");
  server.listen(config.PORT, () => {
    console.log("Node server listening on port 3000");
  });

});