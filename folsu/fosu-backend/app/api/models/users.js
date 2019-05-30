const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var mongoosePaginate = require('mongoose-paginate');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 fname: {
  type: String,
  trim: true,  
  required: true,
 },
 lname: {
    type: String,
    trim: true,  
    required: true,
   },
 email: {
  type: String,
  trim: true,
  required: true,
  unique: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 salary: {
    type: Number,
    required: true
 },
role: { type: Schema.Types.ObjectId, ref: 'Role' },
company: { type: Schema.Types.ObjectId, ref: 'Company' },
project: { type: Schema.Types.ObjectId, ref: 'Project' }


});

UserSchema.plugin(mongoosePaginate);

// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


module.exports = mongoose.model('User', UserSchema);