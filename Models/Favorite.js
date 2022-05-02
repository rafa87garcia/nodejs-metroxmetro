const { Schema, model, Types } = require('mongoose');


const favoriteSchema = Schema({
    user: { type: Types.ObjectId, ref: 'User', require: true },
    property: { type: Types.ObjectId, ref: 'Property', require: true },
}, {
    timestamps: true,
}
);

module.exports = model('Favorite', favoriteSchema);
