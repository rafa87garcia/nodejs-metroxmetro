const { Schema, model, Types } = require('mongoose');

const Property = Schema({
  title: { type: String, require: true },
  description: { type: String, },
  type: { type: String, require: true, enum: ['local', 'comercial'] },
  address: { type: String, require: true },
  lat: { type: Number },
  log: { type: Number },
  number_floor: { type: Number, default: 0 },
  yearBuild: { type: Number, require: true },
  status: { type: String, require: true, enum: ['new'] },
  agent: { type: Types.ObjectId, ref: 'User' }
}, {
  timestamps: true,
}
);

module.exports = model('Property', Property);