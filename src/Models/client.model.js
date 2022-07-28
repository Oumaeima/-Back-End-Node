var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');
var Client = function (client) {
    this.nom = client.nom;
    this.prenom = client.prenom;
    this.tel = client.tel;
    this.email = client.email;
    this.activitesociete=client.activitesociete;
    this.password = client.password;
    this.signature = client.signature
}

// get all users
Client.getAllClient = (result) => {
    dbConn.query('SELECT * FROM client', (err, res) => {
        if (err) {
            console.log('Error while fetching client', err);
            result(null, err);
        } else {
            console.log('Client fetched successfully');
            result(null, res);
        }
    });
}

// get all users
Client.getIntParClient = (id, result) => {
    dbConn.query(`SELECT * FROM intervention WHERE idd = (SELECT idd FROM dossier WHERE idclt = ?)`,[id], (err, res) => {
        if (err) {
            console.log('Error while fetching client', err);
            result(null, err);
        } else {
            console.log('Client fetched successfully');
            result(null, res);
        }
    });
}

Client.searchClient = (mot,result) => {
    dbConn.query(`SELECT * FROM client WHERE nom LIKE ? OR prenom LIKE ? OR nomsociete LIKE ? OR activitesociete LIKE ? OR tel LIKE ?  OR email LIKE ? OR password LIKE ? `, ['%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%', '%' + mot + '%'] ,(err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(mot, res);
        }
    })
}
// create new user
/*lient.createClient = (clientReqData, result) => {
    dbConn.query('INSERT INTO client SET ?', clientReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            console.log('client created successfully');
            result(null, res)
        }
    });
}*/
let checkemail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.query(
                ' SELECT * FROM client WHERE email = ?  ', email,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let checkNomsociete = (nomsociete) => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.query(
                ' SELECT * FROM client WHERE nomsociete = ?  ', nomsociete,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

Client.createClient = (userReqData) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isNamesocietyExist = await checkNomsociete(userReqData.nomsociete);
        let isEmailExist = await checkemail(userReqData.email);
        if (isNamesocietyExist) {
            reject(`This nom societe "${userReqData.nomsociete}" has already exist. Please choose an other name `);
        }
        else if (isEmailExist) {
            reject(`This email "${userReqData.email}" has already exist. Please choose an other email`);
        }
        else {
            let salt = bcrypt.genSaltSync(10);
            dbConn.query(
                'INSERT INTO client (nom,prenom,nomsociete,tel,email,password) VALUES (?,?,?,?,?,?)   ', [userReqData.nom, userReqData.prenom, userReqData.nomsociete, userReqData.tel, userReqData.email, bcrypt.hashSync(userReqData.password, salt)],
                function (err, rows) {
                    if (err) {
                        reject(false)
                    }
                    else {
                        console.log(rows);
                        resolve("Create a new user successful");
                        dbConn.query("SELECT idclt from client where email = ?", userReqData.email, (err2, rows2) => {
                           // Connection.release()
                          //  createSendToken(rows2[0].idclt, 201, res)
                        })
                    }
                  
                }
            );
        }
    });
};
// get user by ID for update
Client.getClientByID = (id, result) => {
    dbConn.query('SELECT * FROM client WHERE idclt=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching client by id', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

// get email client by ID
Client.getEmailClientByID = (id, result) => {
    dbConn.query('SELECT email FROM client WHERE idclt=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching client by id', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

// get matricule client by ID 
Client.getMatClientByID = (id, result) => {
    dbConn.query('SELECT matricule FROM dossier WHERE idclt=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching client by id', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}

Client.getClientByEmail = (email) => {

    dbConn.query('SELECT * FROM client WHERE email = ?', [email], (error, users) => {
        if (error) {
            return reject(error);
        }
        return resolve(users[0]);
    });

}
// update user
Client.updateClient = (idclt, clientReqData, result) => {
    let salt = bcrypt.genSaltSync(10);
    dbConn.query("UPDATE client SET nom=? ,prenom=?,activitesociete=?,tel=?,email=? ,password=? WHERE idclt = ?", [clientReqData.nom, clientReqData.prenom, clientReqData.activitesociete, clientReqData.tel, clientReqData.email,  bcrypt.hashSync(clientReqData.password, salt), idclt], (err, res) => {
        if (err) {
            console.log('Error while updating the client');
            result(null, err);
        } else {
            console.log("Client updated successfully");
            result(null, res);
        }
    });
}

// delete employee
Client.delete_Client = (id, result) => {
    dbConn.query(' DELETE FROM client WHERE idclt=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the client');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}

Client.findAllnomSociete = (result) => {
    dbConn.query('SELECT nomsociete from client', function (err, res) {
        if (err) {
            console.log('Error');
          
        }
        else{
            result(null, res);
            //console.log(result);
        }
    });
}

// get client signature
Client.getSignature = (id, result) => {
    dbConn.query('SELECT signature FROM client WHERE idclt=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching signature');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}


module.exports = Client;
