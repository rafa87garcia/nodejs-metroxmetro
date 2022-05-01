const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../Models/User');

const isAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization;
  const user = req.user;
  console.log(user);
  if (!authorization) {
    return res.status(401).json("No está autorizado");
  }

  // Separar Bearer y token
  const separados = authorization.split(' ') // se separan por un espacio
  if (separados.length !== 2 || separados[0] !== 'Bearer') {
    return res.status(400).json('Cabecera de auth mal formada');
  }

  // Obtenemos el token que hemos separado de la cabecera
  const [, token] = separados;
  // const token = separados[1];

  try {
    const tokenInfo = jwt.verify(token, config.JWT_SECRET);

    req.user = {
      id: tokenInfo.uid,
      name: tokenInfo.name,
      email: tokenInfo.email,
      role: tokenInfo.role,
    };
    
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(403).json(error);
  }
};

module.exports = {
  isAuthenticated,
};