const express = require('express');
const router = express.Router();
const dailyReportController = require('../app/api/controllers/dailyReport');

router.post('/create', dailyReportController.create);

module.exports = router;