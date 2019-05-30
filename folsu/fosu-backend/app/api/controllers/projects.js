const projectModel = require('../models/projects'); 
const jwt       = require('jsonwebtoken');
var ProjectService = require('../services/projects');


module.exports = {
 create: function(req, res, next) {

    projectModel.findOne({pcode:req.body.pcode}, function(err, projectInfo){
        //console.log(err + "project: " + projectInfo);
       if (err) {
        next(err);
       } else {
            if(projectInfo) {
                res.json({status:"error", message: "Duplicated project code", data:null});
            } else {
                projectModel.create({  name: req.body.name, client: req.body.client, address: req.body.address, state: req.body.state, installer: req.body.installer, pcode: req.body.pcode}, function (err, result) {
                    if (err) {
                        next(err);
                    }
                    else {
                        res.json(result);
                    }
                });
            }
       }
       
      });
},

 getAllprojects: async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var projects = await ProjectService.getProjects({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: projects, message: "Succesfully Received projects"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},

removeproject: async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await ProjectService.deleteproject(id)
        return res.status(204).json({status:204, message: "Succesfully project Deleted"})
    }catch(e){console.log('here')
        return res.status(400).json({status: 400, message: e.message})
    }

},

updateproject: async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    var project = {
        _id: id,
        pcode: req.body.pcode ? req.body.pcode : null,
        name: req.body.name ? req.body.name : null,
        client: req.body.client ? req.body.client : null,
        address: req.body.address ? req.body.address : null,
        state: req.body.state ? req.body.state : null,
        installer: req.body.installer ? req.body.installer : null,
        floors: req.body.floors ? req.body.floors : null,
        expectedBegin: req.body.expectedBegin ? req.body.expectedBegin : null,
    }

    try{
        var updatedproject = await ProjectService.updateProject(project)
        return res.send({ status:200, data: updatedproject, message: "Succesfully Updated Project"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
},

getPopulatedProjects: async function(req, res, next){

    try{
    
        var projects = await ProjectService.getPopulatedProjects({});
        return res.status(200).json({status: 200, data: projects, message: "Succesfully Received Populated Projects"});
        
    }catch(e){

        return res.status(400).json({status: 400, message: e.message});
        
    }
 },

 getPopulatedProject: async function(req, res, next){

    try{

        var projectId = req.params.id
    
        var projects = await ProjectService.getPopulatedProject({_id:projectId});
        return res.status(200).json({status: 200, data: projects, message: "Succesfully Received Project"});
        
    }catch(e){

        return res.status(400).json({status: 400, message: e.message});
        
    }
 }


}








