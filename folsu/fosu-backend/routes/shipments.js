const express = require('express');
const router = express.Router();
const shipmentController = require('../app/api/controllers/shipments');

router.post('/create', shipmentController.create);
router.post('/update', shipmentController.update);
router.get('/getAllshipments', shipmentController.getAllshipments);
router.delete('/:id', shipmentController.removeshipment);
router.put('/', shipmentController.updateshipment)
router.get('/getpopshipments', shipmentController.getPopulatedshipments);
router.get('/getshipment/:id', shipmentController.getShipment);
router.get('/getshipmentwithlist/:id', shipmentController.getShipmentWithList);
router.get('/getpackingwithlist/:id', shipmentController.getPackingWithList);
router.get('/getprojectshipments', shipmentController.getProjectShipments);
router.get('/getlastshipments/:id', shipmentController.getLastShipments);
router.get('/getlastpackings/:id', shipmentController.getLastPackings);
router.get('/validorder/:id/:type', shipmentController.validOrder);
router.get('/generatepunch/:order', shipmentController.generatePunch);
module.exports = router;