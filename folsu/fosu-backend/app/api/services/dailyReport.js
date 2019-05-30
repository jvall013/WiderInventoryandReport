// Gettign the Newly created Mongoose Model we just created 
var dailyReport = require('../models/dailyReport')

// Saving the context of this module inside the _the variable
_this = this

exports.create = async function(data) {

    try {
        var res = await dailyReport.create({project: data.project, 
                                         reportedAt: data.reportedAt,
                                          createdAt: data.createdAt,
                                          createdBy: data.createdBy,
                                         activities: data.activities,
                                              hours: data.hours })

            return res
    
    } catch (e){
        throw Error('Error while adding Daily Report: ' + e)
    }

}

