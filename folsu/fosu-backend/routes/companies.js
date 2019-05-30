const express = require('express');
const router = express.Router();
const companyController = require('../app/api/controllers/companies');

router.post('/create', companyController.create);
router.get('/getAllcompanies', companyController.getAllcompanies);
router.delete('/:id', companyController.removecompany);
router.put('/', companyController.updatecompany)
module.exports = router;