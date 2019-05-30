const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getRoles', userController.getRoles);
router.get('/getRole/:user', userController.getRole);
router.get('/getCompanies', userController.getCompanies);
router.get('/getpopusers', userController.getPopulatedUsers);
router.get('/getuser/:id', userController.getUser);
router.get('/getusersbyproject/:id', userController.getPopulatedUsersByProject);
router.delete('/:id', userController.removeUser);
router.put('/', userController.updateUser);


module.exports = router;