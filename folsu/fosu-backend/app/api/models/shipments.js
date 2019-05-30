const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var location = require('./location.js');
var mongoosePaginate = require('mongoose-paginate');


//Define a schema
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const ShipmentSchema = new Schema({
 projectId: { 
     type: Schema.Types.ObjectId, ref: 'Project',
     required: true
 },
 shipDate: {
    type: Date,
    trim: true,
    required: false,
 },
 deliveryDate: {
    type: Date,
    trim: true,
    required: false,
 },
 packingDate: {
    type: Date,
    trim: true,
    required: false,
 },
 orderNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true
 },
 formerId: {
    type: Schema.Types.ObjectId, ref: 'User'
 },
 officeId: {
    type: Schema.Types.ObjectId, ref: 'User'
 },
 shipmentList: {
    type: Schema.Types.ObjectId, ref: 'ListMaterial'
 },
 packingList: {
    type: Schema.Types.ObjectId, ref: 'ListMaterial'
 }
});

ShipmentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Shipment', ShipmentSchema);