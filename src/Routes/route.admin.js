const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin.controller');


router.post('/createNewAdmin', adminController.createNewAdmin);
router.get('/AllAdmin', adminController.getAdminList);
router.put('/:id', adminController.updateAdmin);
router.put('/updatePassAdmin/:ida', adminController.updateAdminPassword);
router.get('/AllAdmin/:id',adminController.getAdminByID);
router.delete('/:id', adminController.delete_Admin);
router.get('/searchad/:mot', adminController.searchadmin);
module.exports = router;
