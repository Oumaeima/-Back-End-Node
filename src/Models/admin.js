const dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');

var admin = function (admin) {
  
    this.email = admin.email;
    this.nom = admin.nom;
    this.prenom = admin.prenom;
    this.password = admin.password;
}

// get all admin
admin.getAllAdmin = (result) => {
    dbConn.query('SELECT * FROM users WHERE poste="admin"', (err, res) => {
        if (err) {
            console.log('Error while fetching admin', err);
            result(null, err);
        } else {
            console.log('Admin fetched successfully');
            result(null, res);
        }
    });
}
// get user by ID for update
admin.getAdminByID = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE idu = ?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching user by id', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
}
// get user by Name for Search Data by email 
admin.getAdminByEmail = (email, result) => {
    dbConn.query('SELECT * FROM admin WHERE email=?', email, (err, res) => {
        if (err) {
            console.log('Error while fetching admin by email', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


admin.CreateAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
     
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                email: data.email,
                password: bcrypt.hashSync(data.password, salt),
                role:"admin",
            };
            dbConn.query(
                'INSERT INTO admin SET ?   ', userItem,
                function (err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new admin successful");
                }
            );
        })
    }
    // update user
    admin.updateAdmin = (id, userReqData, result) => {
        let salt = bcrypt.genSaltSync(10);
        dbConn.query("UPDATE users SET nom=? ,prenom=? ,email=? WHERE idu = ?", [userReqData.nom,userReqData.prenom,userReqData.email, id], (err, res) => {
            if (err) {
                console.log('Error while updating the admin');
                result(null, err);
            } else {
                console.log("user updated successfully");
                result(null, res);
            }
        });
    }  
//update Admin Password
    admin.updateAdminPassword = (ida, userReqData, result) => {
        let salt = bcrypt.genSaltSync(10);
        dbConn.query("UPDATE admin SET password=? WHERE ida = ?", [bcrypt.hashSync(userReqData.password, salt), ida], (err, res) => {
            if (err) {
                console.log('Error while updating the password');
                result(null, err);
            } else {
                console.log("password updated successfully");
                result(null, res);
            }
        });
    }  
// delete admin
admin.deleteAdmin = (id, result) => {
    dbConn.query('DELETE FROM users WHERE ida=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the admin');
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
admin.searchadmin = (mot,result) => {
    dbConn.query(`SELECT * FROM admin WHERE nom LIKE ? OR prenom LIKE ? `, ['%' + mot + '%','%' + mot + '%'] ,(err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    })
}
module.exports = admin;