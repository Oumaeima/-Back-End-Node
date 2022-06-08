const dossier = require('../Models/dossier');
var dbConn = require('../../Config/db.config');
process.env.SECRET_KEY = 'secret'
const jwt = require("jsonWebToken");
const nodemailer = require('nodemailer');
/*****Creation dossiers *****/
// create new admin
exports.createDossier = (req, res) => {
    const dos = new dossier(req.body);
    console.log('dossierReqData', dos);
    dossier.createDossier(dos, (err, dos) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'dossier Created Successfully' })
            //res.send(user)
        }
        
    })

   
}

exports.findEmailSociete = (req, res) => {
    //console.log('here all user list');
    dossier.findEmailSociete(req.params.idclt, (err, users) => {
        console.log('List of email ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('clients', users);
            res.send(users)
        }
    })
}
// liste of clients 
exports.getDossierList = (req, res) => {
    //console.log('here all users list');
    dossier.getAllDossier((err, dossiers) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('dossier', dossiers);
        res.send(dossiers)
    })
}
exports.findAllMatricule = (req, res) => {
    //console.log('here all user list');
    dossier.findAllMatricule((err, matricules) => {
        console.log('List of mat  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('matricules ', matricules);
            res.send(matricules)
        }
    })
}


// update user
exports.updateDossier = (req, res) => {
    const userReqData = new dossier(req.body);
    console.log('userReqData update', userReqData);
    dossier.updateDossier(req.params.idc, userReqData, (err, user) => {
        if (err)
            res.send(err);
        res.json({ status: true, message: 'dossier updated Successfully' })
    })
}
// delete user
exports.deletedossier = (req, res) => {
    dossier.delete_Dossier(req.params.id, (err, user) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'dossier deleted successully!' });
    })
}

/* trouver tous les dossiers par société (de chaque societe ) ***/

exports.findDossiersSociete = (req, res) => {
    //console.log('here all user list');
    dossier.findAllDossierSociete(req.params.idclt, (err, users) => {
        console.log('List of dossiers  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('clients', users);
            res.send(users)
        }
    })
}
// get all user list
exports.searchDossier = (req, res) => {
    //console.log('here all users list');
    dossier.searchDossier(req.params.mot,(err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('tickets ', users);
        res.send(users)
    })
}
exports.getDossierByID = (req, res) => {
    //console.log('get emp by idu');
    dossier.getDossierById(req.params.id, (err, dossier) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log('Dossier', dossier);
            res.send( JSON.stringify({ status: 200, error: null, response: dossier }) );
        }
    })
  
}

exports.findClientsDossiers = (req, res) => {
    //console.log('here all user list');
    dossier.findclientsdossier((err, users) => {
        console.log('List of dossiers  ');
        if (err) {
            res.send(err);
        }
        else {
            console.log('clients', users);
            res.send(users)
        }
    })
}