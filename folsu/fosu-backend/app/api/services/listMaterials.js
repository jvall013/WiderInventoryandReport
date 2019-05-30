var listMaterials = require('../models/listMaterials');
var projects      = require('../models/projects');
var shipments = require('../models/shipments');

// Saving the context of this module inside the _the variable
_this = this

exports.addItem = async function(projectid, material) {

    try {

        var project = await projects.findOne({_id:projectid});

        if(project.materials !== undefined) {

            var list = await listMaterials.findOne({_id:project.materials})

            var obj = list.materials.find(function (obj) {
                 return obj.material == material.material;
            });

            console.log(obj);
            if(obj) {
                throw Error('Material already exists!!');
            } else {
                list.materials.push(material);
                await list.save();

                var res = await listMaterials.findOne({_id:list._id})
                                    .populate('materials.material')
                                    .exec()
                console.log(res);
                return res;
            }

        }

    } catch (e) {
        throw Error(e);
    }

    try {

        var list = await listMaterials.create({ materials: material });

        project.materials = list._id;
        await project.save();

        var res = await listMaterials.findOne({_id:list._id})
                                    .populate('materials.material')
                                    .exec()

        return res;

    } catch (e) {

        var deleted = await listMaterials.remove({_id: list._id});
        if(deleted.n === 0){
            throw Error("List Material could not be deleted");
        }

        throw Error('Error while creating the Initial List: ' + e);
    }
    
}

exports.getAll = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var res = await materials.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return res;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Materials')
    }
}


/** It is not completed */
exports.removeMaterials = async function(projectId, materialId) {

    try {

        var project = await projects.findOne({_id:projectId})

        var list = await listMaterials.findOne({_id:project.materials});

        for (let item of materials) {
            list.materials.id(item).remove();
        }

        var saved = await list.save();
        return saved;

    } catch(e) {
        throw Error("Error occured Removing List Materials");
    }

}

exports.removeMaterial = async function(projectId, materialId) {

    try {

        var project = await projects.findOne({_id:projectId})

        var list = await listMaterials.findOne({_id:project.materials});
        list.materials.id(materialId).remove();

        await list.save();

        var res = await listMaterials.findOne({_id:list._id})
                                    .populate('materials.material')
                                    .exec()
        return res;

    } catch(e) {
        throw Error("Error occured Removing List Materials");
    }

}

// Created for testing purpose
exports.updateMaterial = async function(listId, materials) {

    try {
        var list = await listMaterials.findOne({_id:listId});

        for (let item of materials) {
            list.materials.id(item.id).quantity = item.quantity;
        }

        var saved = await list.save();
        return saved;

    } catch(e) {
        throw Error("Error occured Updating List Materials");
    }

}

/**
 * Update a material in the List Material collection
 * 
 * @param {*} projectId 
 * @param {*} material 
 */
exports.update = async function(projectId, material) {

    //var id = material.id
    try{

        var project = await projects.findOne({_id:projectId})
        var list = await listMaterials.findOne({_id:project.materials});

        //console.log(material)

    }catch(e){
        throw Error("Error occured while Finding the List Material")
    }

    // If no find Object return false
    if(!list){
        return false;
    }
 
    //Edit the Item Object
    list.materials.id(material._id).quantity = material.quantity;

    try{
        var saved = await list.save()
        //console.log(savedproject)
        return saved;
    }catch(e){

        throw Error("And Error occured while updating material");
        
    }
}

exports.getMaterials = async function(query){

    try{

        var list = await listMaterials.findOne(query)
                                    .populate('materials.material')
                                    .exec()

        return list;

    }catch(e){

        throw Error("And Error occured while retrieving List Material: function getMaterials()");
        
    }
}

exports.getMaterialsByProject = async function(query){

    try{

        var project = await projects.findOne(query)

        var list = await listMaterials.findOne({_id:project.materials})
                                    .populate('materials.material')
                                    .exec()

        return list;

    }catch(e){

        throw Error("And Error occured while retrieving List Material: function getMaterialsByProject()");
        
    }
}

exports.getNumMaterials = async function(query){

    try{
        var project = await projects.findOne(query)

        var list = await listMaterials.findOne({_id:project.materials})
                                    .populate('materials.material')
                                    .exec()

        return list.materials.length;

    }catch(e){

        throw Error("And Error occured while retrieving Num Materials: function getNumMaterials()");
        
    }


}

exports.getMaterialsByShipment = async function(query){

        try{
    
            var shipment = await shipments.findOne(query)

            var list = await listMaterials.findOne({_id:shipment.shipmentList})
                                        .populate('materials.material')
                                        .exec()
    
            return list;
    
        }catch(e){
    
            throw Error("And Error occured while retrieving List Material: function getMaterialsByShipment()");
            
        }
    }


    exports.getMaterialsByPacking = async function(query){

            try{
        
                var shipment = await shipments.findOne(query)
                var list = await listMaterials.findOne({_id:shipment.packingList})
                                            .populate('materials.material')
                                            .exec()
        
                return list;
        
            }catch(e){
        
                throw Error("And Error occured while retrieving List Material: function getMaterialsByPacking()");
                
            }
        }