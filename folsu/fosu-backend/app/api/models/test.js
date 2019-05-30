const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const TestSchema = new Schema({
 name: { 
     type: String,
     required: true
 },
 list: []
});

module.exports = mongoose.model('Test', TestSchema);