const express = require('express');
const roles = require('../middlewares/roles.middleware');
const auth = require('../middlewares/auth.middleware');
const Land = require('../Models/Land');

const landRouter = express.Router();

landRouter.get('/', (req, res, _next) => {
    let filter = {};

    if (req.query.title) {
        filter = { ...filter, name: { $regex: req.query.title } };
    }
    return Land.find(filter)
        .then(land => {
            return res.status(200).json(land);
        })
        .catch((err) => {
            const error = new Error(err);
            error.status(500);
            return error;
        });
});

landRouter.get('/:id', auth.isAuthenticated, (req, res, next) => {
    const id = req.params.id;
    return Land.findById(id)
        .then(land => {
            if (!land) {
                const error = new Error('Land not found');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(land);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

landRouter.post('/', auth.isAuthenticated,(req, res, next) => {
    const newLand = new Land(req.body);

    return newLand.save()
        .then(() => {
            return res.status(201).json("New land");
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        })
});

landRouter.put('/:id', auth.isAuthenticated,(req, res, next) => {
    const id = req.params.id;

    Land.findOneAndUpdate(id, { $set: req.body }, { new: true })
        .then((land) => {
            return res.status(200).json(land);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        })
})

landRouter.delete('/:id', auth.isAuthenticated ,(req, res, next) => {
    const id = req.params.id;
    Land.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Land deleted ${id}`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        })
});

module.exports = landRouter;
