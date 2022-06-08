const ticket = require('../Models/ticket');
const ticketTech = require('../Models/ticket-technicien');
var dbConn = require('../../Config/db.config');
process.env.SECRET_KEY = 'secret'
const jwt = require("jsonWebToken");

/*****Creation tickets *****/
// create new ticket
exports.affecterTicketTechniciens = (req, res) =>  {
    const tic = new ticketTech(req.body);
    console.log('userReqData', tic);
    ticketTech.affecterticketTechniciens(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affectée Successfully' })
            res.send(ticket)
        }
    })
}
// get all user list

