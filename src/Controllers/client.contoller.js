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
exports.getIntParClient = (req, res) => {
    //console.log('here all users list');
    ClientModel.getIntParClient(req.params.id,(err, clients) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Clients', clients);
        res.send(clients)
    })
}

// get client signature
exports.getSignature = (req, res) => {
    //console.log('here all users list');
    ClientModel.getSignature(req.params.id,(err, signature) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Clients', signature);
        res.send(signature)
    })
}

// get all user list
exports.searchClient = (req, res) => {
    //console.log('here all users list');
    ClientModel.searchClient(req.params.mot,(err, users) => {
        console.log('found');
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
        res.send(client);
    })
}

exports.getEmailClientByID = (req, res) => {
    //console.log('get emp by idu');
    ClientModel.getEmailClientByID(req.params.id, (err, client) => {
        if (err)
            res.send(err);
        console.log('single client data', client);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify(client));
    })
}

exports.getMatClientByID = (req, res) => {
    //console.log('get emp by idu');
    ClientModel.getMatClientByID(req.params.id, (err, client) => {
        if (err)
            res.send(err);
        console.log('single client data', client);
        res.send(JSON.stringify(client));
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

// get number of clients
exports.getNbClient = (req, res) => {
    //console.log('here all users list');
    ClientModel.getNbClient((err, clients) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Clients', clients);
        res.send(clients)
    })
}