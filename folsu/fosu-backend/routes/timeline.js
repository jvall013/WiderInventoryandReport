const express = require('express');
const router = express.Router();
const timelineController = require('../app/api/controllers/timelines');

router.post('/create', timelineController.create);
router.post('/addactivity', timelineController.addActivity);
router.post('/deleteactivity', timelineController.deleteActivity);
router.get('/:id', timelineController.getByProject);
router.get('/getactivitiesbyfloor/:id', timelineController.getActivitiesByFloor);
router.delete('/:id', timelineController.remove);
router.put('/', timelineController.update)
module.exports = router;