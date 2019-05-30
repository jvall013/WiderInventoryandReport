var testModel = require('../models/test')

module.exports = {
 create: async function(req, res, next) {

    var params = {
        name: "test1",
        list: [
            {_id: 111, name: "Pedro"},
            {_id: 222, name: "Marcos"}
        ]
    }

    try{
        testModel.create(params, function (err, result) {
            if (err) {
                next(err);
            }
            else {
                //res.json({status: "success", message: "User added successfully!!!", data: null});
                res.json(result);
            }
        });
        
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
},

update: async function(req, res, next) {


    var friend = {_id: 111 }

    testModel.findByIdAndUpdate("5b86c7fa9ffd460a8875005f",
        {$pull: {list: friend}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                res.json(doc);
            }
        }
    );
 
}





}