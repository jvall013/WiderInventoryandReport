const express = require('express');
const router = express.Router();
const projectController = require('../app/api/controllers/projects');

router.post('/create', projectController.create);
router.get('/getAllProjects', projectController.getAllprojects);
router.delete('/:id', projectController.removeproject);
router.put('/', projectController.updateproject)
router.get('/getpopprojects', projectController.getPopulatedProjects);
router.get('/getproject/:id', projectController.getPopulatedProject);
module.exports = router;