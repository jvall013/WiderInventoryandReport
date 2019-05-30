const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const LineSchema = new Schema({
 activity: { 
     type: Schema.Types.ObjectId, ref: 'DefaulActivity',
     required: true
 },
 duration: {
     type: Number,
     required: true
 }
});

module.exports = mongoose.model('Line', LineSchema);