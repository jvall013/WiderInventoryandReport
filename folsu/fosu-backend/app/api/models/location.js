const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var mongoosePaginate = require('mongoose-paginate');

//Define a schema
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
 address: {
  type: String,
  trim: true,  
  required: true,
 },
 state: {
    type: String,
    trim: true,  
    required: true,
   },
 zip: {
  type: String,
  trim: true,
  required: true,
 },

});

LocationSchema.plugin(mongoosePaginate);



LocationSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.role;
    return obj;
}

module.exports = mongoose.model('Location', LocationSchema);