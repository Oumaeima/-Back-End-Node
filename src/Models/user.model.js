var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');
var User = function (user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.poste = user.poste;
    this.tel = user.tel;
    this.email = user.email;
    this.nomsociete = user.nomsociete;
    this.password = user.password;
}




// get all technicien
User.getAllUsers = (result) => {
    dbConn.query(' SELECT * FROM users where poste="Technicien" ', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

// get all commercial
User.getCommercialList = (result) => {
    dbConn.query(' SELECT * FROM users where poste="Commercial" ', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

User.getAllEmailC = (result) => {
    dbConn.query('SELECT email FROM users where poste="Commerciale"', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

// get user by Name for Search Data by name 
User.getUserByName = (nom, result) => {
    dbConn.query('SELECT * FROM users WHERE nom=?', nom, (err, res) => {
        if (err) {
            console.log('Error while fetching user by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

// create new user
User.createUser = (userReqData, result) => {
    dbConn.query('INSERT INTO users SET ?', userReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            console.log('User created successfully');
            result(null, res)
        }
    });
}

User.searchUser = (mot,result) => {
    dbConn.query(`SELECT * FROM users WHERE nom LIKE ? OR prenom LIKE ? OR poste LIKE ? OR tel LIKE ?  OR email LIKE ?  `, ['%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%'] ,(err, res) => {
//        SELECT * FROM users WHERE nom LIKE "%?%"
//SELECT nom FROM users WHERE CONTAINS (nom, ?) 
//    dbConn.query('SELECT * FROM users where nom like ?', ['%' + req.body.mot + '%'] ,[mot] ,(err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    })
}


// get user by ID for update
User.getUserByID = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE idu=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching user by id', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}


User.findAllEmail = (result) => {
    dbConn.query('SELECT email from users', function (err, res) {
        if (err) {
            console.log('Error');
          
        }
        else{
            result(null, res);
            //console.log(result);
        }
    });
}

// update user
User.updateUser = (id, userReqData, result) => {
    
    dbConn.query("UPDATE users SET nom=?, prenom=?, tel=?, email=? WHERE idu = ?", [userReqData.nom, userReqData.prenom, userReqData.tel, userReqData.email, id], (err, res) => {
        if (err) {
            console.log('Error while updating the user');
            result(null, err);
        } else {
            console.log("user updated successfully");
            result(null, res);
        }
    });
}

// update commercial
User.updateCommercial = (id, userReqData, result) => {
    
    dbConn.query("UPDATE users SET nom=?, prenom=?, nomsociete=?, tel=?, email=? WHERE idu = ?", [userReqData.nom, userReqData.prenom, userReqData.nomsociete, userReqData.tel, userReqData.email, id], (err, res) => {
        if (err) {
            console.log('Error while updating the user');
            result(null, err);
        } else {
            console.log("user updated successfully");
            result(null, res);
        }
    });
}

// delete employee
User.delete_User = (id, result) => {
    dbConn.query('DELETE FROM users WHERE idu=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the User');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}
// get all email superviseurs 
User.getAllEmailSuperviseurs = (result) => {
    dbConn.query('SELECT email FROM users WHERE poste="Superviseur"', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}


// get all email superviseurs 
User.getAllEmailTechniciens = (result) => {
    dbConn.query('SELECT email FROM users WHERE poste="Technicien"', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
            console.log('hhgjgjhgjhgjhg');
        } else {
            console.log('Users fetched successfully');
            result(null, res);
          
        }
        
    });
}
User.getAllTechniciens = (result) => {
    dbConn.query('SELECT * FROM users WHERE poste="Technicien"', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
            
        } else {
            console.log('Users fetched successfully');
            result(null, res);
          
        }
        
    });
}
User.getAllEmailCommercial = (result) => {
    dbConn.query('SELECT email FROM users WHERE poste="Commerciale"', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
         
        } else {
            console.log('Users fetched successfully');
            result(null, res);
          
        }
        
    });
}
User.getNumTickTech = (result) => {
    dbConn.query('SELECT  nom , prenom ,email , count(idti) as nb FROM users u inner JOIN ticket_technicen t on u.idu = t.idu  WHERE u.poste ="Technicien"  group by u.email', (err, res) => {

        if (err) {
            console.log('Error while fetching ', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

//count number of technicien
User.CountNbTechnicien = (result) => {
    dbConn.query(' SELECT count(idu) as tech FROM users where poste="Technicien" ', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

// count number of commercial
User.countNbCommercial = (result) => {
    dbConn.query(' SELECT count(idu) as comm FROM users where poste="Commercial" ', (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    });
}

module.exports = User;