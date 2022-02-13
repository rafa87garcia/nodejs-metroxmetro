const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    Lands: [{ type: mongoose.Types.ObjectId, ref: 'Land', require: true }],
}, {
    timestamps: true,
}
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
