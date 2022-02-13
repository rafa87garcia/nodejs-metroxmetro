const express = require('express');
const Land = require('../models/Land');

// const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', (req_, res, next) => {

    return Land.find()
        .then(land => {
            return res.status(200).json(land);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 404;
            next(error);
        })
});

// router.get('/', (req, res) => {
//     console.log("user->user", req.user);
//     let filter = {};

//     if (req.query.nombre) {
//         filter = { ...filter, nombre: { $regex: req.query.nombre } };
//     }
//     console.log(filter);
//     return Movie.find(filter)
//         .then(movie => {
//             return res.status(200).json(movie);
//         })
// });

// router.get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     return Movie.findById(id)
//         .then(movie => {
//             if (!movie) {
//                 const error = new Error('Movie not found');
//                 error.status = 404;
//                 return next(error);
//             }
//             return res.status(200).json(movie);
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.status = 500;
//             return next(error);
//         });
// });

// router.post('/', (req, res, next) => {
//     const newMovie = new Movie(req.body);

//     return newMovie.save()
//         .then(() => {
//             return res.status(201).json("Nueva pelicula");
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.status = 500;
//             return next(error);
//         })
// });


// router.put('/:id', (req, res, next) => {
//     const id = req.params.id;
//     Movie.findOneAndUpdate(id, { $set: req.body }, { new: true })
//         .then((movie) => {
//             return res.status(200).json(movie);
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.status = 500;
//             return next(error);
//         })
// })

// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id;
//     Movie.findByIdAndDelete(id)
//         .then(() => {
//             return res.status(200).json(`Movie deleted ${id}`);
//         })
//         .catch(err => {
//             const error = new Error(err);
//             error.status = 500;
//             return next(error);
//         })
// });

module.exports = router;
