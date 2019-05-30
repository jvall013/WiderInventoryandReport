var TimelineService  = require('../services/timelines');

module.exports = {
 create: async function(req, res, next) {

    try{
        var timeline = await TimelineService.create(req.body);
        return res.send({ status:200, data: timeline, message: "Succesfully Timeline Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
},

addActivity: async function(req, res, next) {

    let projectId = req.body.projectId
    let floor     = req.body.floor
    let activity  = req.body.activity

    try {
        var timeline = await TimelineService.addActivity(projectId, floor, activity);
        return res.send({ status:200, data: timeline, message: "Succesfully Add Activity"});
    } catch(e) {
        return res.send({status: 500, message: e.message});
    }

},

deleteActivity: async function(req, res, next) {

    let timelineId = req.body.timelineId
    let activity   = req.body.activity

    try {
        var timeline = await TimelineService.deleteActivity(timelineId, activity);

        return res.send({ status:200, data: timeline, message: "Succesfully Removed Activity"});
    } catch(e) {
        return res.send({status: 500, message: e.message});
    }

},

 getByProject: async function(req, res, next){

    var projectId = req.params.id

    try{
    
        var timeline = await TimelineService.getTimelineByProject(projectId)
   
        return res.send({ status:200, data: timeline, message: "Succesfully get Timeline"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},

remove: async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await MaterialService.delete(id)
        return res.status(204).json({status:204, message: "Succesfully Material Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

},

update: async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;


    var material = {
        id,
        description: req.body.description ? req.body.description : null
    }

    try{
        var updated = await MaterialService.update(material)
        return res.status(200).json({status: 200, data: updated, message: "Succesfully Updated Material"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
},

getActivitiesByFloor: async function(req, res, next){

    var projectId = req.params.id

    try{
    
        var timeline = await TimelineService.getActivitiesByFloor(projectId)
   
        return res.send({ status:200, data: timeline, message: "Succesfully get Timeline"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},




}