var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//Define a schema
var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
    
    description: {
        type: String,
        trim: true,  
        required: true,
    }

});

MaterialSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Material', MaterialSchema);