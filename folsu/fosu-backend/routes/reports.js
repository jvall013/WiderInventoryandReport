const express = require('express');
const router = express.Router();
const reportController = require('../app/api/controllers/reports');

router.get('/getDelivered/:id', reportController.getDeliveredMaterialsByProject);
router.get('/getdiffwithplanned/:id', reportController.getDiffWithPlanned);

module.exports = router;