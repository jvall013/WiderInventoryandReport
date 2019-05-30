// Gettign the Newly created Mongoose Model we just created 
var shipments = require('../models/shipments');
var listMaterials = require('../models/listMaterials');
var Material = require('../models/materials');
var Project = require('../models/projects');

// Saving the context of this module inside the _the variable
_this = this

exports.create = async function(params) {

    var result;

    try {

        var shipment = await shipments.findOne({orderNumber: params.orderNumber});

        if(!shipment) {
            shipment = await shipments.create({projectId: params.projectId,
                                             orderNumber: params.orderNumber})
        }

        if(params.shipmentList) {

            var list = await listMaterials.create({ materials: params.shipmentList });

            shipment.deliveryDate = params.deliveryDate
            shipment.formerId     = params.formerId
            shipment.shipmentList = list._id

            shipment.save()

        } else {

            var list = await listMaterials.create({ materials: params.packingList });

            shipment.packingDate  = params.packingDate
            shipment.officeId     = params.officeId
            shipment.packingList  = list._id

            shipment.save()
        }

        result = this.generateShippedPunchList(shipment, 1)

        return result;


    } catch (e) {
        throw Error('Error while creating the Shipment: ' + e);
    }

}

exports.update = async function(params) {

    var result;

    try {

        var shipment = await shipments.findOne({_id: params.shipmentId});

        if(!shipment) {
            throw Error('Error while updating the Shipment: We can not find the shipment');
        }

        if(params.shipmentList) {

            var deleted = await listMaterials.remove({_id: shipment.shipmentList});
            if(deleted.n === 0){
                throw Error("shipment Could not be deleted")
            }

            var list = await listMaterials.create({ materials: params.shipmentList });

            shipment.projectId    = params.projectId
            shipment.orderNumber  = params.orderNumber
            shipment.shipmentList = list._id

            shipment.save()

        } 
        else {

            var deleted = await listMaterials.remove({_id: shipment.packingList});
            if(deleted.n === 0){
                throw Error("Packing Could not be deleted")
            }

            var list = await listMaterials.create({ materials: params.packingList });

            shipment.projectId    = params.projectId
            shipment.orderNumber  = params.orderNumber
            shipment.packingList  = list._id

            shipment.save()

        }


        return result;


    } catch (e) {
        throw Error('Error while updating the Shipment: ' + e);
    }

}


exports.generateShippedPunchList = async function(shipment, auto = 0) {

    var packingPunch = []

    try {

        if(auto === 0) {
            var shipment = await shipments.findOne({orderNumber: shipment})
        }


        if(shipment) {

            if(shipment.shipmentList && shipment.packingList) {

                // With lean only get a raw plain javascript result
                var shipmentList = await listMaterials.findOne({_id: shipment.shipmentList}).lean().exec()
                var packingList = await listMaterials.findOne({_id: shipment.packingList}).lean().exec()

                for(var t = 0; t < packingList.materials.length; t++) {
                    packingList.materials[t].differ = packingList.materials[t].quantity
                }
    
                for (var i = 0; i < shipmentList.materials.length; i++)
                    for(var j = 0; j < packingList.materials.length; j++) {
    
                        if(shipmentList.materials[i].line === packingList.materials[j].line) {
    
                            packingList.materials[j].checked = true
                            packingList.materials[j].differ = packingList.materials[j].differ - shipmentList.materials[i].quantity
    
                        }
                    }
    
                for(i = 0; i < packingList.materials.length; i++) {
                    if(!packingList.materials[i].checked || packingList.materials[i].differ > 0) {
    
                        var material = await Material.findOne({_id: packingList.materials[i].material})
    
                        packingList.materials[i].materialId = packingList.materials[i].material
                        packingList.materials[i].material   = material.description

                        packingPunch.push(packingList.materials[i])
                    }
                }
        
                return packingPunch

            } else {
                return 'missing'
            }

        } else {
            return null
        }
        

    } catch (e) {
        throw Error('Error generating punch list: ' + e);
    }

}

// Async function to get the To do List
exports.getshipments = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var shipment = await shipments.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return shipment;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating shipment')
    }
}

exports.deleteshipment = async function(id){
    
   
    try{
        var deleted = await shipments.remove({_id: id});
        if(deleted.n === 0){
            throw Error("shipment Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the shipment " + id)
    }
}

exports.updateshipment = async function(shipment){

    console.log(shipment.id + 'new here')
    var id = shipment.id
    console.log('here with id='+id )
    try{
        //Find the old Todo Object by the Id
        
        var oldshipment = await shipments.findById({_id:id});
        
    }catch(e){
        throw Error("Error occured while Finding the shipment")
    }

    // If no old Todo Object exists return false
    if(!oldshipment){
        return false;
    }
 
    //Edit the Todo Object
    var repeated;

    oldshipment.projectId = shipment.projectId
    oldshipment.shipDate = shipment.shipDate
    oldshipment.deliveryDate = shipment.deliveryDate
    oldshipment.formerId = shipment.formerId
    oldshipment.factoryId = shipment.factoryId
    oldshipment.shipmentList = shipment.shipmentList




    try{
        var savedshipment = await oldshipment.save()
        //console.log(savedshipment)
        return savedshipment;
    }catch(e){ 
        throw Error("And Error occured while updating the shipment");
        
    }
}

exports.getPopulatedshipments = async function(query){
    var docs = await shipments.find(query).populate('projectId').populate('formerId').populate('factoryId').populate('shipmentList').exec();
    return docs;
}

exports.getLastPopulatedshipments = async function(query){

    var ships = await shipments.find(query)
                              //.populate('formerId')
                              .sort('-deliveryDate')
                              .limit(3)
                              .exec();

    if(ships.length) {
        var good = []
        ships.forEach(element => {
            //console.log(element.shipmentList)
            if(element.shipmentList) {
                good.push(element)
            }
        });

        return good
    }

    return ships;
}

exports.getLastPopulatedPackings = async function(query){

    var ships = await shipments.find(query)
                              //.populate('officeId')
                              .sort('-packingDate')
                              .limit(3)
                              .exec();

    if(ships.length) {
        var good = []
        ships.forEach(element => {
            //console.log(element.shipmentList)
            if(element.packingList) {
                good.push(element)
            }
        });

        return good
    }

    return ships;
}

exports.validOrder = async function(query, type) {

    var shipment = await shipments.findOne(query)

    if(!shipment)
        return 'valid'
    else {

        if(type == "shipment" && shipment.shipmentList) {
            return 'no valid';
        }      
        else if(type == "packing" && shipment.packingList) {
            return 'no valid';
        }

        return 'valid';

    }
}

exports.getShipment = async function(query){

    var res = await shipments.findOne(query);

    return res;

}

exports.getShipmentWithList = async function(query){

    try{

        var res = await shipments.findOne(query);

        var data = {
            shipmentId:   res._id,
            projectId:    res.projectId,
            orderNumber:  res.orderNumber,
            deliveryDate: res.deliveryDate,
            shipmentList: []
        }

        var project = await Project.findOne({_id: res.projectId})

        data.project = project.name

        var shipmentList = await listMaterials.findOne({_id: res.shipmentList}).lean().exec()

        data.shipmentList = shipmentList.materials

        return data;
        
    } catch(e) {
        throw Error("And Error occured while getting the shipment with list", e);
    }

}

exports.getPackingWithList = async function(query){

    try{

        var res = await shipments.findOne(query);

        var data = {
            shipmentId:   res._id,
            projectId:    res.projectId,
            orderNumber:  res.orderNumber,
            deliveryDate: res.deliveryDate,
            packingList: []
        }
        
        var project = await Project.findOne({_id: res.projectId})

        data.project = project.name

        var packingList = await listMaterials.findOne({_id:res.packingList})
                                            .populate('materials.material')
                                            .lean()
                                            .exec()

        data.packingList = packingList.materials

        return data;
        
    } catch(e) {
        throw Error("And Error occured while getting the packing with list", e);
    }

}