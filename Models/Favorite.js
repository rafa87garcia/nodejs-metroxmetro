const { Schema, model } = require('mongoose');


const favoriteSchema = Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    land: {
        type: mongoose.Types.ObjectId,
        ref: 'Land',
        require: true
    },
}, {
    timestamps: true,
}
);

module.exports = model('Favorite', favoriteSchema);
