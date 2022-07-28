const ticket = require('../Models/ticket');
var dbConn = require('../../Config/db.config');
process.env.SECRET_KEY = 'secret'
const jwt = require("jsonWebToken");

/*****Creation tickets *****/
// create new ticket
exports.createTicketClient = (req, res) => {
    const tic = new ticket(req.body);
    console.log('userReqData', tic);
    ticket.createTicketClient(req.params.id, tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.send(tic)
        }
    })
}


// liste of tickets  
exports.findTicket = (req, res) => {
    ticket.findTicket((err, tickets) => {
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

// liste of tickets  
exports.CountTicketStateExpediteur = (req, res) => {
    ticket.CountTicketsStateExpediteur((err, nb) => {
        console.log('Number of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log("nombre de tickets ", nb);
            res.send(nb)
        }
    })
}

// liste of tickets  
exports.CountTicketInterventionStateExpediteur = (req, res) => {
    ticket.CountTicketsIntervenionStateExpediteur((err, nb) => {
        console.log('Number of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log("nombre de tickets d intervention  ", nb);
            res.send(nb)
        }
    })
}

exports.searchtic = (req, res) => {
    //console.log('here all users list');
    ticket.searchtic(req.params.mot,(err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('user ', users);
        res.send(users)
    })
}

// delete ticket


exports.deleteTicketInt = (req, res) => {
    ticket.delete_TicketInt(req.params.id, (err, client) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'ticket deleted successully!' });
    })
}
// get ticket by matricule 
exports.getTicketByNom = (req, res) => {
    //console.log('get emp by id');
    ticket.getTicketByNom(req.params.nom, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single ticket data', tickets);
        res.send(tickets);
    })
}
// get ticket by id

exports.getTicketByID = (req, res) => {
    //console.log('get emp by idu');
    ticket.getTicketById(req.params.id, (err, tickets) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log('Tickets', tickets);
            res.send( tickets );
        }
    })
  
}
exports.getTicketTaches = (req, res) => {
    //console.log('get emp by idu');
    ticket.getTicketTaches(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}
exports.getnbTicketEnCours = (req, res) => {
    //console.log('get emp by idu');
    ticket.getnbEnCours( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( tickets);
    })
}
exports.getnbTicketPartOrderEnCours = (req, res) => {
    //console.log('get emp by idu');
    ticket.getnbEnPartOrderCours( (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send( tickets);
    })
}
exports.getTicketByIDTech = (req, res) => {
    //console.log('get emp by idu');
    ticket.getTicketByIdTech(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        // res.json({"first_name":"Dheeraj"});
        res.send(tickets);
    })
}
exports.updateTicket= (req, res) => {
    const ticketReqData = new ticket(req.body);
    console.log('TicketReqData update', ticketReqData);
    // check null
    
        ticket.updateTicketI(req.params.id, ticketReqData, (err, ticket) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'ticket updated Successfully' })
        })
    
}

// update ticket owner
exports.updateOwnerTicketInt= (req, res) => {
    const ticketReqData = new ticket(req.body);
    console.log('TicketReqData update', ticketReqData);
    // check null
    
        ticket.updateOwnerTicketInt(req.params.idti, ticketReqData, (err, ticket) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'ticket updated Successfully' })
        })
    
}


// update status to clos ticket intervention
exports.updateStatClos= (req, res) => {
    
    ticket.updateStatClos(req.params.id, (err, ticket) => {
        if (err)
            res.send(err);
        res.json({ status: true, message: 'ticket updated Successfully' })
    })

}

exports.getTicketByTech = (req, res) => {
 
    ticket.getTicketByTech(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}

exports.getTicketByIDI = (req, res) => {
 
    ticket.getTicketByIdInt(req.params.id, (err, tickets) => {
        if (err)
            res.send(err);
        console.log('single user data', tickets);
        
        res.send( JSON.stringify({ status: 200, error: null, response:tickets}) );
    })
}

// update ticket to state en cours By technicien
exports.updateetatToEnCours = (req, res) => {
    const userReqData = new ticket(req.body);
    console.log('userReqData update', userReqData);
    ticket.updateStateInterventionToEnCours(req.params.idti, userReqData, (err, user) => {
        if (err)
            res.send(err);
        res.json({ status: true, message: 'ticket  updated Successfully' })
        console.log(user);
    })
}

// update ticket to state resolu by superviseur
exports.updateetatToResolu = (req, res) => {
    const userReqData = new ticket(req.body);
    console.log('userReqData update', userReqData);
    ticket.updateStateInterventionResolu(req.params.idti, userReqData, (err, user) => {
        if (err)
            res.send(err);
        res.json({ status: true, message: 'ticket  updated Successfully' })
        console.log(user);
    })
}

// update ticket to state clos by client 
exports.updateetatToClos= (req, res) => {
    const userReqData = new ticket(req.body);
    console.log('userReqData update', userReqData);
    ticket.updateStateInterventionClos(req.params.idti, userReqData, (err, user) => {
        if (err)
            res.send(err);
        res.json({ status: true, message: 'ticket  updated Successfully' })
        console.log(user);
    })
}
exports.findAllInterventionToTechnicien = (req, res) => {
    ticket.findAllTicketInterventionToTechnicien(req.params.idu,req.params.role,(err, tickets) => {
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
exports.findAllInterventionToClient = (req, res) => {
    ticket.findAllTicketInterventionToClient(req.params.idti,(err, tickets) => {
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

exports.findTicketEnCours= (req, res) => {
    ticket.FindTicketEncours(req.params.idti,(err, tickets) => {
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
exports.findAllTicketsInterventionRetard = (req, res) => {
    ticket.findAllTicketInterventionEnRetard((err, tickets) => {
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

exports.findAllTicketsInterventionClos = (req, res) => {
    ticket.findAllTicketInterventionClos((err, tickets) => {
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
exports.findAllTicketsInterventionNouveau = (req, res) => {
    ticket.findAllTicketInterventionNouveau((err, tickets) => {
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
exports.findAllTicketsInterventionEnCours = (req, res) => {
    ticket.findAllTicketsInterventionEnCours((err, tickets) => {
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
exports.findAllTicketsInterventionResolu = (req, res) => {
    ticket.findAllTicketInterventionRésolu((err, tickets) => {
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

exports.getNBticketsTech = (req, res) => {
    //console.log('here all users list');
    ticket.getNumTickTech((err, nb) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('nb ', nb);
        res.send(nb)
    })
}


exports.CountTicketsClientEnCours= (req, res) => {
    ticket.CountTicketsClientEnCours( (err, ticket) => {
        if (err)
        res.send(err);
        console.log('single user data', ticket);
        // res.json({"first_name":"Dheeraj"});
        res.send( ticket);
      
    })
}
exports.CountTicketsIntervenionEnCours= (req, res) => {
    ticket.CountTicketsIntervenionEnCours( (err, tickets) => {
        if (err)
        res.send(err);
    console.log('single user data', tickets);
    // res.json({"first_name":"Dheeraj"});
    res.send( tickets);
      
    })
}


exports.CountTicketInterventionClos = (req, res) => {

    ticket.CountTicketsInterventionClos( (err, tickets) => {
        if (err)
        res.send(err);
    console.log('single user data', tickets);
    // res.json({"first_name":"Dheeraj"});
    res.send( tickets);
    })
}
exports.CountTicketInterventionRetard = (req, res) => {

    ticket.CountTicketsInterventionRetard( (err, tickets) => {
        if (err)
        res.send(err);
    console.log('single user data', tickets);
    // res.json({"first_name":"Dheeraj"});
    res.send( tickets);
    })
}
exports.nbTicketsClientEnCours = (req, res) => {
    ticket.nbTicketsClientEnCours(req.params.idclt,(err, tickets) => {
        if (err)
        res.send(err);
    console.log('single user data', tickets);
    // res.json({"first_name":"Dheeraj"});
    res.send( tickets);
    })
    
}
exports.nbTicketsPOClientEnCours = (req, res) => {
    ticket.nbTicketsPOClientEnCours(req.params.idclt,(err, tickets) => {
        if (err)
        res.send(err);
    console.log('single user data', tickets);
    // res.json({"first_name":"Dheeraj"});
    res.send( tickets);
    })
    
}
exports.getListTechAffectes= (req, res) => {
    
    
    ticket.getListTechAffectes(req.params.idti, (err, ticket) => {
        if (err)
            res.send(err);
        console.log('single user data', ticket);
        
        res.send( ticket);
    
      
    })
}
exports.getListSupAffectes= (req, res) => {
    
    
    ticket.getListSupAffectes(req.params.idti, (err, ticket) => {
        if (err)
            res.send(err);
        console.log('single user data', ticket);
        
        res.send( ticket);
    })
}

exports.deleteTechAff = (req, res) => {
    ticket.delete_TechAff(req.params.idti,req.params.idu, (err, client) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'ticket deleted successully!' });
    })
}