const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


//Define a schema
const Schema = mongoose.Schema;

const ListMaterialSchema = new Schema({

 materials: [ 
     { 
         material: { type: Schema.Types.ObjectId, ref: 'Material'}, 
         quantity: { type: Number, required: true },
         ScanIn: {
            type: Date,
            trim: true,
        },
        line: {type: Number}
        
     }
 ]

});

ListMaterialSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ListMaterial', ListMaterialSchema);