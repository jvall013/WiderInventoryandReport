// Gettign the Newly created Mongoose Model we just created 
var listShipments = require('../models/listShipment');

// Saving the context of this module inside the _the variable
_this = this

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

exports.removeMaterials = async function(listId, materials) {

    try {

        var list = await listShipments.findOne({_id:listId});

        for (let item of materials) {
            list.materials.id(item).remove();
        }

        var saved = await list.save();
        return saved;

    } catch(e) {
        throw Error("Error occured Removing List Materials");
    }

}

exports.updateMaterials = async function(listId, materials) {

    try {
        var list = await listShipments.findOne({_id:listId});

        for (let item of materials) {
            list.materials.id(item.id).quantity = item.quantity;
        }

        var saved = await list.save();
        return saved;

    } catch(e) {
        throw Error("Error occured Updating List Materials");
    }

}

exports.update = async function(material){

    var id = material.id
    try{
        //Find the old Todo Object by the Id
        
        var old = await materials.findById({_id:id});
        
    }catch(e){
        throw Error("Error occured while Finding the List Material")
    }

    // If no old Todo Object exists return false
    if(!old){
        return false;
    }
 
    //Edit the Todo Object

    old.description = material.description;

    try{
        var saved = await old.save()
        //console.log(savedproject)
        return saved;
    }catch(e){

        throw Error("And Error occured while updating material");
        
    }
}

exports.getByProject = async function(query){

    var docs = await listShipments.find(query)
                    .populate("project")
                    .populate("materials.material")
                    .exec();

    return docs;

}