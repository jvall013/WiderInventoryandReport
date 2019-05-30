var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var DefaultActivitySchema = new Schema({
    
    description: {
        type: String,
        trim: true,  
        required: true,
    }

});

module.exports = mongoose.model('DefaultActivity', DefaultActivitySchema);