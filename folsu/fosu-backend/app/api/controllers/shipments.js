const shipmentModel = require('../models/shipments'); 
var shipmentService = require('../services/shipments');
var listService     = require('../services/listMaterials');

module.exports = {
 createold: function(req, res, next) {

    //shipmentModel.create({projectId: req.body.projectId, shipDate: req.body.shipDate, deliveryDate: req.body.deliveryDate, formerId: req.body.formerId, factoryId: req.body.state, shipmentList: req.body.shipmentList }, function (err, result) {
    shipmentModel.create({projectId: req.body.projectId, deliveryDate: req.body.deliveryDate, formerId: req.body.formerId, shipmentList: req.body.shipmentList }, function (err, result) {
        if (err) {
            next(err);
        }
        else {
            res.json(result);
        }
    })

 },
  
 create: async function(req, res, next) {

    try{
        var shipment = await shipmentService.create(req.body);
        return res.send({ status:200, data: shipment, message: "Succesfully Shipment Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
    
},

update: async function(req, res, next) {

    try{
        var shipment = await shipmentService.update(req.body);
        return res.send({ status:200, data: shipment, message: "Succesfully Shipment Updated"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
    
},

 getAllshipments: async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var shipments = await shipmentService.getshipments({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: shipments, message: "Succesfully Received shipments"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},

removeshipment: async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await shipmentService.deleteshipment(id)
        return res.status(204).json({status:204, message: "Succesfully shipment Deleted"})
    }catch(e){console.log('here')
        return res.status(400).json({status: 400, message: e.message})
    }

},

updateshipment: async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

  


    var shipment = {
        id,
        projectId: req.body.projectId ? req.body.projectId : null,
        shipDate: req.body.shipDate ? req.body.shipDate : null,
        deliveryDate: req.body.deliveryDate ? req.body.deliveryDate : null,
        factoryId: req.body.factoryId ? req.body.factoryId : null,
        formerId: req.body.formerId ? req.body.formerId : null,
        shipmentList: req.body.shipmentList ? req.body.shipmentList : null,
    }

    try{
        var updatedshipment = await shipmentService.updateshipment(shipment)
        return res.status(200).json({status: 200, data: updatedshipment, message: "Succesfully Updated shipment"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
},

getPopulatedshipments: async function(req, res, next){

    try{
    
        var shipments = await shipmentService.getPopulatedshipments({});
        return res.status(200).json({status: 200, data: shipments, message: "Succesfully Received Populated shipments"});
        
    }catch(e){

        return res.status(400).json({status: 400, message: e.message});
        
    }
 },

 getProjectShipments: async function(req, res, next){

   var pid =  req.params.id

    try{
        var Response = await shipmentModel.find({ projectId: pid})
        return res.status(204).json({status:204, data: Response, message: "Succesfully get shipments"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }



 },

 validOrder: async function(req, res, next){

    var order =  req.params.id
    var type = req.params.type
 
     try{
         var result = await shipmentService.validOrder({ orderNumber: order}, type)

         return res.send({ status:200, data: result, message: "Succesfully validate order"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },

  getLastShipments: async function(req, res, next){

    var projectId =  req.params.id

     try{
         var result = await shipmentService.getLastPopulatedshipments({ projectId: projectId})

         return res.send({ status:200, data: result, message: "Succesfully return last shipments"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },

  getLastPackings: async function(req, res, next){

    var projectId =  req.params.id

     try{
         var result = await shipmentService.getLastPopulatedPackings({ projectId: projectId})

         return res.send({ status:200, data: result, message: "Succesfully return last packings"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },

  getShipment: async function(req, res, next){

    var id =  req.params.id

     try{
         var result = await shipmentService.getShipment({ _id: id})

         return res.send({ status:200, data: result, message: "Succesfully return shipment"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },

  getShipmentWithList: async function(req, res, next){

    var id =  req.params.id

     try{
         var result = await shipmentService.getShipmentWithList({ _id: id})

         return res.send({ status:200, data: result, message: "Succesfully return shipment"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },

  getPackingWithList: async function(req, res, next){

    var id =  req.params.id

     try{
         var result = await shipmentService.getPackingWithList({ _id: id})

         return res.send({ status:200, data: result, message: "Succesfully return packing"})

     }catch(e){
         return res.status(400).json({status: 400, message: e.message})
     }
 
  },

  generatePunch: async function(req, res, next) {

    var order = req.params.order

     try{
         var result = await shipmentService.generateShippedPunchList(order)

         if(result === null)
            return res.send({ status:100, data: null, message: "Order number not found"})
        else if(result == "missing")
            return res.send({ status:300, data: null, message: "Something is missing (Shipment or Packing"})
        else
            return res.send({ status:200, data: result, message: "Succesfully generate punch"})

     }catch(e){
        return res.send({ status:400, message: e.message})
     }
  }


}








