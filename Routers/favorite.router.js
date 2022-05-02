const express = require('express');
const Favorite = require('../Models/Favorite');

const favoriteRouter = express.Router();

favoriteRouter.get('/', (req, res, next) => {

  return Favorite.find().
  then(favorite => {
    return res.status(200).json(favorite);
  })
  .catch(err => {
    const error = new Error(err);
    error.status(500);
    return error;
  });
});

module.exports = favoriteRouter;