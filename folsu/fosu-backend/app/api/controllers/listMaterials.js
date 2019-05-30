var ListMaterialService  = require('../services/listMaterials');


module.exports = {

addItem: async function(req, res, next) {

    //console.log(req.body);
    var projectId = req.body.project;
    // We need to delete the projectId to send only the material 
    delete req.body.project;

    var materials = req.body;

    try{
        var material = await ListMaterialService.addItem(projectId, materials);
        return res.send({ status:200, data: material, message: "Succesfully Materials Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
    
},
 createold: async function(req, res, next) {

    var projectId = req.body.project;
    var materials = req.body.materials;

    try{
        await ListMaterialService.create(projectId, materials);
        return res.send({ status:200, message: "Succesfully Materials Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
    
},

update: async function(req, res, next) {

    //console.log(req.body);
    var projectId = req.body.project;
    // We need to delete the projectId to send only the material 
    delete req.body.project;

    var material = req.body;

    try{
        var material = await ListMaterialService.update(projectId, material);
        return res.send({ status:200, data: material, message: "Succesfully Materials Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
    
},

 getAll: async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var materials = await MaterialService.getAll({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: materials, message: "Succesfully Received Materials"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},

removeMaterials: async function(req, res, next){

    var listId = req.body.list;
    var materials = req.body.materials;

    try{
        var list = await ListMaterialService.removeMaterials(listId, materials);
        return res.send({status:200, data: list, message: "Succesfully Material Deleted"});
    }catch(e){
        return res.status(500).send({status: 500, message: e.message});
    }

},

removeItem: async function(req, res, next){

    console.log(req.body)
    var projectId = req.body.project
    var materialId = req.body.id

    try{
        var list = await ListMaterialService.removeMaterial(projectId, materialId);
        return res.send({status:200, data: list, message: "Succesfully Material Deleted"});
    }catch(e){
        return res.status(500).send({status: 500, message: e.message});
    }

},


// Created only for test purpose
updateMaterials: async function(req, res, next){

    var listId = req.body.list;
    var materials = req.body.materials;

    try{
        var list = await ListMaterialService.updateMaterials(listId, materials);
        return res.send({ status:200, data: list, message: "Succesfully Materials Updated"});
    }catch(e){
        return res.status(500).send({status: 500, message: e.message});
    }

},

getByProject: async function(req, res, next){

    try{
        var list = await ListMaterialService.getMaterialsByProject({ _id: req.params.id });
        return res.send({status: 200, data: list, message: "Succesfully Received List Material"});
        
    }catch(e){

        return res.send({status: 400, message: e.message});
        
    }
 },

 getNumMaterials: async function(req, res, next){

    try{
        var num = await ListMaterialService.getNumMaterials({ _id: req.params.id });
        return res.send({status: 200, data: num, message: "Succesfully Received Num of Materials"});
        
    }catch(e){

        return res.send({status: 400, message: e.message});
        
    }
 },

 getByShipment: async function(req, res, next){

    try{
        var list = await ListMaterialService.getMaterialsByShipment({ _id: req.params.id });
        return res.send({status: 200, data: list, message: "Succesfully Received List Material"});
        
    }catch(e){

        return res.send({status: 400, message: e.message});
        
    }
 },

 getByPacking: async function(req, res, next){

    try{
        var list = await ListMaterialService.getMaterialsByPacking({ _id: req.params.id });
        return res.send({status: 200, data: list, message: "Succesfully Received List Material by Packing"});
        
    }catch(e){

        return res.send({status: 400, message: e.message});
        
    }
 },

 getListMaterialById: async function(req, res, next){

    var id =  req.params.id

     try{
         var result = await ListMaterialService.getMaterials({_id: id})

         return res.send({ status:200, data: result, message: "Succesfully return Packing List"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },


}