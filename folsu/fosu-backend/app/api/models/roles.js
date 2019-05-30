var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 }

});

module.exports = mongoose.model('Role', RoleSchema);