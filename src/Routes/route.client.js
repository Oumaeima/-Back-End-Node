const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/client.contoller');


router.post('/', clientController.createNewClient);
router.get('/AllClient', clientController.getClientList);
router.get('/nbClient', clientController.getNbClient);
router.get('/AllClient/:id', clientController.getClientByID);
router.get('/getClient/:id', clientController.getEmailClientByID);
router.get('/getMatClient/:id', clientController.getMatClientByID);
router.get('/AllnomSociete', clientController.getnomSocieteList);
router.put('/updateClient/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.get('/searchRecord/:nom', clientController.searchClient);
router.get('/AllIntervention/:id', clientController.getIntParClient);
router.get('/getSignature/:id', clientController.getSignature);
module.exports = router;