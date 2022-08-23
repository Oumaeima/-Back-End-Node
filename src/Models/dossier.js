var dbConn = require('../../Config/db.config');
const bcrypt = require('bcrypt');

/*var Cryptr = require('cryptr');
Cryptr = new Cryptr('dev');
*/

//import { Sequelize } from "sequelize";

var dossier = function (dossier) {
    this.nomsociete = dossier.nomsociete;
  
    this.categorie = dossier.categorie;
    this.type = dossier.type;
    this.matricule=dossier.matricule;
    this.idclt = dossier.idclt;

}
/*****Creation dossiers *****/

dossier.createDossier = (data) => {
   
    let userItem = {
        nomsociete: data.nomsociete,
        
        categorie: data.categorie,
        type: data.type,
        matricule:data.matricule,
        idclt :data.idclt
    };
    dbConn.query(
        `INSERT INTO dossier SET nomsociete="${data.nomsociete}", categorie = "${data.categorie}",type = "${data.type}",matricule="${data.matricule}",idclt = (SELECT idclt FROM client WHERE nomsociete = "${data.nomsociete}")`, [userItem],
        function (err, rows) {
            if (err) {
                //  reject(false)
                console.log(err);
            }
            console.log('good' );
            
        }
    );
    }

/*****Creation dossiers *****/
/*
let checkMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        try {
            dbConn.query(
                ' SELECT * FROM dossier WHERE matricule = ?  ', matricule,
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

dossier.createDossier = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isMatExist = await checkMatricule(data.matricule);
        if (isMatExist) {
            reject(`The matricule  "${data.matricule}" has already exist. Please choose an other name `);
        }
        else {


            let userItem = {
categorie:data.categorie,
                type: data.type,
                nomsociete: data.nomsociete,
                matricule: data.matricule,
                
            };
            try {
                dbConn.query(
                    `INSERT INTO dossier SET categorie = "${data.categorie}",type = "${data.type}", matricule = "${data.matricule}"", idclt=(select idclt from client where nomsociete="${data.nomsociete}")`, [userItem],
                    function (err, rows) {
                        if (err) {
                            //  reject(false)
                            console.log(err);
                        }

                    }
                );
            } catch (error) { reject(error); }
        }
    });
}
*/

dossier.findAllMatricule = (result) => {
    dbConn.query('SELECT matricule FROM dossier ', function (err, res) {
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
dossier.updateDossier = (idd, dossierReqData, result) => {
    dbConn.query("UPDATE dossier SET nomsociete=?,categorie=?,type=?,matricule=? WHERE idd = ?", [dossierReqData.nomsociete, dossierReqData.categorie, dossierReqData.type,dossierReqData.matricule, idd], (err, res) => {
        if (err) {
            console.log('Error while updating the dossier');
            result(null, err);
        } else {
            console.log("dossier updated successfully");
            result(null, res);
        }
    });
}

// delete employee
dossier.delete_Dossier = (id, result) => {
    dbConn.query('DELETE FROM dossier WHERE idd=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the dossier');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}


dossier.getAllDossier = (result) => {
    dbConn.query('SELECT * FROM dossier', (err, res) => {
        if (err) {
            console.log('Error while fetching dossier', err);
            result(null, err);
        } else {
            console.log('dossier fetched successfully');
            result(null, res);
        }
    });
}

dossier.getDossier = (result) => {
    dbConn.query('SELECT nomsociete FROM dossier', (err, res) => {
        if (err) {
            console.log('Error while fetching dossier', err);
            result(null, err);
        } else {
            console.log('dossier fetched successfully');
            result(null, res);
        }
    });
}

dossier.findEmailSociete = (idclt, result) => {
    dbConn.query('SELECT email FROM client where idclt =?  ', [idclt], function (err, res) {
        if (err) {
            console.log('Error');

        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

dossier.findAllDossierSociete = (idclt, result) => {
    dbConn.query('SELECT * FROM dossier where idclt =?  ', [idclt], function (err, res) {
        if (err) {
            console.log('Error');

        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
dossier.searchDossier = (mot,result) => {
    dbConn.query(`SELECT * FROM dossier WHERE categorie LIKE ? OR type LIKE ? OR matricule LIKE ? `, ['%' + mot + '%','%' + mot + '%','%' + mot + '%'] ,(err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('Users fetched successfully');
            result(null, res);
        }
    })
}
dossier.getDossierById = (id, result) => {
    dbConn.query('SELECT * FROM dossier WHERE idd=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching dossier by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


dossier.findclientsdossier = (result) => {
    dbConn.query('SELECT dossier.nomsociete as societe, dossier.categorie as categorie,dossier.type as type, dossier.activitesociete as activite,client.nom as nomCient,client.prenom as PrenomCient FROM dossier  JOIN client on dossier.idclt = client.idclt ', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

//count number of dossier
dossier.countNbDossier = (result) => {
    dbConn.query('SELECT count(idd) as dossiers FROM dossier', (err, res) => {
        if (err) {
            console.log('Error while fetching dossier', err);
            result(null, err);
        } else {
            console.log('dossier fetched successfully');
            result(null, res);
        }
    });
}

module.exports = dossier
