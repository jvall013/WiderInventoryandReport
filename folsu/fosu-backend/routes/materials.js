const express = require('express');
const router = express.Router();
const materialController = require('../app/api/controllers/materials');

router.post('/create', materialController.create);
router.get('/getAll', materialController.getAll);
router.delete('/:id', materialController.remove);
router.put('/', materialController.update)
module.exports = router;