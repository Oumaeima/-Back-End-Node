const { application } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');



/*****User ****/
router.get('/AllUser', userController.getUserList);
router.get('/AllCommercial', userController.getCommercialList);
router.get('/:id', userController.getUserByID);
//router.get('/searchRecord/:nom', userController.getUserByName);
router.get('/searchUser/:mot', userController.searchUser);
router.post('/', userController.createNewUser);
router.put('/:id', userController.updateUser);
router.put('/updateCommercial/:id', userController.updateCommercial);
router.delete('/delete/:id', userController.deleteUser);
router.get('/AllEmail', userController.getEmailList);
router.get('/AllEmailTechniciens', userController.getEmailTechnicienList);
router.get('/AllTechniciens', userController.getTechnicienList);
////router.get('/AllEmailSuperviseurs', userController.getEmailSuperviseursList);
router.get('/AllEmailCommercial', userController.getEmailCommercialList);
router.get('/AllEmailC', userController.getEmailC );
router.get('/users', userController.send );
router.get('/updateProfile', userController.updateUser);
//router.get('/nbTicketsTech', userController.getNBticketsTech);
module.exports = router;
