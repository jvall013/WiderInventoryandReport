const mongoose = require('mongoose');
var location = require('./location.js');
var mongoosePaginate = require('mongoose-paginate');


//Define a schema
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const ProjectSchema = new Schema({
pcode: {
    type: String,
    trim: true,
    required: true,
    unique: true,
},
name: {
    type: String,
    trim: true,
    required: true
},
 client: {
  type: String,
  trim: true,  
  required: true,
 },
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
 floors: {
     type: Number,
     
 },
 expectedBegin: {
    type: Date,
    trim: true,
    required: false,
 },
 installer: { 
     type: Schema.Types.ObjectId, ref: 'Company' 
 },
 materials: {
    type: Schema.Types.ObjectId, ref: 'ListMaterial'
 }

});

ProjectSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Project', ProjectSchema);