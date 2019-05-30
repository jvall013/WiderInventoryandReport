const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var hoursReportSchema = new Schema({ 
    user: { 
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    observations: {
        type: String,
        trim: true
    }
});

var activityReportSchema = new Schema({
    floor: {
        type: Number,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }
});

//Define a schema

const DailyReportSchema = new Schema({
 project: { 
     type: Schema.Types.ObjectId, ref: 'Project',
     required: true
 },
 reportedAt: {
    type: Date,
    trim: true,
    required: true
 },
 createdAt: {
    type: Date,
    trim: true,
    required: true
 },
 createdBy: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
 },
 activities: [ activityReportSchema ],
 hours: [ hoursReportSchema ]
});

module.exports = mongoose.model('DailyReport', DailyReportSchema);