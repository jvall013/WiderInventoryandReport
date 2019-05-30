// Gettign the Newly created Mongoose Model we just created 
var users = require('../models/users');
var roles = require('../models/roles');
var companies = require('../models/companies');

var assert = require('assert');


// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getUsers = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var user = await users.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return user;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Users')
    }
}

exports.deleteUser = async function(id){
    
   
    try{
        var deleted = await users.remove({_id: id});
        if(deleted.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the User " + id)
    }
}

exports.updateUser = async function(user){

    try{    
        var olduser = await users.findOne({_id:user._id});
        
    }catch(e){
        throw Error("Error occured while Finding the user")
    }

    // If no old Object exists return false
    if(!olduser){
        return false;
    }
 
    //Edit the Object
    var repeated = false;

    if (user.email !== olduser.email) {

        users.findOne({email:user.email}, function(err, userInfo){
        if (err) {
            next(err);
        } else {
            if(userInfo) {
                repeated = true;
            } 
        }
       
      });
    }


    olduser.fname     = user.fname
    olduser.lname     = user.lname
    olduser.email     = user.email
    olduser.salary    = user.salary
    olduser.role      = user.role
    olduser.project   = user.project
    olduser.company   = user.company

    try{
        //console.log(oldproject)
        var saved = await olduser.save()

        return saved;
    }catch(e){ 
         if(repeated == true){
            throw Error("Duplicated email"); 
         }
        else{
            throw Error("And Error occured while updating the user");
        }
    }
}

// Async function to get one User
exports.getUser = async function(query){

    var res = await users.findOne(query);

    return res;

}

// Async function to get the User Roles
exports.getRoles = async function(query){

     var res = await roles.find(query, function (err, docs) {

        if(err) return err;
        return docs;

    });

    return res;

}

// Async function to get the User Role 
exports.getRole = async function(query){

    var res = await roles.findOne(query, function (err, docs) {

       if(err) return err;
       return docs;

   });

   return res;

}

// Async function to get the Companies
exports.getCompanies = async function(query){

    var res = await companies.find(query, function (err, docs) {

       if(err) return err;
       return docs;

   });

   return res;

}

exports.getPopulatedUsers = async function(query){
    var docs = await users.find(query).populate('role').populate('company').exec();
    return docs;
}

exports.getPopulatedUsersByProject = async function(projectId){

    var docs = await users.find({project: projectId}).populate('role').populate('company').exec();
    return docs;

}


/**
 * OLLD IMPLEMENTATION OF POPULATE A QUERY RESULT WITH PROMISES
 */

exports.getPopulatedUsers2 = async function(query) {

    const res = await new Promise(resolve => {
        users.find(query)
                .populate('role')
                .populate('company')
                .exec(function(err, docs) {
            if (err) throw Error("And Error occured while getting users");
            //console.log(docs);
            resolve(docs);
        });
    });
    
    return res;
}