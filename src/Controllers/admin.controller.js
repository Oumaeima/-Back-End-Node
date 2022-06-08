const AdminModel = require('../Models/admin');
const nodemailer = require('nodemailer');

// get all admin list
exports.getAdminList = (req, res) => {
    //console.log('here all users list');
    AdminModel.getAllAdmin((err, admin) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Admin', admin);
        res.send(admin)
    })
}

exports.createNewAdmin = (req, res) => {
    const dos = new AdminModel(req.body);
    console.log('userReqData', dos);
    AdminModel.CreateAdmin(dos, (err, dos) => {
        if (err)
            res.send(err);
        else {
            res.json({ status: true, message: 'admin Created Successfully' })
            //res.send(user)
        }
    })
}
// search by email
exports.getAdminByNom = (req, res) => {
    //console.log('get emp by idu');
    AdminModel.getAdminByEmail(req.params.email, (err, admin) => {
        if (err)
            res.send(err);
        console.log('single user data', admin);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify({ status: 200, error: null, response: admin }));
    })
}

// update user
exports.updateAdmin = (req, res) => {
    const adminReqData = new AdminModel(req.body);
    console.log('adminReqData update', adminReqData);
    // check null

    AdminModel.updateAdmin(req.params.ida, adminReqData, (err, admin) => {
        if (err)
            res.send(err);
        res.json({ status: true, message: 'Admin updated Successfully' })
    })
}

// delete user
exports.delete_Admin = (req, res) => {
    AdminModel.deleteAdmin(req.params.ida, (err, admin) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Admin deleted successully!' });
    })
}
// geuser by ID  for Update 
exports.getAdminByID = (req, res) => {
    //console.log('get emp by idu');
    AdminModel.getAdminByID(req.params.id, (err, admin) => {
        if (err)
            res.send(err);
        console.log('single user data', admin);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify({ status: 200, error: null, response: admin }));
    })
}
exports.searchadmin = (req, res) => {
    //console.log('here all users list');
    AdminModel.searchadmin(req.params.mot,(err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('user ', users);
        res.send(users)
    })
}
