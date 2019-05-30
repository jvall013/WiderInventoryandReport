var ReportService = require('../services/reports');


module.exports = {
    getDeliveredMaterialsByProject: async function(req, res, next){

        try{
        
            var report = await ReportService.getDeliveredMaterialsByProject(req.params);
            return res.status(200).json({status: 200, data: report, message: "Succesfully Received Report"});
            
        }catch(e){
    
            return res.status(400).json({status: 400, message: e.message});
            
        }
    },
    getDiffWithPlanned: async function(req, res, next) {

        var report = await ReportService.getDiffWithPlannedList(req.params);
        return res.status(200).json({status: 200, data: report, message: "Succesfully Received Report"});
/*
        try{
        
            var report = await ReportService.getDiffWithPlannedList(req.params);
            return res.status(200).json({status: 200, data: report, message: "Succesfully Received Report"});
            
        }catch(e){
    
            return res.status(400).json({status: 400, message: e.message});
            
        }*/
    }
}