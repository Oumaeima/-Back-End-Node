const offSite = require('../Models/offsite');
var dbConn = require('../../Config/db.config');
process.env.SECRET_KEY = 'secret'
const jwt = require("jsonWebToken");

/*****Creation tickets *****/
// create new ticket
exports.createTicketAdmin = (req, res) => {
    const tic = new offSite(req.body);
    console.log('userReqData', tic);
    offSite.createTicketAdmin(tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket offSite Created Successfully' })
            res.send(ticket)
        }
    })
}
// liste of tickets  
exports.AllTicketoffSite = (req, res) => {
    offSite.findAllTicketOffSite((err, tickets) => {
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

// delete user
exports.deleteTicketOffSite = (req, res) => {
    offSite.deleteTicketOffSite(req.params.idti, (err, tick) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'ticket deleted successully!' });
    })
}


// liste of tickets  
exports.CountTicketoffSiteStatecree = (req, res) => {
    offSite.CountTicketoffSiteStatecree((err, nb) => {
        console.log('Number of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log("nombre de tickets with state <crée>", nb);
            res.send(nb)
        }
    })
}

// liste of tickets  
exports.CountTicketoffSite = (req, res) => {
    offSite.CountTicketsoffSite((err, nb) => {
        console.log('Number of tickets  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log("nombre de tickets offSite  ", nb);
            res.send(nb)
        }
    })
}