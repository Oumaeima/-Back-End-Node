const express = require('express');
const router = express.Router();
const ticketController = require('../Controllers/ticket.controller');
const offsiteContoller =require('../Controllers/offsite.contoller');
const tickettechnicienController = require('../Controllers/ticket_technicien');
const ticketsuperviceurController = require('../Controllers/ticket_Superviseur');
const technicienstachesController = require ('../Controllers/tech_taches_controller');
const parOrderController = require('../Controllers/par_order_contoller');

//ticket intervention
router.post('/createNewTicket/:id', ticketController.createTicketClient);
router.get('/AllTicket', ticketController.findTicket);
router.get('/Ticket_par_dossier/:id', ticketController.getTicketByNom);
router.get('/TicketTaches/:id', ticketController.getTicketTaches);
router.get('/TicketEnCour', ticketController.getnbTicketEnCours);
router.get('/TicketPartOrderEnCour', ticketController.getnbTicketPartOrderEnCours);
router.get('/AllTicketInt/:id', ticketController.getTicketByIDI);
router.get('/Ticket_doss/:id', ticketController.getTicketByID);
router.get('/AllTicketTech/:id', ticketController.getTicketByIDTech);
router.get('/AllInterventionEnCoursClient/:id', ticketController.findAllInterventionToClient);
router.delete('/ticketINT/:id', ticketController.deleteTicketInt);
router.get('/searchRecord/:mot', ticketController.searchtic);
router.get('/getIntByTech/:id', ticketController.getTicketByTech);
router.get('/AllIntervetionToTechnicien/:idu/:role', ticketController.findAllInterventionToTechnicien);
router.put('/updateetatToClos/:idti', ticketController.updateetatToClos);
router.put('/affecteTech/:idti', ticketController.updateOwnerTicketInt);
router.get('/AllInterventionRetard', ticketController.findAllTicketsInterventionRetard);
router.get('/AllPartOrderNouveau', ticketController.findAllTicketsInterventionNouveau);
router.get('/AllPartOrderEnCours', ticketController.findAllTicketsInterventionEnCours);
router.get('/AllPartOrderResolu', ticketController.findAllTicketsInterventionResolu);
router.get('/AllPartOrderClos', ticketController.findAllTicketsInterventionClos);
router.get('/findTicketEnCours/:idti',ticketController.findTicketEnCours);
router.get('/nbTicketsTechnicienEnCours', ticketController.getNBticketsTech);
router.get('/CountTicketsClientEnCours', ticketController.CountTicketsClientEnCours);

router.get('/nbTicketsInterventionEnCours', ticketController.CountTicketsIntervenionEnCours);
router.get('/nbTicketsInterventionClos', ticketController.CountTicketInterventionClos);
router.get('/nbTicketsInterventionRetard', ticketController.CountTicketInterventionRetard);
router.put('/updateTicket/:id',ticketController.updateTicket);

router.put('/updateTicketPO/:id', parOrderController.updateTicketPO);
router.put('/fermerTicketPO/:id', parOrderController.fermerTicketPO);
router.delete('/deleteTechAff/:idu/:idti', ticketController.deleteTechAff);


//Ticket-offsite
router.post('/createOffSite', offsiteContoller.createTicketAdmin);
router.get('/AllticketsoffSite',offsiteContoller.AllTicketoffSite);
router.delete('/deleteTicketOffSite/:idticket', offsiteContoller.deleteTicketOffSite);
router.get('/NumberticketsoffSiteStatecree',offsiteContoller.CountTicketoffSiteStatecree);
router.get('/NumberticketsoffSite', offsiteContoller.CountTicketoffSite);

//affectation technicien
router.post('/affecterTicketTechnciens/:idti', tickettechnicienController.affecterTicketTechniciens);
router.post('/affecterTicketSuperviseur/:idti', ticketsuperviceurController.affecterTicketSuperviseurs);
// affectation_taches
router.post('/tachesrealisees/:idti', technicienstachesController.tachesRealisees);

//update etat ticket
router.put('/updateStateResolu/:idti', ticketController.updateStateResolu);
router.put('/updateToResolu/:idti', ticketController.updateetatToResolu);
router.put('/updateToClos/:idti', ticketController.updateetatToClos);

// creation ticket Par Order
router.post('/createpartOrder/:id', parOrderController.createTicketPartOrder);
router.delete('/ticketPO/:id', parOrderController.deleteTicketPO);
router.get('/ticketD/:id',parOrderController.getTicketByDossier);
router.get('/nbTicketsPartOrderEnCours',parOrderController.CountTicketPartOrderEnCours);
router.get('/AllTicketOrder',  parOrderController.findTicket);
router.get('/AllTicketPO/:id',  parOrderController.getTicketByIDPO);
router.get('/getTicketCom/:id',  parOrderController.getTicketByComm);
router.get('/getTicket/:id',  parOrderController.getTicketByClient);
router.get('/AllTicketOrder/:id',  parOrderController.findTicketID);
router.get('/AllTicketOrderCom/:id',  parOrderController.findTicketIDCom);
router.get('/AllTicketOrderDetail/:id',  parOrderController.findTicketDetailID);
router.get('/AllPartOrderToClient/:idclt', parOrderController.findAllTicketsPartOrderToClient);
router.get('/AllPartOrderToAdmin', parOrderController.findAllTicketsPartOrderToadmin);
router.put('/editStatePiecePartOrder/:idti',parOrderController.editStatePiece);
router.put('/affecterTicketCommercial/:idti',parOrderController.affecterTicketCommercial);
router.get('/searchticPartOrder/:mot', parOrderController.searchtic);
router.put('/envoyerOffre/:idti', parOrderController.envoyerOffre);
router.put('/passerCommande/:idti', parOrderController.passerCommande);
router.put('/fermerticketClient/:idti', parOrderController.fermerTicketClient);
router.put('/fermerticketCommercial/:idti', parOrderController.fermerTicketCommercial);
router.get('/AllPartOrderNouveau', parOrderController.findAllTicketsPartOrderNouveau);
router.get('/AllPartOrderEnCours', parOrderController.findAllTicketsPartOrderEnCours);
router.get('/AllPartOrderResolu', parOrderController.findAllTicketsPartOrderResolu);
router.get('/AllPartOrderClos', parOrderController.findAllTicketsPartOrderClos);
router.get('/EtatPiece/:id', parOrderController.EtatPiece);
router.put('/updateEtatTicket/:id', parOrderController.updateEtatTicketPO);
router.put('/updateState2TicketPO/:id', parOrderController.updateState2TicketPO);
router.put('/updateState3TicketPO/:id', parOrderController.updateState3TicketPO);
router.put('/updateState4TicketPO/:id', parOrderController.updateState4TicketPO);
router.put('/addOffre/:id', parOrderController.addOffre);
//get All Tiket Tech ou Sup 
router.get('/AllEmailCom', parOrderController.findemailCom);
router.get('/AllEmailTech', parOrderController.findemailTech);
router.get('/AllEmailSup', parOrderController.findemailSup);

router.get('/nbicketsClientEnCours/:idclt', ticketController.nbTicketsClientEnCours);
router.get('/nbicketsPOClientEnCours/:idclt', ticketController.nbTicketsPOClientEnCours);
router.get('/nbicketsPOClientRetard/:idclt', ticketController.nbTicketsPOClientEnCours);


router.get('/getListTechAffectes/:idti', ticketController.getListTechAffectes);
router.get('/getListSupAffectes/:idti',ticketController.getListSupAffectes);

router.put('/updateStat/:id',ticketController.updateStatClos);


module.exports = router;
