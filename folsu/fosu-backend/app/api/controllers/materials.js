const materialModel  = require('../models/materials'); 
var MaterialService  = require('../services/materials');
const material       = new materialModel();


module.exports = {
 create: async function(req, res, next) {

    var description = req.body.description;

    try{
        var materials = await MaterialService.create(description);
        return res.send({ status:200, data: materials, message: "Succesfully Material Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
},

 getAll: async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    try{
    
        var materials = await MaterialService.getAll({})
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: materials, message: "Succesfully Received Materials"});
        
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
}






}