const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var LineSchema = new Schema({ 
    activity: { 
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

//Define a schema

const TimelinesSchema = new Schema({
 project: { 
     type: Schema.Types.ObjectId, ref: 'Project',
     required: true
 },
 floor: {
    type: Number,
    required: true,
 },
 expectedDate: {
    type: Date,
    trim: true,
    required: false,
 },
 finishDate: {
    type: Date,
    trim: true,
    required: false,
 },
 timeline: [ LineSchema ]
});

module.exports = mongoose.model('Timelines', TimelinesSchema);