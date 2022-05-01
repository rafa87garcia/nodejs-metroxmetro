const { Schema, model, Types } = require('mongoose');


const favoriteSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        require: true
    },
    land: {
        type: Types.ObjectId,
        ref: 'Land',
        require: true
    },
}, {
    timestamps: true,
}
);

module.exports = model('Favorite', favoriteSchema);
