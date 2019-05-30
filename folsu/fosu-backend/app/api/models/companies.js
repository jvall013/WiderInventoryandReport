const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//Define a schema
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 }

});

CompanySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', CompanySchema);