var dbConn = require('../../Config/db.config');
const bcrypt = require('bcrypt');
//const { DATE } = require('sequelize/types');

var intervention = function (intervention) {

    this.sla = intervention.sla;
    this.owner = intervention.owner;
    this.datedeb = intervention.datedeb;
    this.dateClos = intervention.dateClos;
    this.taches = intervention.taches;
    this.status = intervention.status;   
    this.matricule = intervention.matricule;
    this.idd = intervention.idd;
}

var user = function(user){
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.poste = user.poste;
    this.tel = user.tel;
    this.email = user.email;
    this.photo = user.photo;   
    this.role = user.role;
}


// creation des ticket de la part de client //  
intervention.createTicketClient = (id,data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not

        try {
            
            let userItem = {
                sla: data.sla,
                owner: data.owner,
                datedeb: data.datedeb,
                dateClos: data.dateClos,
                taches: data.taches,
                status : data.status,
                matricule: data.matricule,
                idd: data.idd
            };
            
            dbConn.query(
                `INSERT INTO intervention SET sla ="${data.sla}", owner =(SELECT email FROM client WHERE idclt="${id}"), datedeb = "${data.datedeb}", dateClos = "${data.dateClos}",taches = "${data.taches}", idd = (select idd from dossier where idclt ="${id}" ) ,status = "nouveau"`, [userItem],
                function (err, rows) {
                    if (err) {
                        reject(false)
                        console.log(err);
                    }
                    resolve("ticket crée avec succée !");
                }
            );
        } catch (error) { reject(error); }
  });
};

intervention.updateTicketI = (id, ticketReqData, result) => {

    dbConn.query("UPDATE intervention SET sla=?, owner=? ,datedeb=?, dateClos=? ,taches=?, status=? WHERE idti = ?", [ticketReqData.sla, ticketReqData.owner, ticketReqData.datedeb, ticketReqData.dateClos, ticketReqData.taches, ticketReqData.status, id], (err, res) => {
        if (err) {
            console.log('Error while updating the ticket');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

intervention.updateOwnerTicketInt = (idti, ticketReqData, result) => {

    dbConn.query("UPDATE intervention SET owner=? , status='en cours' WHERE idti = ?", [ticketReqData.owner, idti], (err, res) => {
        if (err) {
            console.log('Error while updating the client');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

intervention.updateStatClos = (id, result) => {

    dbConn.query("UPDATE intervention SET status='Clos' WHERE idti = ?", [id], (err, res) => {
        if (err) {
            console.log('Error while updating the client');
            result(null, err);
        } else {
            console.log("ticket updated successfully");
            result(null, res);
        }
    });
}

intervention.findTicket= (result) => {
    dbConn.query('SELECT * FROM intervention ', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
intervention.getTicketByMatricule = (nom, result) => {
    dbConn.query('SELECT * FROM intervention WHERE matricule=?', nom, (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.getTicketById = (id, result) => {
    dbConn.query('SELECT * FROM intervention WHERE idd= ?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching ticket by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.getTicketByIdInt = (id, result) => {
    dbConn.query('SELECT * FROM intervention WHERE idti=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.getTicketTaches = (id, result) => {
    dbConn.query('SELECT * FROM technicien_taches WHERE idti=?', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.getnbEnCours = ( result) => {
    dbConn.query('SELECT count(idti) as nb FROM intervention where etat="en cours"', (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.getnbEnPartOrderCours = ( result) => {
    dbConn.query('SELECT count(idti) as nbPO FROM partorder where etat="en cours"', (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

intervention.getTicketByIdTech = (id, result) => {
    dbConn.query('SELECT * FROM intervention WHERE idti IN (select idti from ticket_affectation where idu=?)', [id], (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

// get ticket intervention by technicien
intervention.getTicketByTech = (id, result) => {
    dbConn.query('SELECT * FROM intervention WHERE owner = (select email from users where poste="Technicien" and idu = ?)',[id], (err, res) => {
        if (err) {
            console.log('Error while fetching emails', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

// delete ticket

intervention.delete_TicketInt = (id, result) => {
    dbConn.query('DELETE FROM intervention WHERE idti=?', [id], (err, res) => {
        if (err) {
            console.log('Error while deleting the client');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}

intervention.CountTicketsIntervenionStateExpediteur = (result) => {
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

intervention.updateStateResolu = (idti, result) => {
    dbConn.query('  UPDATE intervention SET status="Résolu" WHERE idti=?  ', [idti], function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            console.log(res);
        }
    });
}

intervention.updateStateInterventionResolu = (idti, result) => {
    dbConn.query('  UPDATE intervention SET etat="Résolu" WHERE idti=?  ', [idti], function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            console.log(res);
        }
    });
}

intervention.updateStateInterventionClos = (id, result) => {
    
    dbConn.query(`UPDATE intervention SET status="Clos" WHERE idti=?  `, [id], function (err, res) {
        if (err) {
            console.log('Error');
            console.log(err)
        }
        else {
            console.log(res);
        }
    });
}
intervention.findAllTicketInterventionToTechnicien = (idu, role, result) => {
    try {
        dbConn.query('SELECT c.nom,c.prenom,i.idti,etat,sla,datedeb,datefin,taches FROM client c inner join dossier d inner join intervention i inner JOIN ticket_affectation t inner join users u on c.idclt = d.idclt AND d.idd = i.idd AND i.idti = t.idti AND t.idu = u.idu WHERE etat ="nouveau" And u.idu = ? And u.role =?', [idu, role], function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                result(null, res);
                //console.log(result);
            }
        });
    } catch (error) { reject(error); }
}


intervention.findAllTicketInterventionNouveau = (result) => {
    dbConn.query('SELECT * FROM intervention WHERE etat="nouveau"', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}
intervention.FindTicketEncours = (idti,result) => {
    dbConn.query('SELECT etat FROM intervention WHERE  idti=? ', [idti], function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}


intervention.findAllTicketInterventionEnRetard = (result) => {
    dbConn.query('SELECT * FROM intervention WHERE (datefin - datedeb) > sla', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

intervention.findAllTicketInterventionClos = (result) => {
    dbConn.query('SELECT * FROM intervention WHERE etat="clos"', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

intervention.findAllTicketInterventionRésolu = (result) => {
    dbConn.query('SELECT * FROM intervention WHERE etat="réslou"', function (err, res) {
        if (err) {
            console.log('Error');
        }
        else {
            result(null, res);
            //console.log(result);
        }
    });
}

intervention.CountTicketsTechnicienEnCours = ( result) => {
    dbConn.query('SELECT prenom ,email,  count(t.idti) as nbT FROM intervention i Join ticket_affectation t JOIN users u on i.idti = t.idti and t.idu = u.idu where u.poste="Technicien" AND i.etat="en cours" group by u.email,u.prenom   ', (err, res) => {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.getNumTickTech = (result) => {
 
     //   dbConn.query('SELECT  nom , prenom ,email , count(t.idticket) as nb FROM users u left JOIN ticket_affectation t join intervention i on u.idUser = t.idUser AND t.idticket = i.idticket WHERE u.role ="technicien" AND i.etat="en cours" group by u.email', (err, res) => {
            dbConn.query('SELECT  nom , prenom ,email , count(t.idti) as nb FROM intervention i JOIN ticket_affectation t join users u on i.idti = t.idti AND t.idu = u.idu WHERE u.role ="Technicien" AND i.etat="en cours" group by u.email', (err, res) => {

            if (err) {
                console.log('Error while fetching ', err);
                result(null, err);
            } else {
                console.log('Users fetched successfully');
                result(null, res);
            }
        });
  
}


intervention.CountTicketsClientEnCours = (result) => {
    dbConn.query('SELECT prenom ,nom , email , count(i.idti) as nbT FROM client c JOIN dossier d JOIN intervention i on c.idclt = d.idclt and d.idd = i.idd where i.etat="en cours" group by c.email  ', function (err, res) {
       
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

//admin
intervention.CountTicketsInterventionClos = (result) => {
    dbConn.query('SELECT count(idti) as nbclos FROM intervention where etat="clos"', function (err, res) {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.CountTicketsIntervenionEnCours = (result) => {
    dbConn.query('SELECT count(idti) as nbc FROM intervention where etat="en cours"', function (err, res) {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}


intervention.CountTicketsInterventionRetard = (result) => {
    dbConn.query('SELECT count(idti) as nbr FROM intervention where etat="retard"', function (err, res) {
        if (err) {
            console.log('Error while fetching matricule by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
intervention.searchtic = (mot,result) => {
    dbConn.query(`SELECT * FROM intervention WHERE sla LIKE ? OR datedeb LIKE ? OR datefin LIKE ? OR taches LIKE ?  OR urgence LIKE ? OR etat LIKE ? `, ['%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%','%' + mot + '%'] ,(err, res) => {
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
intervention.nbTicketsClientEnCours = (idclt,result) => {
  
        //dbConn.query('SELECT prenom , email , count(i.idticket) as nbT FROM client c left JOIN dossier d JOIN intervention i on c.idclt = d.idclt and d.idc = i.idc where i.etat="en cours" group by c.email  ', function (err, res) {
            dbConn.query('SELECT prenom , email , count(i.idti) as nbT FROM intervention i JOIN dossier d JOIN client c on i.idd = d.idd and d.idclt = c.idclt WHERE i.etat="en cours" AND c.idclt=? ',[idclt], function (err, res) {

                if (err) {
                    console.log('Error while fetching matricule by id', err);
                    result(null, err);
                } else {
                    result(null, res);
                }
        });
    
}
intervention.nbTicketsPOClientEnCours = (idclt,result) => {
  
    //dbConn.query('SELECT prenom , email , count(i.idticket) as nbT FROM client c left JOIN dossier d JOIN intervention i on c.idclt = d.idclt and d.idc = i.idc where i.etat="en cours" group by c.email  ', function (err, res) {
        dbConn.query('SELECT prenom , email , count(i.idti) as nbT FROM partorder i JOIN dossier d JOIN client c on i.idd = d.idd and d.idclt = c.idclt WHERE i.etat="en cours" AND c.idclt=? ',[idclt], function (err, res) {

            if (err) {
                console.log('Error while fetching matricule by id', err);
                result(null, err);
            } else {
                result(null, res);
            }
    });

}

intervention.getListTechAffectes = (idti,result) => {
    
        dbConn.query('SELECT u.nom as nom , u.prenom as prenom FROM ticket_affectation t right join users u on t.idu = u.idu WHERE idti = ? AND u.role="Technicien" ', [idti],function (err, res) {
            if (err) {
                console.log('Error while updating the ticket');
                result(null, err);
            } else {
                console.log("ticket updated successfully");
                result(null, res);
            }
        });
    
}
intervention.getListSupAffectes = (idti,result) => {
    
        dbConn.query('SELECT t.idticket , u.nom as nom , u.prenom as prenom FROM ticket_affectation t Left JOIN users u on t.idu = u.idu WHERE t.idti = ? AND role="Superviseur" ', [idti],function (err, res) {
            if (err) {
                console.log('Error while updating the ticket');
                result(null, err);
            } else {
                console.log("ticket updated successfully");
                result(null, res);
            }
        });
    
}
intervention.delete_TechAff = (idti,idu, result) => {
    dbConn.query('DELETE FROM ticket_affectation WHERE idti=? and idu=?', [idti,idu], (err, res) => {
        if (err) {
            console.log('Error while deleting the client');
            result(null, err);
        } else {
            result(null, res);
        }
    });

}


module.exports = intervention
