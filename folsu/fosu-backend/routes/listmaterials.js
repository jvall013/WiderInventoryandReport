const express = require('express');
const router = express.Router();
const ListMaterialController = require('../app/api/controllers/listMaterials');

router.post('/addItem', ListMaterialController.addItem);
router.get('/getAll', ListMaterialController.getAll);
router.get('/getByProject/:id', ListMaterialController.getByProject);
router.get('/getnummaterials/:id', ListMaterialController.getNumMaterials);
router.post('/removeItem', ListMaterialController.removeItem);
router.post('/updateMaterials', ListMaterialController.updateMaterials);
router.put('/', ListMaterialController.update);
router.get('/getByShipment/:id', ListMaterialController.getByShipment);
router.get('/getByPacking/:id', ListMaterialController.getByPacking);
router.get('/getlistmaterialbyid/:id', ListMaterialController.getListMaterialById );
module.exports = router;