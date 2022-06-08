const { application } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');



/*****User ****/
router.get('/AllUser', userController.getUserList);
router.get('/:id', userController.getUserByID);
//router.get('/searchRecord/:nom', userController.getUserByName);
router.get('/searchUser/:mot', userController.searchUser);
router.post('/', userController.createNewUser);
router.put('/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/AllEmail', userController.getEmailList);
router.get('/AllEmailTechniciens', userController.getEmailTechnicienList);
router.get('/AllTechniciens', userController.getTechnicienList);
////router.get('/AllEmailSuperviseurs', userController.getEmailSuperviseursList);
router.get('/AllEmailCommercial', userController.getEmailCommercialList);
router.get('/AllEmailC', userController.getEmailC );
//router.get('/nbTicketsTech', userController.getNBticketsTech);
module.exports = router;
