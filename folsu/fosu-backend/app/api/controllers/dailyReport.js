var DailyReportService  = require('../services/dailyReport');

module.exports = {
 create: async function(req, res, next) {

    console.log(req.body)

    try{
        var report = await DailyReportService.create(req.body);
        return res.send({ status:200, data: report, message: "Succesfully Daily Report Created"});
    }catch(e){
        return res.send({status: 500, message: e.message});
    }
}





}