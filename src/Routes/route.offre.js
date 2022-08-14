const express = require('express');
const router = express.Router();
const offreController = require('../Controllers/offre.controller');

router.post('/addOffre/:id', offreController.index);
router.get('/getOffre/:id', offreController.getOffre);

module.exports = router