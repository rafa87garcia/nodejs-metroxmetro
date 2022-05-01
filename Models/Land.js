const { Schema, model} = require('mongoose');


const landSchema = Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        require: true
    },
    yearBuild: {
        type: Number,
        require: true
    },
}, {
    timestamps: true,
}
);

module.exports = model('Land', landSchema);
