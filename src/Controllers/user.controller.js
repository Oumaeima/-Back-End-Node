const UserModel = require('../Models/user.model');
const nodemailer = require('nodemailer');





// get all  technicien
exports.getUserList = (req, res) => {
    //console.log('here all users list');
    UserModel.getAllUsers((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}

// get all commercial
exports.getCommercialList = (req, res) => {
    //console.log('here all users list');
    UserModel.getCommercialList((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}

exports.getEmailC = (req, res) => {
    //console.log('here all users list');
    UserModel.getAllEmailC((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}

/*
// get user by Name for earch by Name 
exports.getUserByName = (req, res) => {
    //console.log('get emp by id');
    UserModel.getUserByName(req.params.nom, (err, user) => {
        if (err)
            res.send(err);
        console.log('single user data', user);
        res.send(user);
    })
}
*/

// create new user
exports.createNewUser = (req, res) => {
    const userReqData = new UserModel(req.body);
    console.log('userReqData', userReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        UserModel.createUser(userReqData, (err, user) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'User Created Successfully', data: user.insertId })
        })
        
    }
}


// geuser by ID  for Update 
exports.getUserByID = (req, res) => {
    //console.log('get emp by idu');
    UserModel.getUserByID(req.params.id, (err, user) => {
        if (err)
            res.send(err);
        console.log('single user data', user);
        // res.json({"first_name":"Dheeraj"});
        res.send(user);
    })
}



// update user
exports.updateUser = (req, res) => {
    const userReqData = new UserModel(req.body);
    console.log('userReqData update', userReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        UserModel.updateUser(req.params.id, userReqData, (err, user) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'User updated Successfully' })
        })
    }
}

// update user
exports.updateCommercial = (req, res) => {
    const userReqData = new UserModel(req.body);
    console.log('userReqData update', userReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        UserModel.updateCommercial(req.params.id, userReqData, (err, user) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'User updated Successfully' })
        })
    }
}

// delete user
exports.deleteUser = (req, res) => {
    UserModel.delete_User(req.params.id, (err, user) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'User deleted successully!' });
    })
}

// get all user list
exports.searchUser = (req, res) => {
    //console.log('here all users list');
    UserModel.searchUser(req.params.mot,(err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('user ', users);
        res.send(users)
    })
}




exports.getEmailList = (req, res) => {
    //console.log('here all users list');
    UserModel.findAllEmail((err, emails) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('emails', emails);
        res.send(emails)
    })
}




exports.send = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pprologic138@gmail.com',
            pass: 'prologic123'

        }
    });
    var mailOptions = {
        from: 'pprologic138@gmail.com',// sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.description,
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.to}</li>
            <li>Subject: ${req.body.subject}</li>
            <li>Message: ${req.body.description}</li>
        </ul>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({ status: true, respMesg: 'Email  not Sent Successfully' })
        }
        else {
            res.json({ status: true, respMesg: 'Email Sent Successfully' })
        }

    });
};









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
exports.getEmailCommercialList = (req, res) => {
    //console.log('here all users list');
    UserModel.getAllEmailCommercial((err, users) => {
        console.log('We are here');
        if (err) {
            res.send(err);
        }
        else {
            console.log('commerciale', users);
            res.send(users)
        }
    })
}

// get all user list
exports.getEmailTechnicienList = (req, res) => {
    //console.log('here all users list');
    UserModel.getAllEmailTechniciens((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('email technicien  ', users);
        res.send(users)
    })
}
// get all user list
exports.getTechnicienList = (req, res) => {
    //console.log('here all users list');
    UserModel.getAllTechniciens((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('email technicien  ', users);
        res.send(users)
    })
}
exports.getNBticketsTech = (req, res) => {
    //console.log('here all users list');
    UserModel.getNumTickTech((err, nb) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('nb ', nb);
        res.send(nb)
    }) 
}

//count number of technicien
exports.CountNbTechnicien = (req, res) => {
    UserModel.CountNbTechnicien((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}

//count number of commercial
exports.countNbCommercial = (req, res) => {
    UserModel.countNbCommercial((err, users) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}



