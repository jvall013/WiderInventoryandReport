// Gettign the Newly created Mongoose Model we just created 
var timelines = require('../models/timelines')

// Saving the context of this module inside the _the variable
_this = this

exports.create = async function(data) {

    try {
        var res = await timelines.create({project: data.projectId, floor: data.floor, timeline: data.timeline })

        console.log(res)

        if(res) {
            var list = await timelines.findOne({project: res.project, floor: res.floor})

            return list
        } else {
            throw Error('Error while retrieving the added Timeline')
        }
    } catch (e){
        throw Error('Error while adding Timeline')
    }

}

exports.addActivity = async function(projectId, floor, activity) {

    try {

        var timeline = await timelines.findOne({project: projectId, floor: floor})

        if(timeline) {

            timeline.timeline.push(activity)
            await timeline.save()

            var list = await timelines.findOne({project: projectId, floor: floor})

            return list

        } else {

            line = [];
            line.push(activity)

            var res = await timelines.create({project: projectId, floor: floor, timeline: line })

            return res
        }

        return list

    } catch(e) {

    }
        
    
}

exports.deleteActivity = async function(timelineId, activity) {

    timelines.findByIdAndUpdate(timelineId,
        {$pull: {timeline: activity}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                throw Error("And Error occured while delete Activity", err);
            }else{
                console.log("deleting activity")
            }
        }
    );

    var time = await timelines.findOne({_id: timelineId})

    return time
    
}

exports.getTimelineByProject = async function(projectId){

    try{

        var schedule = await timelines.find({ project: projectId })
                                      .sort('floor')
                                      .exec();

        return schedule;
        
    } catch(e) {
        throw Error("And Error occured while getting the timeline by project", e);
    }

}

exports.getActivitiesByFloor = async function(projectId){

    try{

        var schedule = await timelines.find({ project: projectId })
                                      .sort('floor')
                                      .lean()
                                      .exec();

        return schedule;
        
    } catch(e) {
        throw Error("And Error occured while getting the timeline by project", e);
    }

}

