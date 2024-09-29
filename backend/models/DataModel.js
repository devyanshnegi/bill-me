const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
   field1: { type: String, required: true },
   field2: { type: Number, required: true }
});

module.exports = mongoose.model('Data', DataSchema);
