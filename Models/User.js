const { Schema, model } = require('mongoose');


const userSchema = Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String },
    role: { type: String, require: true, enum: ['admin', 'editor', 'authenticate'], default: 'authenticate' }
}, {
    timestamps: true,
}
);

module.exports = model('User', userSchema);

