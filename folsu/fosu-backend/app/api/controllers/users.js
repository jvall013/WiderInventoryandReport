const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var UserService = require('../services/users');

module.exports = {
 create: function(req, res, next) {

    userModel.findOne({email:req.body.email}, function(err, userInfo){
       if (err) {
        next(err);
       } else {
            if(userInfo) {
                res.json({status:"error", message: "Duplicated email", data:null});
            } else {

                var params = {
                    fname:    req.body.fname, 
                    lname:    req.body.lname, 
                    email:    req.body.email, 
                    password: req.body.password,
                    salary:   req.body.salary,
                    role:     req.body.role, 
                    company:  req.body.company,
                    project:  req.body.project
                }    

                userModel.create(params, function (err, result) {
                    if (err) {
                        next(err);
                    }
                    else {
                        //res.json({status: "success", message: "User added successfully!!!", data: null});
                        res.json(result);
                    }
                });
            }
       }
       
      });
},
authenticate: async function(req, res, next) {

    try{
        
        var user = await UserService.getUser({email:req.body.email});

        console.log(user)

        if(user) {
            var role = await UserService.getRole({_id: user.role});
            const token = jwt.sign({id: user._id, role: role.name}, req.app.get('secretKey'), { expiresIn: '1h' });
            res.json({status:"success", message: "user found!!!", data:{user: user, token:token}});
        } else {
            res.json({status:"error", message: "User does not exists!!!", data:null});
        }

    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
 },
 getAllUsers: async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var users = await UserService.getUsers({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: users, message: "Succesfully Received users"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},

removeUser: async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully User Deleted"})
    }catch(e){console.log('here')
        return res.status(400).json({status: 400, message: e.message})
    }

},


updateUser: async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    try{
        var updatedUser = await UserService.updateUser(req.body)
        return res.send({ status:200, data: updatedUser, message: "Succesfully Updated User"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
},

getUser: async function(req, res, next) {

    try{
        
        var user = await UserService.getUser({_id: req.params.id});
        return res.status(200).json({status: 200, data: user, message: "Succesfully Received User"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
},
getRoles: async function(req, res, next){

   try{
   
       var roles = await UserService.getRoles({});
       return res.status(200).json({status: 200, data: roles, message: "Succesfully Received Roles"});
       
   }catch(e){
       
       //Return an Error Response Message with Code and the Error Message.
       
       return res.status(400).json({status: 400, message: e.message});
       
   }
},
getCompanies: async function(req, res, next){

    try{
    
        var companies = await UserService.getCompanies({});
        return res.status(200).json({status: 200, data: companies, message: "Succesfully Received Companies"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
 },

 getPopulatedUsers: async function(req, res, next){

    try{
    
        var users = await UserService.getPopulatedUsers({});
        return res.status(200).json({status: 200, data: users, message: "Succesfully Received Populated Users"});
        
    }catch(e){

        return res.status(400).json({status: 400, message: e.message});
        
    }
 },

 getPopulatedUsersByProject: async function(req, res, next){

    var projectId = req.params.id

    try{
    
        var users = await UserService.getPopulatedUsersByProject(projectId);
        return res.status(200).json({status: 200, data: users, message: "Succesfully Received Populated Users by Project"});
        
    }catch(e){

        return res.status(400).json({status: 400, message: e.message});
        
    }
 },

 getRole: async function(req, res, next) {


    try{

        var user = await UserService.getUser({_id: req.params.user});
        var role  = await UserService.getRole({_id: user.role});

        return res.status(200).json({status: 200, data: role.name, message: "Succesfully Received Rol"});
        
    }catch(e){

        return res.status(400).json({status: 400, message: e.message});
        
    }
 }


}