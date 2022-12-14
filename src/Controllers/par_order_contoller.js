const partOrder = require('../Models/par_order');
var dbConn = require('../../Config/db.config');
process.env.SECRET_KEY = 'secret'
const jwt = require("jsonWebToken");


/*****Creation tickets *****/
// create new ticket
exports.createTicketPartOrder = (req, res) => {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.createPartOrder(req.params.id, tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket Created Successfully' })
            res.send(ticket)
        }
    })
}
exports.deleteTicketPO = (req, res) => {
    partOrder.delete_TicketPO(req.params.id, (err, client) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'ticket Supprimer avec succes!' });
    })
}
// modifier ticket
exports.updateTicketPO= (req, res) => {
    const ticketReqData = new partOrder(req.body);
    console.log('TicketReqData update', ticketReqData);
    
        partOrder.updateTicketPO(req.params.id, ticketReqData, (err, ticket) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'ticket updated Successfully' })
        })
}
// fermer ticket par le client
exports.fermerTicketPO= (req, res) => {
       
        partOrder.fermerTicketPO(req.params.id, (err, ticket) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'ticket updated Successfully' })
        })
}

exports.getTicketByIDPO = (req, res) => {
    partOrder.getTicketByIdPO(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}
// get ticket by commercial
exports.getTicketByComm = (req, res) => {
    partOrder.getTicketByComm(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}

// get ticket by id client
exports.getTicketByClient = (req, res) => {
 
    partOrder.getTicketByClient(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}

// liste of tickets par id  
exports.findTicketID = (req, res) => {
    partOrder.findAllTicketPartOrderID(req.params.id,(err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( tickets );
        }
    })
}
exports.findemailCom = (req, res) => {
    partOrder.findAllComEmail((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( tickets );
        }
    })
}
exports.findemailTech = (req, res) => {
    partOrder.findAllTechEmail((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( tickets );
        }
    })
}
exports.findemailSup= (req, res) => {
    partOrder.findAllSupEmail((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( tickets );
        }
    })
}
exports.findTicketIDCom = (req, res) => {
    partOrder.findAllTicketPartOrderIDCom(req.params.id,(err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( tickets );
        }
    })
}
exports.findTicketDetailID = (req, res) => {
    partOrder.findAllTicketPartOrderDetailID(req.params.id,(err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( JSON.stringify({ status: 200, error: null, response:tickets }));
        }
    })
}

// liste of tickets  
exports.findTicket = (req, res) => {
    partOrder.findAllTicketPartOrder((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}
exports.findAllTicketsPartOrderToClient = (req, res) => {
    partOrder.findAllTicketPartOrderToClient(req.params.idclt,(err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}
exports.findAllTicketsPartOrderToadmin = (req, res) => {
    partOrder.findAllTicketPartOrderToAdmin((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}
exports.editStatePiece = (req, res) =>  {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.editStatePiece(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
            res.send(ticket)
        }
    })
}
exports.affecterTicketCommercial = (req, res) =>  {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.affecterticketCommercial(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
            res.send(ticket)
        }
    })
}

// get all user list
exports.searchtic = (req, res) => {
    //console.log('here all users list');
    partOrder.searchtic(req.params.mot,(err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('tickets ', users);
        res.send(users)
    })
}



exports.envoyerOffre = (req, res) =>  {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.envoyerOffre(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
            res.send(ticket)
        }
    })
}

exports.passerCommande = (req, res) =>  {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.passerCommande(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
            res.send(ticket)
        }
    })
}

exports.fermerTicketClient = (req, res) =>  {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.fermerTicketClient(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
            res.send(ticket)
        }
    })
}

exports.fermerTicketCommercial = (req, res) =>  {
    const tic = new partOrder(req.body);
    console.log('userReqData', tic);
    partOrder.fermerTicketCommercial(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
            res.send(ticket)
        }
    })
}



exports.findAllTicketsPartOrderNouveau = (req, res) => {
    partOrder.findAllTicketPartOrderNouveau((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}
exports.findAllTicketsPartOrderEnCours = (req, res) => {
    partOrder.findAllTicketPartOrderEnCours((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}
exports.findAllTicketsPartOrderResolu= (req, res) => {
    partOrder.findAllTicketPartOrderResolu((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}
exports.findAllTicketsPartOrderClos = (req, res) => {
    partOrder.findAllTicketPartOrderClos((err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}

exports.EtatPiece= (req, res) => {
    partOrder.EtatPiece(req.params.id,(err, tickets) => {
        console.log('List of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send(tickets)
        }
    })
}

exports.CountTicketPartOrderEnCours = (req, res) => {

    partOrder.CountTicketsPartOrderEnCours( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}

exports.CountTicketPartOrder = (req, res) => {

    partOrder.CountTicketsPartOrder( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( tickets);
    })
}
exports.CountTicketPartOrder2 = (req, res) => {

    partOrder.CountTicketsPartOrder2( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( tickets);
    })
}
exports.CountTicketPartOrder3 = (req, res) => {

    partOrder.CountTicketsPartOrder3( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( tickets);
    })
}
exports.CountTicketPartOrder4 = (req, res) => {

    partOrder.CountTicketsPartOrder4( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( tickets);
    })
}

// modifier etat en "Commande confirm??e" par le commercial
exports.updateEtatTicketPO = (req, res) =>  {
   
    partOrder.updateEtatTicketPO(req.params.id, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
        }
    })
}

// modifier etat en "Chez l'exp??diteur" par le commercial
exports.updateState2TicketPO = (req, res) =>  {
   
    partOrder.updateState2TicketPO(req.params.id, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
        }
    })
}

// modifier etat en "En route" par le commercial
exports.updateState3TicketPO = (req, res) =>  {
    partOrder.updateState3TicketPO(req.params.id, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
        }
    })
}

// modifier etat en "Livr??e" par le commercial
exports.updateState4TicketPO = (req, res) =>  {
    partOrder.updateState4TicketPO(req.params.id, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affect??e Successfully' })
        }
    })
}

// ajouter offre
exports.addOffre= (req, res) => {
    const ticketReqData = new partOrder(req.body);
    console.log('TicketReqData update', ticketReqData);
    
        partOrder.addOffre(req.params.id, ticketReqData, (err, ticket) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'ticket updated Successfully' })
        })
}

//get ticket by id dossier
exports.getTicketByDossier = (req, res) => {
    partOrder.getTicketByDossier(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}

// count ticket by id client
exports.countTicketByClient = (req, res) => {
    partOrder.countTicketByClient(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count ticket by status
exports.countTicketByStatus = (req, res) => {
    partOrder.countTicketByStatus(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count ticket by status "en cours"
exports.countEncoursPOTicket = (req, res) => {
    partOrder.countEncoursPOTicket(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count ticket by status "nouveau"
exports.countNouveauPOTicket = (req, res) => {
    partOrder.countNouveauPOTicket(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count all ticket by commercial
exports.CountTicketByComm = (req, res) => {
    partOrder.countTicketByComm(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count en cours ticket by commercial
exports.CountEnCoursTicketByComm = (req, res) => {
    partOrder.countEnCoursTicketByComm(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count livr??e ticket by commercial
exports.CountTicketLivreeByComm = (req, res) => {
    partOrder.countTicketLivreeByComm(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}

// count nouveau ticket by commercial
exports.CountTicketNouveauByComm = (req, res) => {
    partOrder.countTicketNouveauByComm(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send(tickets);
    })
}



