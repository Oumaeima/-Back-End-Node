const ticket = require('../Models/ticket');
const ticketSup = require('../Models/ticket-superviseur');
var dbConn = require('../../Config/db.config');
process.env.SECRET_KEY = 'secret'
const jwt = require("jsonWebToken");

/*****Creation tickets *****/
// create new ticket
exports.affecterTicketSuperviseurs = (req, res) =>  {
    const tic = new ticketSup(req.body);
    console.log('userReqData', tic);
    ticketSup.affecterticketSuperviseur(req.params.idti,tic, (err, tic) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'ticket affectée Successfully' })
            res.send(ticket)
        }
    })
}
// get all user list
exports.getEmailSuperviseursList = (req, res) => {
    //console.log('here all users list');
    UserModel.getAllEmailSuperviseurs((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('email Superviseurs ', users);
        res.send(users)
    })
}