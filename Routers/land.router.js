const express = require('express');
const Land = require('../models/Land');

// const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    let filter = {};

    if (req.query.name) {
        filter = { ...filter, name: { $regex: req.query.name } };
    }
    console.log(filter);
    return Land.find(filter)
        .then(land => {
            return res.status(200).json(land);
        })
});

router.get('/:id', (req, res, next) => {
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

router.post('/', (req, res, next) => {
    const newLand = new Movie(req.body);

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


router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
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

module.exports = router;
