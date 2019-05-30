// Gettign the Newly created Mongoose Model we just created 
var projects = require('../models/projects')
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getProjects = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var project = await projects.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return project;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Project')
    }
}

exports.deleteproject = async function(id){
    
   
    try{
        var deleted = await projects.remove({_id: id});
        if(deleted.n === 0){
            throw Error("Project Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Project " + id)
    }
}

exports.updateProject = async function(project){

    console.log(project)

    try{    
        var oldproject = await projects.findOne({_id:project._id});
        
    }catch(e){
        throw Error("Error occured while Finding the project")
    }

    // If no old Todo Object exists return false
    if(!oldproject){
        return false;
    }
 
    //Edit the Todo Object
    var repeated = false;

    if (project.pcode !== oldproject.pcode) {

        projects.findOne({pcode:project.pcode}, function(err, projectInfo){
       if (err) {
        next(err);
       } else {
            if(projectInfo) {
                repeated = true;
            } 
       }
       
      });
    }


    oldproject.name          = project.name
    oldproject.client        = project.client
    oldproject.address       = project.address
    oldproject.state         = project.state
    oldproject.installer     = project.installer
    oldproject.pcode         = project.pcode
    oldproject.floors        = project.floors
    oldproject.expectedBegin = project.expectedBegin

    try{
        //console.log(oldproject)
        var savedproject = await oldproject.save()
        //console.log(savedproject)
        return savedproject;
    }catch(e){ 
         if(repeated == true){
            throw Error("Duplicated code project"); 
         }
        else{
            console.log(e)
            throw Error("And Error occured while updating the project", e);
        }
    }
}

exports.getPopulatedProjects = async function(query){
    var docs = await projects.find(query).populate('installer').exec();
    return docs;
}

exports.getPopulatedProject = async function(query){
    var docs = await projects.findOne(query).populate('installer').exec();
    return docs;
}