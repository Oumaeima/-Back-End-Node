const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/client.contoller');


router.post('/', clientController.createNewClient);
router.get('/AllClient', clientController.getClientList);
router.get('/AllClient/:id', clientController.getClientByID);
router.get('/AllnomSociete', clientController.getnomSocieteList);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.get('/searchRecord/:nom', clientController.searchClient);
module.exports = router;