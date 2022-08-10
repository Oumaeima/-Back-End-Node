var dbConn = require('../../Config/db.config');
const bcrypt = require('bcrypt');
const date = require('date-and-time')
const nodemailer = require('nodemailer')

var partOrder = function (partOrder) {

    this.nomCommande = partOrder.nomCommande;
    this.description = partOrder.description;
    this.owner = partOrder.owner;
    this.date = partOrder.date;
    this.status = partOrder.status;
    this.commercial = partOrder.commercial;
    this.etatpiece = partOrder.etatpiece;
    this.offre = partOrder.offre;
    this.idd = partOrder.idd;
    this.trackingNumber = partOrder.serialNumber;   
}


// creation de ticket  //  
partOrder.createPartOrder= (id,data) => {
    return new Promise(async (resolve, reject) => {
        const now  =  new Date();
        const value = date.format(now,'YYYY/MM/DD');
        console.log("current date and time : " + value)
        
        let userItem = {
            nomCommande : data.nomCommande,
            description : data.description,
            owner : data.owner,
            date : data.date,
            status : data.status,
            commercial : data.commercial,
            etatpiece : data.etatpiece,
            offre : data.offre,
            idd : data.idd,
            trackingNumber : data.serialNumber
    
        };
        let v1 = 1000 + Math.floor(Math.random() * (9999 - 1000 + 1));

        let v2 = 1000 + Math.floor(Math.random() * (9999 - 1000 + 1));

        let v3 = ('tracking'.concat(v1, v2));
        let owner
        let commercial
        dbConn.query(
            `INSERT INTO partorder  SET nomCommande="${data.nomCommande}", description ="${data.description}", owner =(SELECT email FROM client WHERE idclt="${id}"), date="${value}", status="nouveau", commercial = (select email from users where poste="Commercial" AND nomsociete =(select nomsociete from client where idclt="${id}") ) , etatpiece="en cours de traitement", offre="${data.offre}", idd = (select idd from dossier where idclt ="${id}" ), trackingNumber="${v3}"`, [userItem],
            function (err, rows) {
                if (err) {
                    reject(false)
                    console.log(err);
                }
                resolve("ticket crée avec succée !");
            }
        );
        dbConn.query('SELECT owner, commercial FROM partorder WHERE idd=(select idd from dossier where idclt=?)', [id], (err, res) => {
            if (err) {
                console.log('Error while fetching matricule by id', err);
                
            } else {
                owner = res[0].owner
                commercial = res[0].commercial
                console.log(owner);
                console.log(commercial);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD
                    },
                });
                var message = {
                    from: process.env.MAIL_USERNAME,// sender address
                    to: commercial, // list of receivers
                    subject: "Nouveau ticket part order", // Subject line
                    html: `
                    <div style="padding:10px;border-style: ridge">
                    <h3>Details</h3>
                    <ul>
                        vous avez recu une nouvelle ticket de type part order de la part de:
                        <li>Client: ${owner}</li>
                        Veuillez le contacter.
                    </ul>
                    `
                };
                transporter.sendMail(message)
            }
        }
        
        );

         
    }); 
};
partOrder.updateTicketPO = (id, ticketReqData, result) => {

    dbConn.query("UPDATE partorder SET nomCommande=?, description=? WHERE idti = ?", [ticketReqData.nomCommande, ticketReqData.description, id], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

// fermer ticket par le client
partOrder.fermerTicketPO = (id, result) => {

    dbConn.query(`UPDATE partorder SET status="Clos" WHERE idti=?`,[id], (err, res) => {
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
// get ticket by commercial
partOrder.getTicketByComm = (id, result) => {
    dbConn.query('SELECT * FROM partorder WHERE commercial = (select email from users where idu=?) ', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

partOrder.getTicketByClient = (id, result) => {
    dbConn.query('SELECT * FROM partorder WHERE idd=(select idd from dossier where idclt=?)', [id], (err, res) => {
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

// modifier etat en "Commande confirmée" par le commercial
partOrder.updateEtatTicketPO = (id, result) => {

    dbConn.query(`UPDATE partorder SET status="en cours", etatpiece="Commande confirmée" WHERE idti=?`,[id], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

// modifier etat en "Chez l'expéditeur" par le commercial
partOrder.updateState2TicketPO = (id, result) => {

    dbConn.query(`UPDATE partorder SET etatpiece="Chez l'expéditeur" WHERE idti=?`,[id], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

// modifier etat en "En route" par le commercial
partOrder.updateState3TicketPO = (id, result) => {

    dbConn.query(`UPDATE partorder SET etatpiece="En route" WHERE idti=?`,[id], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

// modifier etat en "Livrée" par le commercial
partOrder.updateState4TicketPO = (id, result) => {

    dbConn.query(`UPDATE partorder SET status="Livrée", etatpiece="Livrée" WHERE idti=?`,[id], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

module.exports = partOrder