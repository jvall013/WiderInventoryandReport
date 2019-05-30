// Gettign the Newly created Mongoose Model we just created 
var shipments = require('../models/shipments');
var listMaterials = require('../models/listMaterials');
var Material = require('../models/materials');
var Project = require('../models/projects');

// Saving the context of this module inside the _the variable
_this = this;


exports.getDeliveredMaterialsByProject = async function(params) {

    /*listMaterials.aggregate([
        { $group: {
            _id: null,
            //total:       { $sum: { $add: ["$user_totaldocs", "$user_totalthings"] } },
            totaldocs:   { $sum: "$materials.quantity" }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });*/

    try {

        var report = [];
        var initialData = [];

        var list = await shipments.find({projectId: params.id});

        //console.log(list)

        /*var ship = await listMaterials.findOne({_id:'5b71f0b50c2638176c24553c'})
                                            .populate('materials')
                                            .lean()
                                            .exec()
        console.log(ship)*/

        for(var i = 0; i < list.length;i++) {

            if(list[i].shipmentList && list[i].packingList) {

                    var shipmentList = await listMaterials.findOne({_id: list[i].shipmentList}).lean().exec()
                    var packingList  = await listMaterials.findOne({_id: list[i].packingList}).populate('materials.material').lean().exec()
                    
                    for (var x = 0; x < shipmentList.materials.length; x++)
                        for(var y = 0; y < packingList.materials.length; y++) {
    
                            if(shipmentList.materials[x].line === packingList.materials[y].line) {
        
                                shipmentList.materials[x].materialId          = packingList.materials[y].material._id
                                shipmentList.materials[x].materialDescription = packingList.materials[y].material.description

                                initialData.push(shipmentList.materials[x])
        
                            }

                    }
                }

            }

            for(i = 0; i < initialData.length;i++)
                for(y = i+1; y < initialData.length; y++) {

                    if(initialData[i].materialId.equals(initialData[y].materialId)) {

                        initialData[i].quantity += initialData[y].quantity
                        initialData.splice(y,1)

                    }
            }

            return initialData;

    } catch (error) {
        throw Error("And Error occured while getting the report in getDeliveredMaterialsByProject()", e);
    }

}

exports.getDiffWithPlannedList = async function(params) {

    //try {

        var report = [];
        var initialData = [];
        var row = {};

        var list    = await shipments.find({projectId: params.id});
        var project = await Project.findOne({_id: params.id});

        var planned = await listMaterials.findOne({_id:project.materials})
                                            .populate('materials.material')
                                            .lean()
                                            .exec()

        for(var i = 0; i < list.length;i++) {

            if(list[i].shipmentList && list[i].packingList) {

                    var shipmentList = await listMaterials.findOne({_id: list[i].shipmentList}).lean().exec()
                    var packingList  = await listMaterials.findOne({_id: list[i].packingList}).populate('materials.material').lean().exec()
                    
                    for (var x = 0; x < shipmentList.materials.length; x++)
                        for(var y = 0; y < packingList.materials.length; y++) {
    
                            if(shipmentList.materials[x].line === packingList.materials[y].line) {
        
                                shipmentList.materials[x].materialId          = packingList.materials[y].material._id
                                shipmentList.materials[x].materialDescription = packingList.materials[y].material.description

                                initialData.push(shipmentList.materials[x])
        
                            }

                    }
                }

            }

            for(i = 0; i < initialData.length;i++)
                for(y = i+1; y < initialData.length; y++) {

                    if(initialData[i].materialId.equals(initialData[y].materialId)) {

                        initialData[i].quantity += initialData[y].quantity
                        initialData.splice(y,1)

                    }
            }

            for (x = 0; x < planned.materials.length; x++) {
                y = 0
                var find = false
                while(y < initialData.length && !find) {

                    if(planned.materials[x].material._id.equals(initialData[y].materialId)) {
                        find = true
                        var diff = planned.materials[x].quantity - initialData[y].quantity
                        row = {
                            materialId:          planned.materials[x].material._id,
                            materialDescription: planned.materials[x].material.description,
                            planned:             planned.materials[x].quantity,
                            delivered:           initialData[y].quantity,
                            diff:                diff              
                        }

                    }
                    y++

                }
                if(!find) {
                    row = {
                        materialId:          planned.materials[x].material._id,
                        materialDescription: planned.materials[x].material.description,
                        planned:             planned.materials[x].quantity,
                        delivered:           0,
                        diff:                0              
                    }
                }

                report.push(row)
            }


            return report;

    //} catch (error) {
        throw Error("And Error occured while getting the report in getDiffWithPlannedList()", e);
    //}

}