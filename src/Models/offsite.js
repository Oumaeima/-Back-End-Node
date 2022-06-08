var dbConn = require('../../Config/db.config');
const bcrypt = require('bcrypt');
//const { DATE } = require('sequelize/types');

var offSite = function (offSite) {

    this.numAppel = offSite.numAppel;
    this.date = offSite.date;
    this.reference = offSite.reference;
    this.numserie = offSite.numserie;
    this.description = offSite.description;
    this.etatpiece = offSite.etatpiece;
    this.matricule = offSite.matricule;
    this.etat = offSite.etat;
    this.idd = offSite.idd;
}

// creation des ticket de la part de l'admin  //  
offSite.createTicketAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        let userItem = {

            numAppel: data.numAppel,
            date: data.date,
            reference: data.Reference,
            numserie: data.numserie,
            description: data.Description,
            etatpiece: data.etatpiece,
            matricule: data.matricule,
            idd: data.idd
        };
        dbConn.query(
            `INSERT INTO offsite SET numAppel ="${data.numAppel}" ,date = "${data.date}",Reference = "${data.reference}",
            numserie = "${data.numserie}", Description = "${data.description}", etatpiece = "${data.etatpiece}",
            matricule = "${data.matricule}", idd = (select idd from dossier where matricule ="${data.matricule}" ) ,
            etat = "crée"` , [userItem],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("ticket offSite crée avec succée !");
            }
        );
    });
};

offSite.findAllTicketOffSite= (result) => {
    dbConn.query('SELECT * FROM offsite ', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

// delete employee
offSite.deleteTicketOffSite = (idti, result) => {
    dbConn.query('DELETE FROM partorder WHERE idti=?', [idti], (err, res) => {
        if (err) {
            console.log('Error while deleting the ticket');
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


offSite.CountTicketsoffSiteStateCree = (result) => {
    dbConn.query('SELECT count(*) FROM offsite where etat="crée"', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

offSite.CountTicketsoffSite= (result) => {
    dbConn.query('SELECT count(*) FROM intervention', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}





module.exports = offSite