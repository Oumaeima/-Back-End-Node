const ClientModel = require('../Models/client.model');
const nodemailer = require('nodemailer');

// get all user list
exports.getClientList = (req, res) => {
    //console.log('here all users list');
    ClientModel.getAllClient((err, clients) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Clients', clients);
        res.send(clients)
    })
}

// get all user list
exports.searchClient = (req, res) => {
    //console.log('here all users list');
    clients.searchClient(req.params.mot,(err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('user ', users);
        res.send(users)
    })
}

exports.createNewClient = (req, res) => {
    const clientReqData = new ClientModel(req.body);
    console.log('clientReqData', clientReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, msg: 'Please fill all fields' });
    } else {
        ClientModel.createClient(clientReqData, (err, client) => {
            if (err)
                res.send(err);
                
            res.json({ status: true, msg: 'Client Created Successfully', data: client.insertId })
        })
    }
}
exports.getClientByID = (req, res) => {
    //console.log('get emp by idu');
    ClientModel.getClientByID(req.params.id, (err, client) => {
        if (err)
            res.send(err);
        console.log('single client data', client);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify({ status: 200, error: null, response: client }));
    })
}
// update user
exports.updateClient = (req, res) => {
    const clientReqData = new ClientModel(req.body);
    console.log('clientReqData update', clientReqData);
    // check null
    
        ClientModel.updateClient(req.params.id, clientReqData, (err, client) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'client updated Successfully' })
        })
    
}

// delete user
exports.deleteClient = (req, res) => {
    ClientModel.delete_Client(req.params.id, (err, client) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'client deleted successully!' });
    })
}

exports.getnomSocieteList = (req, res) => {
    //console.log('here all users list');
    ClientModel.findAllnomSociete((err, clients) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Clients', clients);
        res.send(clients)
    })
}