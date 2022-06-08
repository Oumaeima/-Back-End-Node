const express = require('express');
const router = express.Router();
const dossierController = require('../Controllers/dossier');
/***** dossier****/
router.get('/getDossierList', dossierController.getDossierList);
router.post('/createNewDossier', dossierController.createDossier);
router.put('/:id', dossierController.updateDossier);
router.delete('/:id', dossierController.deletedossier);
router.get('/searchRecord/:nom', dossierController.searchDossier);
router.get('/AllDossier/:id', dossierController.getDossierByID);
router.get('/findAllMatricules', dossierController.findAllMatricule);
router.get('/findEmailDossier/:idclt', dossierController.findEmailSociete);
module.exports = router;