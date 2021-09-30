const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const readytoworkSchema = new Schema({
  cleaner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cleaner'
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
},
  {
    timestamps: true,
  });

const Readytowork = mongoose.model('Readytowork', readytoworkSchema);

module.exports = Readytowork;