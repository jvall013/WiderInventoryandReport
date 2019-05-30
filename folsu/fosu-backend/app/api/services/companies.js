// Gettign the Newly created Mongoose Model we just created 
var companies = require('../models/companies')
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getCompanies = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var company = await companies.paginate(query, options)
        
        // Return the todod list that was retured by the mongoose promise
        return company;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Project')
    }
}

exports.deletecompany = async function(id){
    
   
    try{
        var deleted = await companies.remove({_id: id});
        if(deleted.n === 0){
            throw Error("Project Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Project " + id)
    }
}

exports.updateCompany = async function(company){

    console.log(company.id + 'new here')
    var id = company.id
    console.log('here with id='+id )
    try{
        //Find the old Todo Object by the Id
        
        var oldcompany = await companies.findById({_id:id});
        
    }catch(e){
        throw Error("Error occured while Finding the project")
    }

    // If no old Todo Object exists return false
    if(!oldcompany){
        return false;
    }
 
    //Edit the Todo Object

  

    oldcompany.name = company.name
   




    try{
        var savedcompany = await oldcompany.save()
        //console.log(savedproject)
        return savedcompany;
    }catch(e){

        throw Error("And Error occured while updating the company");
        
    }
}
