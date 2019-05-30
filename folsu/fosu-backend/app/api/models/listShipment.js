const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


//Define a schema
const Schema = mongoose.Schema;

const ListshipmentSchema = new Schema({

 shipment: { type: Schema.Types.ObjectId, ref: 'Shipment' },
 materials: [ 
     { 
         material: { type: Schema.Types.ObjectId, ref: 'Material'}, 
         quantity: { type: Number, required: true }
     }
 ],
 ScanOut: {
    type: Date,
    trim: true,
    required: true,
 },
 ScanIn: {
    type: Date,
    trim: true,
    required: true,
 }

});

ListShipmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ListShipment', ListShipmentSchema);