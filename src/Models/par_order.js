var dbConn = require('../../Config/db.config');
const bcrypt = require('bcrypt');
//const { DATE } = require('sequelize/types');

var partOrder = function (partOrder) {

    this.description = partOrder.description;
    this.offre = partOrder.offre;
    this.datedeb = partOrder.datedeb;
    this.etat = partOrder.etat;
    this.matricule = partOrder.matricule;
    this.serialNumber = partOrder.serialNumber;
    this.commande =partOrder.commande;
    this.idd = partOrder.idd;
    this.etatpiece = partOrder.etatpiece;
    this.idu = partOrder.idu;
    this.email = partOrder.email;
}
// creation des ticket de la part de l'admin  //  
partOrder.createPartOrder= (data) => {
    return new Promise(async (resolve, reject) => {
        let userItem = {

            description: data.description,
            idd: data.idd,
            idu: data.idu
        };
        dbConn.query(
            `INSERT INTO partorder  SET description ="${data.description}"  , idd = (select idd from dossier where matricule ="${data.matricule}" ) ,etat = "nouveau" , etatpiece="chez l'expediteur"`, [userItem.description, userItem.offre, userItem.idu,userItem.idd],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("ticket crée avec succée !");
            }
        );
    });
};
partOrder.updateTicketPO = (idti, ticketReqData, result) => {

    dbConn.query("UPDATE partorder SET offre=? ,description=?,commande=?WHERE idti = ?", [ticketReqData.offre, ticketReqData.description, ticketReqData.commande, idti], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}
partOrder.getTicketByIdPO = (id, result) => {
    dbConn.query('SELECT * FROM partorder WHERE idti=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

partOrder.delete_TicketPO = (id, result) => {
    dbConn.query('DELETE FROM partorder WHERE idti=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the ticket');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}
partOrder.searchtic = (mot, result) => {
    dbConn.query(`SELECT * FROM partorder WHERE description LIKE ? OR offre LIKE ? OR etat LIKE ?  OR datedeb LIKE ? `, [ '%' + mot + '%', '%' + mot + '%', '%' + mot + '%', '%' + mot + '%'], (err, res) => {
        if (err) {
            console.log('Error while fetching users', err);
            result(null, err);
        } else {
            console.log('tickets fetched successfully');
            result(null, res);
        }
    })
}
partOrder.findAllTicketPartOrderID= (idclt,result) => {
    dbConn.query('SELECT * FROM partorder WHERE idd IN (select idd from dossier where idclt= ?)', [idclt], (err, res) => {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllComEmail= (result) => {
    dbConn.query('SELECT email FROM users WHERE poste="Commerciale"',(err, res) => {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllTechEmail= (result) => {
    dbConn.query('SELECT * FROM users WHERE poste="Technicien"',(err, res) => {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllSupEmail= (result) => {
    dbConn.query('SELECT email FROM users WHERE poste="Superviseur"',(err, res) => {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllTicketPartOrderIDCom= (idclt,result) => {
    dbConn.query('SELECT * FROM partorder WHERE idu =?', [idclt], (err, res) => {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllTicketPartOrderDetailID= (id,result) => {
    dbConn.query('SELECT * FROM partorder WHERE idti=?', [id], (err, res) => {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}


partOrder.findAllTicketPartOrder= (result) => {
    dbConn.query('SELECT * FROM partorder ', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllTicketPartOrderToClient= (idclt,result) => {
    dbConn.query('SELECT u.nom,u.prenom,idti,description,offre,commande,etatpiece,etat FROM users u inner join partorder p inner join dossier d inner join client c on u.idu = p.idu and p.idd = d.idd and d.idclt = c.idclt WHERE c.idclt = ? AND etat!="clos"',[idclt], function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.findAllTicketPartOrderToAdmin= (result) => {
    dbConn.query('SELECT idti,description,offre,commande,etat,etatpiece,u.nom,u.prenom FROM partorder left join users on partorder.idu = users.idu ', function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.editStatePiece = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            `UPDATE partorder SET etatpiece= "${data.etatpiece}" WHERE idti = ?`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("offre envoyé avec succée !");
            }
        );
    });
};
partOrder.affecterticketCommercial = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            `UPDATE partorder SET idu=(SELECT idu FROM users WHERE email = "${data.email}" ) WHERE idti = ?`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("ticket affectée avec succée !");
            }
        );
        
    });
}

// creation des ticket de la part de l'admin  //  
partOrder.envoyerOffre = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            `UPDATE partorder SET offre= "${data.offre}" , etat ="en cours" WHERE idti = ?`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("offre envoyé avec succée !");
            }
        );
    });
};

// creation des ticket de la part de l'admin  //  
partOrder.passerCommande = (idti, data) => {
    return new Promise(async (resolve, reject) => {

        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var date = year + "-" + month + "-" + day;
        console.log(date);
        var hours = date_ob.getHours();
        var minutes = date_ob.getMinutes();
        var seconds = date_ob.getSeconds();
        var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

        dbConn.query(
            `UPDATE partorder SET commande= "${data.commande}" , datedeb = "${dateTime}" , etat ="Résolu" WHERE idti= ?`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("offre envoyé avec succée !");
            }
        );
    });
};

// creation des ticket de la part de l'admin  //  
partOrder.fermerTicketClient = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            `UPDATE partorder SET etatpiece= "livré" , etat ="Clos" WHERE idti = ?`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("offre envoyé avec succée !");
            }
        );
    });
};

partOrder.fermerTicketCommercial = (idti, data) => {
    return new Promise(async (resolve, reject) => {
        dbConn.query(
            `UPDATE partorder SET etatpiece ="livré" WHERE idti = ?`, [idti],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("offre envoyé avec succée !");
            }
        );
    });
};


partOrder.findAllTicketPartOrderNouveau= (result) => {
    dbConn.query('SELECT * FROM partorder WHERE etat="nouveau"', function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

partOrder.findAllTicketPartOrderEnCours= (result) => {
    dbConn.query('SELECT * FROM partorder WHERE etat="en cours"', function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

partOrder.findAllTicketPartOrderResolu= (result) => {
    dbConn.query('SELECT * FROM partorder WHERE etat="Résolu"', function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

partOrder.findAllTicketPartOrderClos =  (result) => {
    dbConn.query('SELECT * FROM partorder WHERE etat="Clos"', function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
partOrder.EtatPiece =  (idti,result) => {
    dbConn.query(`select etatpiece from partorder where idti = ? `, idti,
     function (err, res) {
        if (err) {
            console.log('Error');
            
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

partOrder.CountTicketsPartOrderEnCours = (result) => {
    dbConn.query('SELECT count(idti) as nb FROM partorder where etat="en cours"', function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Users fetched successfully');
           console.log(res)
        }
    });
}

module.exports = partOrder