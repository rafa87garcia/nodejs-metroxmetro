const express = require('express');
const auth = require('../middlewares/auth.middleware');
const Favorite = require('../Models/Favorite');
const favoriteRouter = express.Router();

favoriteRouter.get('/', (_req, res, next) => {

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

favoriteRouter.post('/:id', auth.isAuthenticated, (req, res, next) => {

  const id = req.params.id;
  const userId = req.user.id;

  const newFavorite = new Favorite({
    user: userId,
    property: id
  });

  return newFavorite.save()
    .then((favorite) => {
      return res.status(201).json(`New favorite ${favorite.id}`);
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    })
});


favoriteRouter.delete('/:id', auth.isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Favorite.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json(`Favorite deleted ${id}`);
    })
    .catch(err => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    })
});

module.exports = favoriteRouter;