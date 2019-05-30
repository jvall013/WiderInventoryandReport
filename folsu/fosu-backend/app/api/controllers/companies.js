const companyModel = require('../models/companies'); 
var companyService = require('../services/companies');
// const company      = new companyModel();


module.exports = {
 create: function(req, res, next) {

    companyModel.findOne({name:req.body.name}, function(err, companyInfo){
        console.log(err + "company: " + companyInfo);
       if (err) {
        next(err);
       } else {
            if(companyInfo) {
                res.json({status:"error", message: "Duplicated id", data:null});
            } else {
                companyModel.create({  name: req.body.name}, function (err, result) {
                    if (err) {
                        next(err);
                    }
                    else {
                        res.json(result);
                    }
                });
            }
       }
       
      });
},

 getAllcompanies: async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var companies = await companyService.getCompanies({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: companies, message: "Succesfully Received companies"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},

removecompany: async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await companyService.deletecompany(id)
        return res.status(204).json({status:204, message: "Succesfully company Deleted"})
    }catch(e){console.log('here')
        return res.status(400).json({status: 400, message: e.message})
    }

},

updatecompany: async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    console.log('here with')
    console.log( req.body)

  


    var company = {
        id,
        name: req.body.name ? req.body.name : null,
    
    
    }

    try{
        var updatedcompany = await companyService.updateCompany(company);
        return res.status(200).json({status: 200, data: updatedcompany, message: "Succesfully Updated company"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}






}