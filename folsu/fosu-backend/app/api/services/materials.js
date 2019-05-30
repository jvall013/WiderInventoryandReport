// Gettign the Newly created Mongoose Model we just created 
var materials = require('../models/materials')

// Saving the context of this module inside the _the variable
_this = this

exports.create = async function(data) {

    try {
        var res = materials.create({description: data})

        if(res) {
            var list = materials.find({})

            return list
        } else {
            return null
        }
    } catch (e){
        throw Error('Error while adding Material')
    }

}

// Async function to get the To do List
exports.getAll = async function(query){

    try {
        var res = await materials.find(query)
                                 .sort('description')
                                 .exec()
        
        // Return the todod list that was retured by the mongoose promise
        return res;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while getting Materials')
    }
}

exports.delete = async function(id) {
    
   
    try{
        var deleted = await materials.remove({_id: id});
        if(deleted.n === 0){
            throw Error("Material Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Material " + id)
    }
}

exports.update = async function(material){

    var id = material.id
    try{
        //Find the old Todo Object by the Id
        
        var old = await materials.findById({_id:id});
        
    }catch(e){
        throw Error("Error occured while Finding the project")
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