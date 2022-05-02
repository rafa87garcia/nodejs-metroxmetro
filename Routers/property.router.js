const express = require('express');
const auth = require('../middlewares/auth.middleware');
const Property = require('../Models/Property');

const propertyRouter = express.Router();

propertyRouter.get('/', (req, res, _next) => {
    let filter = {};

    if (req.query.title) {
        filter = { ...filter, name: { $regex: req.query.title } };
    }
    return Property.find(filter)
        .then(land => {
            return res.status(200).json(land);
        })
        .catch((err) => {
            const error = new Error(err);
            error.status(500);
            return error;
        });
});

propertyRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Property.findById(id)
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

propertyRouter.post('/', auth.isAuthenticated,(req, res, next) => {
    const newProperty = new Property(req.body);

    return newProperty.save()
        .then(() => {
            return res.status(201).json("New land");
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        })
});

propertyRouter.put('/:id', auth.isAuthenticated,(req, res, next) => {
    const id = req.params.id;

    Property.findOneAndUpdate(id, { $set: req.body }, { new: true })
        .then((land) => {
            return res.status(200).json(land);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        })
})

propertyRouter.delete('/:id', auth.isAuthenticated ,(req, res, next) => {
    const id = req.params.id;
    Property.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Land deleted ${id}`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        })
});

module.exports = propertyRouter;
