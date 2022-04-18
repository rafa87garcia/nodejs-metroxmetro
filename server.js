const config = require('./config');

const express = require('express');
const db = require('./db');

const passport = require('passport');
require('./authentication/passport');

//const auth = require('./middlewares/auth.middleware');

const app = express();

// app.set('jwt-secret', config.JWT_SECRET);

const landRouter = require('./Routers/land.router');
const userRouter = require('./Routers/user.router');

// Enabled body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Añadimos el middleware de passport a express
app.use(passport.initialize());

app.get('/', (_req, res) => res.status(200).send("Server running"));

app.use('/land', landRouter);
app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  const error = new Error('Ruta no encotrada');
  error.status = 404;
  return next(error);
});

// Control de errores
app.use((err, _req, res, _next) => {
  return res
    .status(err.status || 500)
    .json(err.message || 'Error inesperado en el servidor');

});

db.connectDB.then(() => {
  console.log("Conection to database.");
  app.listen(config.PORT, () => {
    console.log("Node server listening on port 3000");
  });

});