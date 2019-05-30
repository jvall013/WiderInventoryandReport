var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, trim: true, required: true },
    deptartmentId: { type: String, required: true},
    fname: { type: String, required: true},
    lname: { type: String, required: true}
});

// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);