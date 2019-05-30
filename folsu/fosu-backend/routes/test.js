const express = require('express');
const router = express.Router();
const testController = require('../app/api/controllers/test');

router.post('/create', testController.create);
router.post('/update', testController.update);

module.exports = router;