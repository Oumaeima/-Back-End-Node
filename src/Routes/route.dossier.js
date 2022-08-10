const express = require('express');
const router = express.Router();
const dossierController = require('../Controllers/dossier');
/***** dossier****/
router.get('/getDossierList', dossierController.getDossierList);
router.get('/getDossier', dossierController.getDossier);
router.post('/createNewDossier', dossierController.createDossier);
router.delete('/:id', dossierController.deletedossier);
router.put('/:id', dossierController.updateDossier);
router.get('/searchRecord/:nom', dossierController.searchDossier);
router.get('/AllDossier/:id', dossierController.getDossierByID);
router.get('/findAllMatricules', dossierController.findAllMatricule);
router.get('/findEmailDossier/:idclt', dossierController.findEmailSociete);
module.exports = router;