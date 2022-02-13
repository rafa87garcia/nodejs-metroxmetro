const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const landSchema = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    yearBuild: { type: Number, require: true }
}, {
    timestamps: true,
}
);

const Land = mongoose.model('Land', landSchema);

module.exports = Land;
