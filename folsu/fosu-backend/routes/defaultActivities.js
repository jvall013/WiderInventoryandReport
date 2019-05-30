const express = require('express');
const router = express.Router();
const defaultActivityController = require('../app/api/controllers/defaultActivities');

router.post('/create', defaultActivityController.create);
router.get('/getAll', defaultActivityController.getAll);
router.delete('/:id', defaultActivityController.remove);
router.put('/', defaultActivityController.update)
module.exports = router;